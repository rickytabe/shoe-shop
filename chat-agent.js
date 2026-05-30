(function () {
    'use strict';

    const STORE_URL = 'store-data.json';
    const GEMINI_API_KEY = 'AQ.Ab8RN6L3VzKPU8gDlMakjqAU3_WwUTou-AEP1jKADZEDMr-g2A';
    const GEMINI_MODEL = 'gemini-3.1-flash-lite';
    const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    const DEFAULT_SUGGESTIONS = [
        'Show me sneakers under 10000 XAF',
        'What payment methods do you accept?',
        'Where is StepUp located?'
    ];

    document.addEventListener('DOMContentLoaded', initChatAgent);

    async function initChatAgent() {
        const root = document.getElementById('stepup-ai-chat');
        if (!root) return;

        const elements = {
            root,
            toggle: root.querySelector('.ai-chat-toggle'),
            panel: root.querySelector('.ai-chat-panel'),
            close: root.querySelector('.ai-chat-close'),
            messages: root.querySelector('.ai-chat-messages'),
            suggestions: root.querySelector('.ai-chat-suggestions'),
            form: root.querySelector('.ai-chat-form'),
            input: root.querySelector('#ai-chat-input'),
            promo: document.getElementById('ai-chat-promo'),
            promoDismiss: document.getElementById('ai-promo-dismiss')
        };

        const state = {
            store: null,
            history: [],
            busy: false,
            openedOnce: false
        };

        state.store = await loadStoreData();
        bindChatEvents(elements, state);
    }

    async function loadStoreData() {
        try {
            const response = await fetch(STORE_URL, { cache: 'no-store' });
            if (!response.ok) throw new Error('Unable to load store data');
            return await response.json();
        } catch (error) {
            console.warn('StepUp AI data store unavailable:', error);
            return null;
        }
    }

    function dismissPromo(elements) {
        if (elements.promo) {
            elements.promo.classList.remove('is-visible');
            sessionStorage.setItem('stepup_promo_dismissed', '1');
        }
    }

    function bindChatEvents(elements, state) {
        elements.toggle.addEventListener('click', () => openChat(elements, state));
        elements.close.addEventListener('click', () => closeChat(elements));

        // Promo popup: auto-show after 3s, dismiss on click
        if (elements.promo && !sessionStorage.getItem('stepup_promo_dismissed')) {
            setTimeout(() => {
                if (!state.openedOnce) {
                    elements.promo.classList.add('is-visible');
                }
            }, 3000);

            // Click promo text → open chat
            elements.promo.addEventListener('click', (e) => {
                if (e.target === elements.promoDismiss) return;
                dismissPromo(elements);
                openChat(elements, state);
            });

            // Dismiss button
            if (elements.promoDismiss) {
                elements.promoDismiss.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dismissPromo(elements);
                });
            }
        }

        elements.suggestions.addEventListener('click', event => {
            const button = event.target.closest('button');
            if (!button || state.busy) return;
            elements.input.value = button.textContent.trim();
            elements.form.requestSubmit();
        });

        elements.form.addEventListener('submit', async event => {
            event.preventDefault();
            const message = elements.input.value.trim();
            if (!message || state.busy) return;

            elements.input.value = '';
            appendMessage(elements.messages, 'user', { answer: message });
            state.history.push({ role: 'user', content: message });
            setBusy(elements, state, true);

            const typingNode = appendTyping(elements.messages);

            try {
                const response = await askStepUpAi(message, state);
                typingNode.remove();
                appendMessage(elements.messages, 'assistant', response);
                state.history.push({ role: 'assistant', content: response.answer });
                renderSuggestions(elements.suggestions, response.suggestions || DEFAULT_SUGGESTIONS);
            } catch (error) {
                typingNode.remove();
                const fallback = createLocalAnswer(message, state.store);
                appendMessage(elements.messages, 'assistant', fallback);
                state.history.push({ role: 'assistant', content: fallback.answer });
                renderSuggestions(elements.suggestions, fallback.suggestions || DEFAULT_SUGGESTIONS);
            } finally {
                setBusy(elements, state, false);
            }
        });
    }

    function openChat(elements, state) {
        elements.panel.hidden = false;
        elements.root.classList.add('is-open');
        elements.toggle.setAttribute('aria-expanded', 'true');
        dismissPromo(elements);

        if (!state.openedOnce) {
            state.openedOnce = true;
            appendMessage(elements.messages, 'assistant', {
                answer: state.store
                    ? 'Hi, I am the StepUp AI assistant. Ask me about products, prices, images, delivery, payments, returns, or the owner.'
                    : 'Hi, I am StepUp AI. I could not load the store data yet, so please run the site through a local server or deploy it to use chat fully.',
                suggestions: DEFAULT_SUGGESTIONS
            });
        }

        setTimeout(() => elements.input.focus(), 50);
    }

    function closeChat(elements) {
        elements.root.classList.remove('is-open');
        elements.toggle.setAttribute('aria-expanded', 'false');
        elements.panel.hidden = true;
    }

    function setBusy(elements, state, busy) {
        state.busy = busy;
        elements.input.disabled = busy;
        elements.form.querySelector('button').disabled = busy;
    }

    function buildPrompt(message, history, storeData) {
        const trimmedHistory = Array.isArray(history) ? history.slice(-8) : [];

        return [
            'You are the StepUp AI shopping assistant for a shoe shop in Buea, Cameroon.',
            'Use only the provided STORE_DATA unless the user asks for general shoe-care advice.',
            'If the user asks for products, prices, categories, owner/founder images, store images, policy info, contact info, or reviews, answer from STORE_DATA.',
            'When useful, include product or asset cards in items. Each item should include id (the numeric product id from STORE_DATA), name/title, description, category when relevant, priceXaf when relevant, and imageUrl or imagePath when available.',
            'Do not invent sizes, stock levels, discounts, or delivery promises not present in STORE_DATA.',
            'For payments, mention MTN Mobile Money and Orange Money only.',
            'If information is unavailable, say so and suggest contacting StepUp.',
            'Return strict JSON only, with this shape:',
            '{"answer":"string","items":[{"id":0,"name":"string","title":"string","category":"string","priceXaf":0,"description":"string","imageUrl":"string","imagePath":"string"}],"suggestions":["string"]}',
            '',
            `CHAT_HISTORY: ${JSON.stringify(trimmedHistory)}`,
            `USER_MESSAGE: ${message}`,
            `STORE_DATA: ${JSON.stringify(storeData)}`
        ].join('\n');
    }

    function cleanJsonText(text) {
        return String(text || '')
            .trim()
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/```$/i, '')
            .trim();
    }

    async function askStepUpAi(message, state) {
        const prompt = buildPrompt(message, state.history, state.store);

        const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ],
                generationConfig: {
                    temperature: 0.35,
                    responseMimeType: 'application/json'
                }
            })
        });

        if (!response.ok) {
            throw new Error('Gemini API request failed');
        }

        const geminiPayload = await response.json();

        const rawText = (geminiPayload.candidates || [])
            .flatMap(c => ((c.content || {}).parts || []).map(p => p.text || ''))
            .join('\n');

        let assistantPayload;

        try {
            assistantPayload = JSON.parse(cleanJsonText(rawText));
        } catch (_) {
            assistantPayload = {
                answer: rawText || 'I could not produce a clean answer. Please try again.',
                items: [],
                suggestions: DEFAULT_SUGGESTIONS
            };
        }

        return normalizeAssistantPayload({
            answer: assistantPayload.answer || '',
            items: Array.isArray(assistantPayload.items) ? assistantPayload.items : [],
            suggestions: Array.isArray(assistantPayload.suggestions) ? assistantPayload.suggestions : []
        });
    }

    function normalizeAssistantPayload(payload) {
        return {
            answer: String(payload.answer || '').trim(),
            items: Array.isArray(payload.items) ? payload.items.filter(Boolean) : [],
            suggestions: Array.isArray(payload.suggestions) && payload.suggestions.length
                ? payload.suggestions.slice(0, 4)
                : DEFAULT_SUGGESTIONS
        };
    }

    function appendMessage(container, role, payload) {
        const message = document.createElement('div');
        message.className = `ai-chat-message ${role === 'user' ? 'is-user' : 'is-assistant'}`;

        const bubble = document.createElement('div');
        bubble.className = 'ai-chat-bubble';

        const text = document.createElement('p');
        text.textContent = payload.answer || '';
        bubble.appendChild(text);

        const items = Array.isArray(payload.items) ? payload.items : [];
        if (items.length) {
            bubble.appendChild(renderItemCards(items));
        }

        message.appendChild(bubble);
        container.appendChild(message);
        scrollToBottom(container);
        return message;
    }

    function appendTyping(container) {
        const message = document.createElement('div');
        message.className = 'ai-chat-message is-assistant is-typing';
        message.innerHTML = '<div class="ai-chat-bubble"><span></span><span></span><span></span></div>';
        container.appendChild(message);
        scrollToBottom(container);
        return message;
    }

    function matchProductFromCatalog(item) {
        const catalog = window.stepupProducts;
        if (!catalog || !Array.isArray(catalog)) return null;

        // 1. Match by exact numeric id
        if (item.id) {
            const byId = catalog.find(p => p.id === Number(item.id));
            if (byId) return byId;
        }

        // 2. Match by name (fuzzy: lowercase, stripped)
        const itemName = String(item.name || item.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (itemName.length < 3) return null;

        return catalog.find(p => {
            const pName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            return pName === itemName || pName.includes(itemName) || itemName.includes(pName);
        }) || null;
    }

    function renderItemCards(items) {
        const list = document.createElement('div');
        list.className = 'ai-chat-items';

        items.slice(0, 6).forEach(item => {
            const card = document.createElement('article');
            card.className = 'ai-chat-item';

            // Try to match this item to a real product in the catalog
            const matched = matchProductFromCatalog(item);
            if (matched) {
                item.id = matched.id;
                item.priceXaf = item.priceXaf || matched.price;
                if (!item.imageUrl && !item.imagePath) {
                    item.imageUrl = matched.image;
                }
            }

            // Detect if this is a review card
            const isReview = !!(item.rating || item.reviewer || item.review || item.location);
            
            // If item has an id (matched or from AI), it's a product that can be added to cart
            const isProduct = !isReview && !!(item.id && (item.priceXaf || (matched && matched.price)));

            const imageSource = item.imageUrl || item.imagePath || item.path;
            const hasImage = !!imageSource;

            // Apply layout classes
            if (isReview) {
                card.classList.add('is-review');
            } else if (!hasImage) {
                card.classList.add('no-image');
            }

            if (isProduct) {
                card.classList.add('is-product');
                card.dataset.productId = item.id;
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => addProductToCart(item));
            }

            // Image (only for non-review cards with images)
            if (hasImage && !isReview) {
                const image = document.createElement('img');
                image.src = imageSource;
                image.alt = item.imageAlt || item.name || item.title || 'StepUp image';
                image.loading = 'lazy';
                image.addEventListener('error', () => {
                    image.remove();
                    card.classList.add('no-image');
                });
                card.appendChild(image);
            }

            const content = document.createElement('div');

            // Review card: show stars + reviewer name + review text + location
            if (isReview) {
                // Star rating
                if (item.rating) {
                    const stars = document.createElement('div');
                    stars.className = 'review-stars';
                    const fullStars = Math.floor(Number(item.rating));
                    const hasHalf = Number(item.rating) % 1 >= 0.5;
                    stars.innerHTML = '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
                    content.appendChild(stars);
                }

                const title = document.createElement('strong');
                title.textContent = item.reviewer || item.name || item.title || 'Customer';
                content.appendChild(title);

                if (item.review || item.description) {
                    const desc = document.createElement('p');
                    desc.textContent = item.review || item.description;
                    content.appendChild(desc);
                }

                if (item.location || item.category) {
                    const loc = document.createElement('span');
                    loc.className = 'review-location';
                    loc.textContent = '📍 ' + (item.location || item.category);
                    content.appendChild(loc);
                }
            } else {
                // Product / generic card
                const title = document.createElement('strong');
                title.textContent = item.name || item.title || 'StepUp item';
                content.appendChild(title);

                const meta = document.createElement('span');
                meta.textContent = item.priceXaf
                    ? `${formatXaf(item.priceXaf)}${item.category ? ` - ${titleCase(item.category)}` : ''}`
                    : (item.category || item.purpose || '');
                if (meta.textContent) content.appendChild(meta);

                if (item.description) {
                    const description = document.createElement('p');
                    description.textContent = item.description;
                    content.appendChild(description);
                }
                
                // Add "Add to Cart" button for products
                if (isProduct) {
                    const addBtn = document.createElement('button');
                    addBtn.className = 'ai-chat-add-to-cart';
                    addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                    addBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        addProductToCart(item);
                        addBtn.textContent = '✓ Added!';
                        addBtn.style.background = '#00c853';
                        setTimeout(() => {
                            addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                            addBtn.style.background = '';
                        }, 1500);
                    });
                    content.appendChild(addBtn);
                }
            }

            card.appendChild(content);
            list.appendChild(card);
        });

        return list;
    }
    
    function addProductToCart(item) {
        // Access the global cart from the main script
        // Look for cart in window or parent scope
        if (typeof window.stepupCart !== 'undefined') {
            window.stepupCart(item.id);
        } else if (typeof window.addProductFromChat !== 'undefined') {
            window.addProductFromChat(item.id);
        } else {
            alert('Add to Cart feature is not yet available. Please refresh the page.');
        }
    }

    function renderSuggestions(container, suggestions) {
        container.innerHTML = '';
        suggestions.slice(0, 4).forEach(suggestion => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = suggestion;
            container.appendChild(button);
        });
    }

    function scrollToBottom(container) {
        container.scrollTop = container.scrollHeight;
    }

    function createLocalAnswer(message, store) {
        if (!store) {
            return {
                answer: 'I could not load the StepUp data store yet. Please run the site through a local server or deploy it, then try again.',
                items: [],
                suggestions: DEFAULT_SUGGESTIONS
            };
        }

        const query = normalizeText(message);
        const products = store.products || [];

        if (matchesAny(query, ['contact', 'phone', 'email', 'call', 'location', 'located', 'address', 'where are you'])) {
            return {
                answer: `StepUp is located at ${store.business.location.full}. You can call ${store.business.contact.phone} or email ${store.business.contact.email}.`,
                items: [],
                suggestions: ['Show me products', 'What payment methods do you accept?', 'How does delivery work?']
            };
        }

        if (matchesAny(query, ['owner', 'founder', 'charles', 'photo', 'picture', 'image']) && matchesAny(query, ['owner', 'founder', 'charles'])) {
            return {
                answer: `${store.business.founder.name} is the founder of StepUp. Here is the founder image available in the data store.`,
                items: [
                    {
                        title: store.business.founder.name,
                        description: store.about.originStory,
                        imageUrl: store.business.founder.imageUrl
                    }
                ],
                suggestions: ['Tell me about StepUp', 'Show store photo', 'Show testimonials']
            };
        }

        if (matchesAny(query, ['store photo', 'shop photo', 'store image', 'shop image'])) {
            return {
                answer: 'Here is the StepUp store image available in the data store.',
                items: [
                    {
                        title: 'StepUp store in Buea',
                        description: store.business.location.full,
                        imageUrl: store.about.images.storePhoto
                    }
                ],
                suggestions: ['Where is StepUp located?', 'Who founded StepUp?', 'Show me products']
            };
        }

        if (matchesAny(query, ['payment', 'pay', 'mtn', 'momo', 'orange money', 'checkout'])) {
            return {
                answer: `StepUp accepts ${store.policies.payments.acceptedMethods.join(' and ')}. During checkout, customers enter a phone number and delivery address, then receive a success confirmation and PDF receipt.`,
                items: [],
                suggestions: ['How does delivery work?', 'What is the return policy?', 'Show affordable shoes']
            };
        }

        if (matchesAny(query, ['delivery', 'shipping', 'deliver', 'ship'])) {
            return {
                answer: `StepUp offers ${store.policies.shipping.summary} Delivery is listed as ${store.policies.shipping.bueaArea} around Buea and ${store.policies.shipping.otherRegions} for other regions.`,
                items: [],
                suggestions: ['What payment methods do you accept?', 'Where is StepUp located?', 'Show sandals']
            };
        }

        if (matchesAny(query, ['return', 'refund', 'exchange'])) {
            return {
                answer: `${store.policies.returns.summary} Shoes should be unworn and returned with original packaging. Refunds are listed as ${store.policies.returns.refundTiming}.`,
                items: [],
                suggestions: ['Show formal shoes', 'How does delivery work?', 'Contact StepUp']
            };
        }

        if (matchesAny(query, ['review', 'testimonial', 'rating', 'trusted'])) {
            return {
                answer: `StepUp lists an overall rating of ${store.reviews.overallRating}/5 based on ${store.reviews.verifiedReviewCount} verified reviews. The testimonial section includes buyers from Buea, Douala, Limbe, Toronto, Sydney, and Yaounde.`,
                items: store.reviews.testimonials.slice(0, 3).map(r => ({
                    reviewer: r.reviewer,
                    rating: r.rating,
                    review: r.review,
                    location: r.location
                })),
                suggestions: ['Show me sneakers', 'Who founded StepUp?', 'What is the return policy?']
            };
        }

        if (matchesAny(query, ['about', 'mission', 'vision', 'story'])) {
            return {
                answer: `${store.about.originStory} Mission: ${store.about.mission} Vision: ${store.about.vision}`,
                items: [
                    {
                        title: store.business.founder.name,
                        description: 'Founder of StepUp',
                        imageUrl: store.about.images.founderPhoto
                    }
                ],
                suggestions: ['Show owner photo', 'Where is StepUp located?', 'Show products']
            };
        }

        const productAnswer = answerProducts(query, products, store.catalogSummary);
        if (productAnswer) return productAnswer;

        return {
            answer: `I can help with StepUp products, prices, images, delivery, payments, returns, reviews, contact info, and founder details. StepUp currently has ${store.catalogSummary.totalProducts} products across Sneakers, Formal, Sports, and Sandals.`,
            items: cheapestProducts(products, 3),
            suggestions: DEFAULT_SUGGESTIONS
        };
    }

    function answerProducts(query, products, summary) {
        const category = detectCategory(query);
        const budget = extractBudget(query);
        let matches = [];
        let answer = '';

        if (matchesAny(query, ['all products', 'catalog', 'everything', 'all shoes'])) {
            matches = products.slice(0, 6);
            answer = `StepUp has ${summary.totalProducts} products. I am showing a sample from the catalog.`;
        } else if (matchesAny(query, ['cheap', 'affordable', 'lowest', 'least expensive', 'budget'])) {
            matches = cheapestProducts(category ? products.filter(product => product.category === category) : products, 4);
            answer = category
                ? `Here are affordable ${titleCase(category)} options.`
                : 'Here are some of the most affordable StepUp products.';
        } else if (matchesAny(query, ['expensive', 'highest', 'premium', 'most expensive'])) {
            matches = [...(category ? products.filter(product => product.category === category) : products)]
                .sort((a, b) => b.priceXaf - a.priceXaf)
                .slice(0, 4);
            answer = category
                ? `Here are premium ${titleCase(category)} options.`
                : 'Here are the highest-priced products in the StepUp catalog.';
        } else if (category) {
            matches = products.filter(product => product.category === category);
            answer = `StepUp has ${matches.length} ${titleCase(category)} products.`;
        } else {
            matches = scoreProducts(query, products).slice(0, 4);
            if (matches.length) {
                answer = 'I found these matching StepUp products.';
            }
        }

        if (budget) {
            const base = matches.length ? matches : (category ? products.filter(product => product.category === category) : products);
            matches = base.filter(product => product.priceXaf <= budget).sort((a, b) => a.priceXaf - b.priceXaf).slice(0, 6);
            answer = category
                ? `Here are ${titleCase(category)} products at or under ${formatXaf(budget)}.`
                : `Here are StepUp products at or under ${formatXaf(budget)}.`;
        }

        if (!matches.length) return null;

        return {
            answer,
            items: matches.slice(0, 6),
            suggestions: ['Show cheaper options', 'Show product pictures', 'How do I pay?']
        };
    }

    function scoreProducts(query, products) {
        const words = query.split(/\s+/).filter(word => word.length > 2);
        return products
            .map(product => {
                const haystack = normalizeText(`${product.name} ${product.categoryLabel} ${product.description}`);
                const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
                return { product, score };
            })
            .filter(entry => entry.score > 0)
            .sort((a, b) => b.score - a.score || a.product.priceXaf - b.product.priceXaf)
            .map(entry => entry.product);
    }

    function cheapestProducts(products, count) {
        return [...products].sort((a, b) => a.priceXaf - b.priceXaf).slice(0, count);
    }

    function detectCategory(query) {
        if (matchesAny(query, ['sneaker', 'sneakers'])) return 'sneakers';
        if (matchesAny(query, ['formal', 'office', 'work', 'oxford', 'loafers', 'loafers'])) return 'formal';
        if (matchesAny(query, ['sport', 'sports', 'running', 'gym', 'football', 'hiking', 'tennis', 'cycling'])) return 'sports';
        if (matchesAny(query, ['sandal', 'sandals', 'slides', 'flip flop', 'flip flops'])) return 'sandals';
        return null;
    }

    function extractBudget(query) {
        const match = query.match(/(?:under|below|less than|max|maximum|budget|<=?)\s*(?:xaf\s*)?([0-9][0-9,]*)/i)
            || query.match(/([0-9][0-9,]*)\s*(?:xaf|francs?)/i);
        return match ? Number(match[1].replace(/,/g, '')) : null;
    }

    function matchesAny(query, terms) {
        return terms.some(term => query.includes(normalizeText(term)));
    }

    function normalizeText(value) {
        return String(value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function titleCase(value) {
        return String(value || '')
            .replace(/[-_]/g, ' ')
            .replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    }

    function formatXaf(amount) {
        return `XAF ${Number(amount || 0).toLocaleString('en-US')}`;
    }
})();
