document.addEventListener('DOMContentLoaded', function() {
    // Products data
    const products = [
        {
            id: 1,
            name: "Classic White Sneakers",
            price: 89.99,
            category: "sneakers",
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Timeless white sneakers for everyday comfort and style."
        },
        {
            id: 2,
            name: "Leather Oxford Shoes",
            price: 129.99,
            category: "formal",
            image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Elegant leather oxfords perfect for formal occasions."
        },
        {
            id: 3,
            name: "Running Pro",
            price: 109.99,
            category: "sports",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "High-performance running shoes with advanced cushioning."
        },
        {
            id: 4,
            name: "Summer Sandals",
            price: 49.99,
            category: "sandals",
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Comfortable and breathable sandals for hot summer days."
        },
        {
            id: 5,
            name: "High-Top Basketball",
            price: 119.99,
            category: "sneakers",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Premium basketball shoes with ankle support and grip."
        },
        {
            id: 6,
            name: "Loafers",
            price: 79.99,
            category: "formal",
            image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Classic loafers for a smart casual look."
        },
        {
            id: 7,
            name: "Hiking Boots",
            price: 149.99,
            category: "sports",
            image: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Durable hiking boots with waterproof membrane."
        },
        {
            id: 8,
            name: "Flip Flops",
            price: 29.99,
            category: "sandals",
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            description: "Lightweight flip flops for beach and poolside."
        }
    ];

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
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const contactForm = document.getElementById('contact-form');
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    
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
        productGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.category = product.category;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners to add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

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

    // Update cart function
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
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
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
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
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
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

    // Checkout function
    function checkout() {
        alert(`Thank you for your purchase! Total: $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`);
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
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
            displayProducts(filter);
        });
    });

    // Cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', checkout);

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
        
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initialize
    displayProducts();
});