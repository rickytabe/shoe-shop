document.addEventListener('DOMContentLoaded', function() {
  // ============================================================
// StepUp Shoe Shop — Updated Products Array (42 Products)
// Replace the existing `const products = [...]` in script.js
// with this entire block
// ============================================================

const products = [

    // ── SNEAKERS ────────────────────────────────────────────

    {
        id: 1,
        name: "Classic White Sneakers",
        price: 5500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Timeless white sneakers for everyday comfort and style."
    },
    {
        id: 5,
        name: "High-Top Basketball",
        price: 14500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Premium basketball shoes with ankle support and superior grip."
    },
    {
        id: 9,
        name: "Urban Street Sneakers",
        price: 8500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Bold streetwear sneakers built for the city grind."
    },
    {
        id: 10,
        name: "Retro Low-Top",
        price: 7000,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Vintage-inspired low-tops with a clean, minimalist profile."
    },
    {
        id: 11,
        name: "Black Leather Sneakers",
        price: 9500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Sleek black leather sneakers that go from casual to semi-formal."
    },
    {
        id: 12,
        name: "Chunky Platform Sneakers",
        price: 11000,
        category: "sneakers",
        image: "https://i.pinimg.com/1200x/dd/61/0b/dd610bafcc55fe883290b51596c84edf.jpg",
        description: "Bold platform sole for extra height and street-ready style."
    },
    {
        id: 13,
        name: "Canvas Slip-On Sneakers",
        price: 4500,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Lightweight canvas slip-ons perfect for casual everyday wear."
    },
    {
        id: 14,
        name: "Neon Sport Sneakers",
        price: 10000,
        category: "sneakers",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Vibrant neon colorways with responsive cushioning for active days."
    },

    // ── FORMAL ──────────────────────────────────────────────

    {
        id: 2,
        name: "Leather Oxford Shoes",
        price: 12000,
        category: "formal",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Elegant leather oxfords perfect for formal occasions."
    },
    {
        id: 6,
        name: "Loafers",
        price: 9000,
        category: "formal",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Classic loafers for a smart casual look."
    },
    {
        id: 15,
        name: "Suede Chelsea Boots",
        price: 17500,
        category: "formal",
        image: "https://i.pinimg.com/1200x/16/be/c3/16bec35f9f69de9fb0a03ed888213972.jpg",
        description: "Premium suede chelsea boots that elevate any formal outfit."
    },
    {
        id: 16,
        name: "Derby Dress Shoes",
        price: 14000,
        category: "formal",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Sharp derby shoes crafted for boardroom confidence."
    },
    {
        id: 17,
        name: "Patent Leather Monk Straps",
        price: 16000,
        category: "formal",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Two-strap monk shoes in high-shine patent leather for standout elegance."
    },
    {
        id: 18,
        name: "Brown Brogue Wingtips",
        price: 13500,
        category: "formal",
        image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Classic wingtip brogues with decorative perforation detailing."
    },
    {
        id: 19,
        name: "Women's Block Heel Pumps",
        price: 11500,
        category: "formal",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Stable block heel pumps for all-day professional wear."
    },

    // ── SPORTS ──────────────────────────────────────────────

    {
        id: 3,
        name: "Running Pro",
        price: 19999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "High-performance running shoes with advanced cushioning."
    },
    {
        id: 7,
        name: "Hiking Boots",
        price: 18000,
        category: "sports",
        image: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Durable hiking boots with waterproof membrane."
    },
    {
        id: 20,
        name: "Trail Running Shoes",
        price: 22000,
        category: "sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Aggressive grip outsole for off-road trail running and adventure."
    },
    {
        id: 21,
        name: "Football Cleats",
        price: 16500,
        category: "sports",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Firm-ground cleats engineered for speed, control, and traction."
    },
    {
        id: 22,
        name: "Gym Training Shoes",
        price: 15000,
        category: "sports",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Flat-soled cross-trainers built for weightlifting and gym workouts."
    },
    {
        id: 23,
        name: "Cycling Shoes",
        price: 20000,
        category: "sports",
        image: "https://i.pinimg.com/736x/90/c0/89/90c089964eb12a6395f3393a15f6f410.jpg",
        description: "Stiff-soled cycling shoes for maximum power transfer on the pedals."
    },
    {
        id: 24,
        name: "Tennis Court Shoes",
        price: 17000,
        category: "sports",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Lateral support and herringbone tread for hard-court dominance."
    },

    // ── SANDALS ─────────────────────────────────────────────

    {
        id: 4,
        name: "Summer Sandals",
        price: 4000,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Comfortable and breathable sandals for hot summer days."
    },
    {
        id: 8,
        name: "Flip Flops",
        price: 2500,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Lightweight flip flops for beach and poolside relaxation."
    },
    {
        id: 25,
        name: "Leather Slide Sandals",
        price: 6500,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Premium leather slides with cushioned footbed for all-day comfort."
    },
    {
        id: 26,
        name: "Gladiator Sandals",
        price: 7500,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Multi-strap gladiator sandals that make a bold fashion statement."
    },
    {
        id: 27,
        name: "Sports Sandals",
        price: 8000,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Rugged outdoor sandals with adjustable straps and toe protection."
    },
    {
        id: 28,
        name: "Platform Espadrille Sandals",
        price: 9000,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Woven espadrille platform sandals for a relaxed resort look."
    },
    {
        id: 29,
        name: "Ankle Strap Heeled Sandals",
        price: 10500,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Elegant heeled sandals with secure ankle strap for evening events."
    },
    {
        id: 30,
        name: "Kids Velcro Sandals",
        price: 3500,
        category: "sandals",
        image: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Easy velcro fastening sandals built tough for active kids."
    },
    {
        id: 31,
        name: "Nike Air Max Casual",
        price: 22000,
        category: "sneakers",
        image: "https://i.pinimg.com/1200x/a1/37/67/a137676adce11fd44f881c9f8893bd7f.jpg",
        description: "Premium Nike Air Max with vibrant colorways and exceptional cushioning."
    },
    {
        id: 32,
        name: "Nike Dunk High Red/Black",
        price: 25000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/78/a7/74/78a7745a54a0d3b5d9751e300dfc5478.jpg",
        description: "Classic high-top Nike Dunks featuring iconic red and black blocking."
    },
    {
        id: 33,
        name: "Nike Air Max 90 Essential",
        price: 24000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/e6/01/7e/e6017ebb46111d34aef356455279aab1.jpg",
        description: "The quintessential Nike Air Max 90 with its signature visible Air unit."
    },
    {
        id: 34,
        name: "Nike Air Force 1 Premium",
        price: 28000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/8c/0f/26/8c0f26aaae44d62586cf71478ed5d36f.jpg",
        description: "Timeless Nike Air Force 1 with a premium leather finish and thick sole."
    },
    {
        id: 35,
        name: "Adidas Ultraboost Lite",
        price: 21000,
        category: "sports",
        image: "https://i.pinimg.com/1200x/14/83/4b/14834b246f892f8b74ce2a42fbd6eaf9.jpg",
        description: "High-performance running shoes with responsive Boost midsole and breathable mesh upper."
    },
    {
        id: 36,
        name: "Adidas Samba Classic",
        price: 19000,
        category: "sports",
        image: "https://i.pinimg.com/736x/bc/c1/5c/bcc15caeec70346bbcc84130f4de7472.jpg",
        description: "Iconic indoor soccer shoe turned streetwear staple with full-grain leather and suede."
    },
    {
        id: 37,
        name: "Adidas NMD R1",
        price: 23000,
        category: "sports",
        image: "https://i.pinimg.com/736x/b6/7e/0a/b67e0ab612080fff7c708a3c49d417ac.jpg",
        description: "Modern urban sneaker featuring energy-returning cushioning and a flexible knit upper."
    },
    {
        id: 38,
        name: "Adidas Stan Smith",
        price: 17500,
        category: "sports",
        image: "https://i.pinimg.com/736x/30/05/d2/3005d2f9e1aba3c8464f28c565de7c63.jpg",
        description: "Clean, minimalist tennis shoes that have defined everyday casual style for decades."
    },
    {
        id: 39,
        name: "Balenciaga Triple S",
        price: 35000,
        category: "sneakers",
        image: "https://i.pinimg.com/1200x/4a/a8/6e/4aa86ef5b700609284f6a588e311b01a.jpg",
        description: "The iconic chunky luxury sneaker that redefined streetwear with its signature oversized three-layered sole."
    },
    {
        id: 40,
        name: "Balenciaga Track Sneaker",
        price: 38000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/2f/5e/cb/2f5ecbda08fa73fe0665e0d47af3c403.jpg",
        description: "High-fashion hiking and running inspired sneaker with complex, multi-layered mesh and nylon cage construction."
    },
    {
        id: 41,
        name: "Balenciaga Speed Trainer",
        price: 32000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/30/72/1c/30721cb8c940fd8030ae0969cd7192b9.jpg",
        description: "Minimalist sock-style luxury runner featuring a comfortable 3D knit upper and an ultra-flexible ergonomic sole."
    },
    {
        id: 42,
        name: "Balenciaga Defender",
        price: 42000,
        category: "sneakers",
        image: "https://i.pinimg.com/736x/fc/01/85/fc0185016c0155b59d85c2d835154efb.jpg",
        description: "Avant-garde statement sneaker with an extreme tire-tread sole for ultimate distressed luxury."
    }

];

// ============================================================
// PRICE SUMMARY (for AI system prompt reference)
// ============================================================
//
// SNEAKERS:   4,500 – 42,000 XAF
// FORMAL:     9,000 – 17,500 XAF
// SPORTS:    15,000 – 23,000 XAF
// SANDALS:    2,500 – 10,500 XAF
//
// Most affordable: Flip Flops @ 2,500 XAF
// Most expensive:  Balenciaga Defender @ 42,000 XAF
// ============================================================

    // Shopping cart
    let cart = [];

    // DOM elements
    const productGrid = document.querySelector('.product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total span');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const paymentModal = document.querySelector('.payment-modal');
    const closePayment = document.querySelector('.close-payment');
    const paymentForm = document.querySelector('.payment-form');
    const paymentMethodInputs = document.querySelectorAll('input[name="payment-method"]');
    const paymentAmount = document.getElementById('payment-amount');
    const paymentItemsContainer = document.querySelector('.payment-items');
    const payNowBtn = document.querySelector('.pay-now-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('success-overlay');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const successCloseBtn = document.getElementById('success-close-btn');
    const successDownloadBtn = document.getElementById('success-download-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

    // Theme logic
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Store last receipt data for download button
    let lastReceiptData = null;
    let jsPdfPromise = null;

    // Track purchased product IDs for delivery badges
    let purchasedProductIds = JSON.parse(localStorage.getItem('stepup_purchased') || '[]');
    let currentProductFilter = 'all';
    let hasRenderedProducts = false;

    function getCartSnapshot() {
        return cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
    }

    function getCartQuantity(productId) {
        const item = cart.find(cartItem => cartItem.id === Number(productId));
        return item ? item.quantity : 0;
    }

    function publishCartState() {
        const detail = {
            items: getCartSnapshot(),
            totalItems: cart.reduce((total, item) => total + item.quantity, 0),
            total: getCartTotal()
        };

        window.stepupCartItems = detail.items;
        window.dispatchEvent(new CustomEvent('stepup:cart-updated', { detail }));
    }

    
   // Mobile sidebar toggle

menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

[sidebarClose, overlay].forEach(el => {
    el.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
});

    // Close sidebar when clicking a link
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // Display products
    function displayProducts(filter = 'all') {
        currentProductFilter = filter;
        productGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        const productCards = document.createDocumentFragment();
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.category = product.category;

            const isPurchased = purchasedProductIds.includes(product.id);
            const deliveryBadge = isPurchased
                ? `<div class="delivery-badge"><i class="fas fa-check-circle"></i> Delivering</div>`
                : '';
            
            productCard.innerHTML = `
                <div class="product-image">
                    ${deliveryBadge}
                    <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" fetchpriority="low">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">XAF ${product.price}</span>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-plus"></i> Buy
                        </button>
                    </div>
                </div>
            `;
            
            productCards.appendChild(productCard);
        });

        productGrid.appendChild(productCards);
    }

    function renderProductsNow(filter = currentProductFilter) {
        hasRenderedProducts = true;
        displayProducts(filter);
    }

    function scheduleInitialProductRender() {
        const productsSection = document.getElementById('products');

        if (!productsSection || !('IntersectionObserver' in window)) {
            const schedule = window.requestIdleCallback || function(callback) {
                return setTimeout(callback, 500);
            };
            schedule(() => renderProductsNow());
            return;
        }

        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            observer.disconnect();
            if (hasRenderedProducts) return;
            renderProductsNow();
        }, { rootMargin: '600px 0px' });

        observer.observe(productsSection);
    }

    productGrid.addEventListener('click', event => {
        const button = event.target.closest('.add-to-cart');
        if (!button || !productGrid.contains(button)) return;
        addToCart(event);
    });

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show cart modal
        cartModal.style.display = 'flex';
    }
    
    // Add to cart from chat function (callable by chat-agent.js)
    function addProductFromChat(productId, options = {}) {
        const normalizedProductId = Number(productId);
        const product = products.find(p => p.id === normalizedProductId);
        const shouldOpenCart = options.openCart !== false;
        
        if (!product) {
            alert('Product not found');
            return 0;
        }
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === normalizedProductId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        
        if (shouldOpenCart) {
            cartModal.style.display = 'flex';
        }

        return getCartQuantity(normalizedProductId);
    }

    function removeProductFromChat(productId) {
        const normalizedProductId = Number(productId);
        const existingItem = cart.find(item => item.id === normalizedProductId);

        if (!existingItem) {
            return 0;
        }

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== normalizedProductId);
        }

        updateCart();
        return getCartQuantity(normalizedProductId);
    }
    
    // Make the function globally accessible for chat
    window.addProductFromChat = addProductFromChat;
    window.removeProductFromChat = removeProductFromChat;
    window.getStepupCartQuantity = getCartQuantity;
    window.stepupProducts = products;

    // Update cart function
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        publishCartState();
        
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">XAF${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <p class="remove-item" data-id="${item.id}">Remove</p>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        // Update total
        cartTotal.textContent = `XAF ${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', updateQuantity);
        });
        
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Update quantity function
    function updateQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Remove item if quantity is 0
                cart = cart.filter(item => item.id !== productId);
            }
        } else if (e.target.classList.contains('plus')) {
            item.quantity += 1;
        } else if (e.target.classList.contains('quantity-input')) {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        
        updateCart();
    }

    // Remove item function
    function removeItem(e) {
        const productId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function setActivePaymentMethod() {
        const methodCards = document.querySelectorAll('.payment-method-card');
        methodCards.forEach(card => card.classList.remove('active'));

        paymentMethodInputs.forEach(input => {
            if (input.checked) {
                input.closest('.payment-method-card').classList.add('active');
            }
        });
    }

    function renderPaymentItems() {
        paymentItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'payment-item-row';
            row.innerHTML = `
                <span class="payment-item-name">${item.name} x ${item.quantity}</span>
                <span class="payment-item-price">XAF ${(item.price * item.quantity).toFixed(2)}</span>
            `;
            paymentItemsContainer.appendChild(row);
        });
    }

    function loadJsPdf() {
        if (window.jspdf && window.jspdf.jsPDF) {
            return Promise.resolve(window.jspdf);
        }

        if (!jsPdfPromise) {
            jsPdfPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = JSPDF_URL;
                script.async = true;
                script.onload = () => {
                    if (window.jspdf && window.jspdf.jsPDF) {
                        resolve(window.jspdf);
                    } else {
                        reject(new Error('jsPDF loaded without expected API'));
                    }
                };
                script.onerror = () => reject(new Error('Unable to load jsPDF'));
                document.head.appendChild(script);
            }).catch(error => {
                jsPdfPromise = null;
                throw error;
            });
        }

        return jsPdfPromise;
    }

    async function downloadReceipt(reference, method, phone, address, items, total) {
        try {
            await loadJsPdf();
        } catch (error) {
            console.warn('Receipt generator unavailable:', error);
            alert('The receipt generator could not load. Please try again in a moment.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const now = new Date();
        let y = 20;

        doc.setFontSize(18);
        doc.text('StepUp Payment Receipt', 14, y);
        y += 10;

        doc.setFontSize(11);
        doc.text(`Date: ${now.toLocaleString()}`, 14, y);
        y += 7;
        doc.text(`Reference: ${reference}`, 14, y);
        y += 7;
        doc.text(`Payment Method: ${method}`, 14, y);
        y += 7;
        doc.text(`Phone: ${phone}`, 14, y);
        y += 7;
        doc.text(`Delivery Address: ${address}`, 14, y);
        y += 10;

        doc.setFontSize(12);
        doc.text('Items', 14, y);
        y += 7;

        doc.setFontSize(11);
        items.forEach(item => {
            const line = `${item.name} x${item.quantity}`;
            const lineTotal = `XAF ${(item.price * item.quantity).toFixed(2)}`;
            doc.text(line, 14, y);
            doc.text(lineTotal, 165, y, { align: 'right' });
            y += 7;
        });

        y += 4;
        doc.setFontSize(13);
        doc.text(`Total: XAF ${total.toFixed(2)}`, 14, y);

        doc.save(`stepup-receipt-${reference}.pdf`);
    }

    function openPaymentModal() {
        if (cart.length === 0) {
            alert('Your cart is empty. Add products before checkout.');
            return;
        }

        renderPaymentItems();
        paymentAmount.textContent = `XAF ${getCartTotal().toFixed(2)}`;
        cartModal.style.display = 'none';
        paymentModal.style.display = 'flex';
        setActivePaymentMethod();
    }

    // Checkout function
    function checkout() {
        openPaymentModal();
    }

    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter products
            const filter = button.dataset.filter;
            renderProductsNow(filter);
        });
    });

    // Cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    closePayment.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }

        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', checkout);

    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', setActivePaymentMethod);
    });

    // ===== CONFETTI PARTICLE SYSTEM =====
    function launchConfetti() {
        const canvas = confettiCanvas;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = [
            '#ff6b6b', '#4ecdc4', '#ffd166', '#00c853', '#69f0ae',
            '#ff9ff3', '#feca57', '#54a0ff', '#5f27cd', '#ff6348',
            '#1dd1a1', '#f368e0', '#ff9f43', '#0abde3', '#ee5a24'
        ];

        const particles = [];
        const particleCount = 200;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20 - 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 3,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                gravity: 0.15 + Math.random() * 0.1,
                drag: 0.98,
                opacity: 1,
                shape: Math.floor(Math.random() * 3) // 0=rect, 1=circle, 2=triangle
            });
        }

        let animFrameId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let allDead = true;

            particles.forEach(p => {
                p.vx *= p.drag;
                p.vy *= p.drag;
                p.vy += p.gravity;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.rotationSpeed;
                p.opacity -= 0.004;

                if (p.opacity > 0) {
                    allDead = false;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;

                    if (p.shape === 0) {
                        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    } else if (p.shape === 1) {
                        ctx.beginPath();
                        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(0, -p.size / 2);
                        ctx.lineTo(p.size / 2, p.size / 2);
                        ctx.lineTo(-p.size / 2, p.size / 2);
                        ctx.closePath();
                        ctx.fill();
                    }

                    ctx.restore();
                }
            });

            if (!allDead) {
                animFrameId = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animFrameId);
            }
        }

        animate();

        // Fire side bursts after a tiny delay for a "party popper" effect
        setTimeout(() => {
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: 0,
                    y: canvas.height,
                    vx: Math.random() * 15 + 5,
                    vy: -(Math.random() * 18 + 8),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 7 + 3,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 15,
                    gravity: 0.18,
                    drag: 0.97,
                    opacity: 1,
                    shape: Math.floor(Math.random() * 3)
                });
                particles.push({
                    x: canvas.width,
                    y: canvas.height,
                    vx: -(Math.random() * 15 + 5),
                    vy: -(Math.random() * 18 + 8),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 7 + 3,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 15,
                    gravity: 0.18,
                    drag: 0.97,
                    opacity: 1,
                    shape: Math.floor(Math.random() * 3)
                });
            }
        }, 300);
    }

    function showSuccessOverlay(reference, address, method, phone, items, total) {
        document.getElementById('success-reference').textContent = `Ref: ${reference}`;
        document.getElementById('success-address').textContent = address;
        // Store receipt data for download button
        lastReceiptData = { reference, method, phone, address, items, total };
        successOverlay.classList.add('active');
        launchConfetti();
    }

    function hideSuccessOverlay() {
        successOverlay.classList.remove('active');
    }

    successCloseBtn.addEventListener('click', hideSuccessOverlay);

    successDownloadBtn.addEventListener('click', async function() {
        if (lastReceiptData) {
            const d = lastReceiptData;
            successDownloadBtn.disabled = true;
            const originalContent = successDownloadBtn.innerHTML;
            successDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
            try {
                await downloadReceipt(d.reference, d.method, d.phone, d.address, d.items, d.total);
            } finally {
                successDownloadBtn.disabled = false;
                successDownloadBtn.innerHTML = originalContent;
            }
        }
    });

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const phone = document.getElementById('payment-phone').value.trim();
        const address = document.getElementById('payment-address').value.trim();
        const total = getCartTotal();
        const receiptItems = cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
        const purchasedIds = cart.map(item => item.id);

        if (!phone) {
            alert('Please enter your phone number to continue.');
            return;
        }
        if (!address) {
            alert('Please enter your delivery address.');
            return;
        }

        payNowBtn.disabled = true;
        payNowBtn.textContent = 'Processing...';

        // Simulate payment processing
        setTimeout(() => {
            const reference = `STP-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

            // Save purchased items for delivery badges
            purchasedIds.forEach(id => {
                if (!purchasedProductIds.includes(id)) {
                    purchasedProductIds.push(id);
                }
            });
            localStorage.setItem('stepup_purchased', JSON.stringify(purchasedProductIds));

            // Close payment modal, show success overlay (receipt download is on success card)
            paymentModal.style.display = 'none';
            showSuccessOverlay(reference, address, selectedMethod, phone, receiptItems, total);

            // Reset everything
            cart = [];
            updateCart();
            renderProductsNow(); // re-render to show delivery badges
            paymentForm.reset();
            paymentItemsContainer.innerHTML = '';
            document.getElementById('method-mtn').checked = true;
            setActivePaymentMethod();
            payNowBtn.disabled = false;
            payNowBtn.textContent = 'Pay Now';
        }, 2200);
    });

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    if (testimonials.length && dots.length === testimonials.length) {
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('nav ul li a, .sidebar-nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile sidebar if open
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                }
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a, .sidebar-nav ul li a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize
    scheduleInitialProductRender();
});

