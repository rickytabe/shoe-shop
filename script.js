// ============================================================
// StepUp Shoe Shop — Updated Products Array (30 Products)
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
        image: "https://images.unsplash.com/photo-1584735175315-9d5df23be620?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
    }

];

// ============================================================
// PRICE SUMMARY (for AI system prompt reference)
// ============================================================
//
// SNEAKERS:   4,500 – 14,500 XAF
// FORMAL:     9,000 – 17,500 XAF
// SPORTS:    15,000 – 22,000 XAF
// SANDALS:    2,500 – 10,500 XAF
//
// Most affordable: Flip Flops @ 2,500 XAF
// Most expensive:  Trail Running Shoes @ 22,000 XAF
// ============================================================