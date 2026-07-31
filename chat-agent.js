(function () {
    'use strict';

    const STORE_URL = 'store-data.json';
    const GEMINI_API_KEY = 'AQ.Ab8RN6LtBc6dVg3hrstwpAqOJfhQ75wOsLGUyqdRvnq1uyJ5SA'; // Replace with a valid API Key from Google AI Studio (starts with AIza...)
    const GEMINI_MODEL = 'gemini-3.1-flash-lite';
    const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    const DEFAULT_SUGGESTIONS = [
        'Show me sneakers under 10000 XAF',
        'What payment methods do you accept?',
        'Where is StepUp located?'
    ];

    document.addEventListener('DOMContentLoaded', initChatAgent);

    function initChatAgent() {
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
            storePromise: null,
            history: [],
            busy: false,
            openedOnce: false
        };

        bindChatEvents(elements, state);
    }

    async function loadStoreData() {
        try {
            const response = await fetch(STORE_URL);
            if (!response.ok) throw new Error('Unable to load store data');
            return await response.json();
        } catch (error) {
            console.warn('StepUp AI data store unavailable:', error);
            return null;
        }
    }

    function ensureStoreData(state) {
        if (state.store) {
            return Promise.resolve(state.store);
        }

        if (!state.storePromise) {
            state.storePromise = loadStoreData()
                .then(store => {
                    state.store = store;
                    return store;
                })
                .finally(() => {
                    state.storePromise = null;
                });
        }

        return state.storePromise;
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
                await ensureStoreData(state);
                const response = await askStepUpAi(message, state);
                typingNode.remove();
                appendMessage(elements.messages, 'assistant', response);
                state.history.push({ role: 'assistant', content: response.answer });
                renderSuggestions(elements.suggestions, response.suggestions || DEFAULT_SUGGESTIONS);
            } catch (error) {
                typingNode.remove();
                console.warn('StepUp AI: Gemini API failed, using local fallback.', error);
                let fallback;
                try {
                    fallback = createLocalAnswer(message, state.store);
                } catch (_) {
                    fallback = {
                        answer: 'I\'m having trouble connecting right now. Please try again in a moment, or browse our products directly on the page!',
                        items: [],
                        suggestions: DEFAULT_SUGGESTIONS
                    };
                }
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
            ensureStoreData(state).catch(() => {});
            appendMessage(elements.messages, 'assistant', {
                answer: 'Hi, I am the StepUp AI assistant. Ask me about products, prices, images, delivery, payments, returns, or the owner.',
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
            'Answer ONLY from STORE_DATA unless the user asks general shoe-care advice.',
            '',
            'RULES:',
            '1. SPECIFIC PRODUCT: If the user mentions a product by name (e.g. "Neon Sport Sneakers"), return ONLY that one product in items. Do NOT add others.',
            '2. SUPERLATIVES: If the user asks for "the cheapest" or "the most expensive" (singular), return exactly 1 product. If they say "cheap shoes" or "affordable options" (plural), return up to 4.',
            '3. CATEGORIES: If the user asks about a category (sneakers, formal, sports, sandals), show products from that category only.',
            '4. NON-PRODUCT QUESTIONS: If the user asks about policies, delivery, payments, returns, contact, reviews, founder, location, or the website — answer with text ONLY. Do NOT include product cards in items unless specifically asked.',
            '5. REVIEWS: When returning reviews, use these fields in items: { "reviewer": "Name", "rating": 5, "review": "Review text", "location": "City" }. Do NOT use name/title/description for reviews.',
            '6. POLICIES: Give a complete summary covering shipping, returns, and payments when asked about policies/rules/terms.',
            '7. Do not invent sizes, stock levels, discounts, or delivery promises not in STORE_DATA.',
            '8. For payments, mention MTN Mobile Money and Orange Money only.',
            '9. If info is unavailable, say so and suggest contacting StepUp.',
            '10. if you are asked about the founder always return the image as well, this applies to all questions about the founder, do not return the founder information without the image. also for other questions about the store that might require an image, always check if there is an image in the store data and return it if available.',
            '',
            'Return strict JSON only:',
            '{"answer":"string","items":[{"id":0,"name":"string","category":"string","priceXaf":0,"description":"string","imageUrl":"string","reviewer":"string","rating":0,"review":"string","location":"string"}],"suggestions":["string"]}',
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
                card.addEventListener('click', () => {
                    const control = card.querySelector('.ai-chat-cart-control');
                    handleProductAdd(item, control);
                });
            }

            // Image (only for non-review cards with images)
            if (hasImage && !isReview) {
                const image = document.createElement('img');
                image.src = imageSource;
                image.alt = item.imageAlt || item.name || item.title || 'StepUp image';
                image.loading = 'lazy';
                image.decoding = 'async';
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
                
                // Add cart controls for products
                if (isProduct) {
                    const cartControl = document.createElement('div');
                    cartControl.className = 'ai-chat-cart-control';
                    cartControl.dataset.productId = item.id;
                    syncCartControl(cartControl);
                    cartControl.addEventListener('click', (e) => {
                        e.stopPropagation();

                        if (e.target.closest('.ai-chat-cart-minus')) {
                            removeProductFromCart(item);
                            syncCartControl(cartControl);
                            return;
                        }

                        if (e.target.closest('.ai-chat-cart-plus') || e.target.closest('.ai-chat-add-to-cart')) {
                            handleProductAdd(item, cartControl);
                        }
                    });
                    content.appendChild(cartControl);
                }
            }

            card.appendChild(content);
            list.appendChild(card);
        });

        return list;
    }

    function getCartQuantity(productId) {
        if (typeof window.getStepupCartQuantity === 'function') {
            return window.getStepupCartQuantity(productId);
        }

        if (Array.isArray(window.stepupCartItems)) {
            const item = window.stepupCartItems.find(cartItem => cartItem.id === Number(productId));
            return item ? item.quantity : 0;
        }

        return 0;
    }

    function syncCartControl(control) {
        if (!control) return;

        const quantity = getCartQuantity(control.dataset.productId);
        const card = control.closest('.ai-chat-item');

        if (quantity > 0) {
            control.classList.add('is-in-cart');
            if (card) card.classList.add('is-in-cart');
            control.innerHTML = `
                <button type="button" class="ai-chat-cart-step ai-chat-cart-minus" aria-label="Remove one item">-</button>
                <span class="ai-chat-cart-status">In cart</span>
                <span class="ai-chat-cart-qty" aria-live="polite">${quantity}</span>
                <button type="button" class="ai-chat-cart-step ai-chat-cart-plus" aria-label="Add one more item">+</button>
            `;
        } else {
            control.classList.remove('is-in-cart');
            if (card) card.classList.remove('is-in-cart');
            control.innerHTML = '<button type="button" class="ai-chat-add-to-cart"><i class="fas fa-cart-plus"></i> Add to Cart</button>';
        }
    }

    function syncAllCartControls() {
        document.querySelectorAll('.ai-chat-cart-control[data-product-id]').forEach(syncCartControl);
    }

    function handleProductAdd(item, control) {
        addProductToCart(item);
        syncCartControl(control);
    }

    window.addEventListener('stepup:cart-updated', syncAllCartControls);
    
    function addProductToCart(item) {
        // Access the global cart from the main script
        // Look for cart in window or parent scope
        let quantity = 0;

        if (typeof window.stepupCart !== 'undefined') {
            quantity = window.stepupCart(item.id);
        } else if (typeof window.addProductFromChat !== 'undefined') {
            quantity = window.addProductFromChat(item.id, { openCart: false });
        } else {
            alert('Add to Cart feature is not yet available. Please refresh the page.');
        }

        return Number(quantity) || getCartQuantity(item.id);
    }

    function removeProductFromCart(item) {
        if (typeof window.removeProductFromChat === 'function') {
            return window.removeProductFromChat(item.id);
        }

        alert('Cart quantity controls are not yet available. Please refresh the page.');
        return getCartQuantity(item.id);
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

    function createLocalAnswer() {
        return {
            answer: 'I\'m currently offline or having trouble connecting to my AI servers. Please check your internet connection and try again!',
            items: [],
            suggestions: DEFAULT_SUGGESTIONS
        };
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