document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    if (!testimonials.length || !prevBtn || !nextBtn || dots.length !== testimonials.length) return;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    prevBtn.addEventListener('click', function() {
        let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    });

    nextBtn.addEventListener('click', function() {
        let newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });

    // Auto-rotate every 5 seconds (optional)
    setInterval(() => {
        let newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    }, 5000);
});

// Hero Shoe Rotation
document.addEventListener('DOMContentLoaded', function() {
    const heroShoes = document.querySelectorAll('.hero-shoe');
    const heroDots = document.querySelectorAll('.hero-dot');
    if (!heroShoes.length) return;

    let currentShoe = 0;
    let heroInterval;

    function loadHeroShoe(shoe) {
        if (!shoe || !shoe.dataset.src) return;
        shoe.src = shoe.dataset.src;
        delete shoe.dataset.src;
    }

    function preloadHeroShoes() {
        heroShoes.forEach(loadHeroShoe);
    }

    function showShoe(index) {
        loadHeroShoe(heroShoes[index]);
        heroShoes.forEach(s => s.classList.remove('active'));
        heroDots.forEach(d => d.classList.remove('active'));
        heroShoes[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentShoe = index;
    }

    function startRotation() {
        heroInterval = setInterval(() => {
            showShoe((currentShoe + 1) % heroShoes.length);
        }, 3000);
    }

    heroDots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(heroInterval);
            showShoe(parseInt(this.dataset.index));
            startRotation();
        });
    });

    const schedulePreload = window.requestIdleCallback || function(callback) {
        return setTimeout(callback, 1200);
    };

    schedulePreload(preloadHeroShoes);
    startRotation();
});
