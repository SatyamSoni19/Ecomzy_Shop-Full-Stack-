export const products = [
  // Electronics - Smartphones
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    price: 1199.00,
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    productUrl: "https://www.apple.com/iphone-15-pro/",
    rating: { rate: 4.9, count: 3200 }
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 1299.99,
    description: "Premium Android smartphone with S Pen, 200MP camera, and AI features.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    productUrl: "https://www.samsung.com/us/smartphones/galaxy-s24-ultra/",
    rating: { rate: 4.8, count: 2800 }
  },
  {
    id: 3,
    title: "Google Pixel 8 Pro",
    price: 999.00,
    description: "Google's flagship with advanced AI photography and pure Android experience.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    productUrl: "https://store.google.com/product/pixel_8_pro",
    rating: { rate: 4.7, count: 1900 }
  },

  // Electronics - Laptops
  {
    id: 4,
    title: "MacBook Pro 16-inch M3",
    price: 2499.00,
    description: "Powerful laptop with M3 chip, stunning Liquid Retina XDR display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    productUrl: "https://www.apple.com/macbook-pro/",
    rating: { rate: 4.9, count: 2100 }
  },
  {
    id: 5,
    title: "Dell XPS 15",
    price: 1899.99,
    description: "Premium Windows laptop with InfinityEdge display and powerful performance.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    productUrl: "https://www.dell.com/en-us/shop/dell-laptops/xps-15-laptop/spd/xps-15-9530-laptop",
    rating: { rate: 4.6, count: 1500 }
  },
  {
    id: 6,
    title: "Lenovo ThinkPad X1 Carbon",
    price: 1699.00,
    description: "Business laptop with legendary keyboard and military-grade durability.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    productUrl: "https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-gen-11/len101t0049",
    rating: { rate: 4.7, count: 1200 }
  },

  // Electronics - Headphones
  {
    id: 7,
    title: "Sony WH-1000XM5",
    price: 399.99,
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
    productUrl: "https://electronics.sony.com/audio/headphones/headband/p/wh1000xm5-b",
    rating: { rate: 4.8, count: 4200 }
  },
  {
    id: 8,
    title: "Apple AirPods Pro 2",
    price: 249.00,
    description: "Active noise cancellation, Adaptive Audio, and personalized spatial audio.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500",
    productUrl: "https://www.apple.com/airpods-pro/",
    rating: { rate: 4.7, count: 5100 }
  },
  {
    id: 9,
    title: "Bose QuietComfort Ultra",
    price: 429.00,
    description: "Premium headphones with world-class noise cancellation and immersive audio.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    productUrl: "https://www.bose.com/p/headphones/bose-quietcomfort-ultra-headphones/",
    rating: { rate: 4.6, count: 1800 }
  },

  // Sneakers - Nike
  {
    id: 10,
    title: "Nike Air Force 1 '07",
    price: 110.00,
    description: "The iconic basketball shoe with crisp leather and bold colors.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    productUrl: "https://www.nike.com/t/air-force-1-07-mens-shoes-5QFp5Z",
    rating: { rate: 4.8, count: 8900 }
  },
  {
    id: 11,
    title: "Nike Air Max 90",
    price: 130.00,
    description: "Classic running shoe with visible Air cushioning and retro style.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    productUrl: "https://www.nike.com/t/air-max-90-mens-shoes-6n8tKB",
    rating: { rate: 4.7, count: 6700 }
  },
  {
    id: 12,
    title: "Nike Dunk Low Retro",
    price: 115.00,
    description: "Basketball icon returns with classic colorways and premium materials.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
    productUrl: "https://www.nike.com/t/dunk-low-retro-mens-shoes-DD1391",
    rating: { rate: 4.9, count: 5400 }
  },

  // Sneakers - Adidas
  {
    id: 13,
    title: "Adidas Ultraboost 23",
    price: 190.00,
    description: "Premium running shoes with responsive Boost cushioning.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
    productUrl: "https://www.adidas.com/us/ultraboost-23-shoes/GY9334.html",
    rating: { rate: 4.8, count: 3200 }
  },
  {
    id: 14,
    title: "Adidas Samba Classic",
    price: 90.00,
    description: "Timeless soccer-inspired sneaker with suede and leather upper.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500",
    productUrl: "https://www.adidas.com/us/samba-classic-shoes/034563.html",
    rating: { rate: 4.7, count: 4100 }
  },
  {
    id: 15,
    title: "Adidas Stan Smith",
    price: 85.00,
    description: "Iconic tennis shoe with minimalist design and timeless appeal.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500",
    productUrl: "https://www.adidas.com/us/stan-smith-shoes/FX5500.html",
    rating: { rate: 4.6, count: 7200 }
  },

  // Sneakers - Jordan
  {
    id: 16,
    title: "Air Jordan 1 Retro High OG",
    price: 180.00,
    description: "The legendary sneaker that started it all, remastered with premium materials.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
    productUrl: "https://www.nike.com/t/air-jordan-1-retro-high-og-shoes-Pz6Izc",
    rating: { rate: 4.9, count: 12000 }
  },
  {
    id: 17,
    title: "Air Jordan 4 Retro",
    price: 215.00,
    description: "Classic basketball shoe with iconic design and visible Air cushioning.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1612902376959-093e4e2c5b5e?w=500",
    productUrl: "https://www.nike.com/t/air-jordan-4-retro-shoes-2NJB3j",
    rating: { rate: 4.8, count: 8500 }
  },

  // Sneakers - New Balance
  {
    id: 18,
    title: "New Balance 574 Core",
    price: 84.99,
    description: "Versatile lifestyle sneaker with ENCAP cushioning technology.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
    productUrl: "https://www.newbalance.com/pd/574-core/ML574-EG.html",
    rating: { rate: 4.6, count: 5600 }
  },
  {
    id: 19,
    title: "New Balance 990v6",
    price: 199.99,
    description: "Premium Made in USA sneaker with superior comfort and craftsmanship.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    productUrl: "https://www.newbalance.com/pd/made-in-usa-990v6/M990-V6.html",
    rating: { rate: 4.9, count: 3400 }
  },

  // Men's Clothing
  {
    id: 20,
    title: "Levi's 501 Original Jeans",
    price: 69.50,
    description: "The original blue jean since 1873, with a straight leg and button fly.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    productUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/501-original-fit-mens-jeans/p/005010000",
    rating: { rate: 4.7, count: 9800 }
  },
  {
    id: 21,
    title: "Carhartt WIP Detroit Jacket",
    price: 149.00,
    description: "Durable work jacket with blanket lining and multiple pockets.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    productUrl: "https://www.carhartt-wip.com/en/men-jackets-detroit-jacket",
    rating: { rate: 4.8, count: 2100 }
  },
  {
    id: 22,
    title: "Patagonia Better Sweater",
    price: 139.00,
    description: "Cozy fleece jacket with sweater-knit aesthetic and eco-friendly materials.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    productUrl: "https://www.patagonia.com/product/mens-better-sweater-fleece-jacket/25528.html",
    rating: { rate: 4.9, count: 4500 }
  },
  {
    id: 23,
    title: "Ralph Lauren Polo Shirt",
    price: 89.50,
    description: "Classic cotton mesh polo with signature embroidered pony.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    productUrl: "https://www.ralphlauren.com/men-clothing-polos/classic-fit-mesh-polo-shirt/0043895118.html",
    rating: { rate: 4.6, count: 6200 }
  },
  {
    id: 24,
    title: "Champion Reverse Weave Hoodie",
    price: 70.00,
    description: "Iconic heavyweight hoodie with reduced shrinkage and vintage feel.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    productUrl: "https://www.champion.com/reverse-weave-pullover-hoodie.html",
    rating: { rate: 4.7, count: 5100 }
  },

  // Women's Clothing
  {
    id: 25,
    title: "Lululemon Align Leggings",
    price: 98.00,
    description: "Buttery-soft yoga leggings with four-way stretch and high rise.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    productUrl: "https://shop.lululemon.com/p/women-pants/Align-Pant-2",
    rating: { rate: 4.8, count: 8900 }
  },
  {
    id: 26,
    title: "Zara Linen Blend Blazer",
    price: 89.90,
    description: "Relaxed fit blazer with notched lapels and front pockets.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
    productUrl: "https://www.zara.com/us/en/linen-blend-blazer-p02010450.html",
    rating: { rate: 4.5, count: 3200 }
  },
  {
    id: 27,
    title: "Reformation Midi Dress",
    price: 218.00,
    description: "Sustainable floral dress with flattering silhouette and eco-friendly fabric.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    productUrl: "https://www.thereformation.com/products/midi-dress",
    rating: { rate: 4.7, count: 1900 }
  },
  {
    id: 28,
    title: "Everlane Cashmere Crew",
    price: 100.00,
    description: "Premium Grade-A cashmere sweater with timeless design.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
    productUrl: "https://www.everlane.com/products/womens-cashmere-crew-sweater",
    rating: { rate: 4.8, count: 2700 }
  },
  {
    id: 29,
    title: "Madewell Perfect Vintage Jean",
    price: 128.00,
    description: "Vintage-inspired high-rise jeans with relaxed fit through hip and thigh.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    productUrl: "https://www.madewell.com/the-perfect-vintage-jean",
    rating: { rate: 4.6, count: 4100 }
  },

  // Watches
  {
    id: 30,
    title: "Apple Watch Series 9",
    price: 399.00,
    description: "Advanced health features, bright always-on display, and powerful S9 chip.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    productUrl: "https://www.apple.com/apple-watch-series-9/",
    rating: { rate: 4.8, count: 6700 }
  },
  {
    id: 31,
    title: "Samsung Galaxy Watch 6",
    price: 299.99,
    description: "Comprehensive health tracking with sleek design and long battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    productUrl: "https://www.samsung.com/us/watches/galaxy-watch6/",
    rating: { rate: 4.6, count: 3400 }
  },
  {
    id: 32,
    title: "Garmin Fenix 7",
    price: 699.99,
    description: "Rugged multisport GPS watch with advanced training features.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500",
    productUrl: "https://www.garmin.com/en-US/p/735611",
    rating: { rate: 4.9, count: 2100 }
  },
  {
    id: 33,
    title: "Casio G-Shock GA-2100",
    price: 99.00,
    description: "Iconic tough watch with carbon core guard structure and analog-digital display.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500",
    productUrl: "https://www.casio.com/us/watches/gshock/product.GA-2100-1A1/",
    rating: { rate: 4.7, count: 5600 }
  },

  // Gaming
  {
    id: 34,
    title: "PlayStation 5",
    price: 499.99,
    description: "Next-gen gaming console with ultra-high speed SSD and stunning graphics.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    productUrl: "https://www.playstation.com/en-us/ps5/",
    rating: { rate: 4.9, count: 15000 }
  },
  {
    id: 35,
    title: "Xbox Series X",
    price: 499.99,
    description: "Most powerful Xbox ever with 4K gaming and quick resume feature.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500",
    productUrl: "https://www.xbox.com/en-US/consoles/xbox-series-x",
    rating: { rate: 4.8, count: 12000 }
  },
  {
    id: 36,
    title: "Nintendo Switch OLED",
    price: 349.99,
    description: "Vibrant 7-inch OLED screen with enhanced audio and adjustable stand.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
    productUrl: "https://www.nintendo.com/us/switch/oled-model/",
    rating: { rate: 4.7, count: 9800 }
  },

  // Gaming Accessories
  {
    id: 37,
    title: "Razer DeathAdder V3 Pro",
    price: 149.99,
    description: "Wireless gaming mouse with Focus Pro 30K sensor and 90-hour battery.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    productUrl: "https://www.razer.com/gaming-mice/razer-deathadder-v3-pro",
    rating: { rate: 4.8, count: 3200 }
  },
  {
    id: 38,
    title: "Logitech G Pro X Keyboard",
    price: 149.99,
    description: "Mechanical gaming keyboard with swappable switches and RGB lighting.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
    productUrl: "https://www.logitechg.com/en-us/products/gaming-keyboards/pro-x-gaming-keyboard.html",
    rating: { rate: 4.7, count: 2800 }
  },
  {
    id: 39,
    title: "SteelSeries Arctis Nova Pro",
    price: 349.99,
    description: "Premium gaming headset with Hi-Res audio and active noise cancellation.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500",
    productUrl: "https://steelseries.com/gaming-headsets/arctis-nova-pro",
    rating: { rate: 4.8, count: 1900 }
  },

  // Cameras
  {
    id: 40,
    title: "Sony A7 IV",
    price: 2498.00,
    description: "Full-frame mirrorless camera with 33MP sensor and advanced autofocus.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606980707986-683d8dc3c0c7?w=500",
    productUrl: "https://electronics.sony.com/imaging/interchangeable-lens-cameras/all-interchangeable-lens-cameras/p/ilce7m4-b",
    rating: { rate: 4.9, count: 1200 }
  },
  {
    id: 41,
    title: "Canon EOS R6 Mark II",
    price: 2499.00,
    description: "Professional mirrorless camera with 24.2MP sensor and 40fps burst.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    productUrl: "https://www.usa.canon.com/shop/p/eos-r6-mark-ii",
    rating: { rate: 4.8, count: 980 }
  },
  {
    id: 42,
    title: "Fujifilm X-T5",
    price: 1699.00,
    description: "Retro-styled camera with 40.2MP sensor and film simulation modes.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
    productUrl: "https://fujifilm-x.com/en-us/products/cameras/x-t5/",
    rating: { rate: 4.7, count: 760 }
  },

  // Home Audio
  {
    id: 43,
    title: "Sonos Arc Soundbar",
    price: 899.00,
    description: "Premium smart soundbar with Dolby Atmos and voice control.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500",
    productUrl: "https://www.sonos.com/en-us/shop/arc",
    rating: { rate: 4.8, count: 4200 }
  },
  {
    id: 44,
    title: "HomePod 2nd Generation",
    price: 299.00,
    description: "Smart speaker with immersive audio and seamless Apple integration.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
    productUrl: "https://www.apple.com/homepod-2nd-generation/",
    rating: { rate: 4.6, count: 2100 }
  },

  // Fitness Equipment
  {
    id: 45,
    title: "Peloton Bike+",
    price: 2495.00,
    description: "Premium indoor cycling bike with rotating screen and auto-resistance.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500",
    productUrl: "https://www.onepeloton.com/bikes/bike-plus",
    rating: { rate: 4.7, count: 3400 }
  },
  {
    id: 46,
    title: "Bowflex SelectTech Dumbbells",
    price: 549.00,
    description: "Adjustable dumbbells that replace 15 sets of weights.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
    productUrl: "https://www.bowflex.com/selecttech/552/100131.html",
    rating: { rate: 4.8, count: 5600 }
  },
  {
    id: 47,
    title: "Theragun PRO",
    price: 599.00,
    description: "Professional-grade percussive therapy device for deep muscle treatment.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    productUrl: "https://www.therabody.com/us/en-us/theragun-pro-us.html",
    rating: { rate: 4.7, count: 2800 }
  },

  // Outdoor Gear
  {
    id: 48,
    title: "Yeti Tundra 45 Cooler",
    price: 325.00,
    description: "Legendary durability and ice retention for outdoor adventures.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500",
    productUrl: "https://www.yeti.com/coolers/hard-coolers/tundra/45/10045010000.html",
    rating: { rate: 4.9, count: 6700 }
  },
  {
    id: 49,
    title: "The North Face Borealis Backpack",
    price: 99.00,
    description: "Versatile daypack with FlexVent suspension and multiple pockets.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    productUrl: "https://www.thenorthface.com/en-us/bags-and-gear/backpacks-c209820/borealis-backpack-pNF0A52SX",
    rating: { rate: 4.7, count: 4500 }
  },
  {
    id: 50,
    title: "Hydro Flask 32oz Wide Mouth",
    price: 44.95,
    description: "Insulated water bottle that keeps drinks cold for 24 hours.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    productUrl: "https://www.hydroflask.com/32-oz-wide-mouth",
    rating: { rate: 4.8, count: 8900 }
  },

  // Sunglasses
  {
    id: 51,
    title: "Ray-Ban Aviator Classic",
    price: 163.00,
    description: "Iconic aviator sunglasses with crystal lenses and metal frame.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    productUrl: "https://www.ray-ban.com/usa/sunglasses/RB3025%20UNISEX%20aviator%20classic-gold/805289439899",
    rating: { rate: 4.7, count: 12000 }
  },
  {
    id: 52,
    title: "Oakley Holbrook",
    price: 146.00,
    description: "Timeless design fused with modern Oakley technology.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    productUrl: "https://www.oakley.com/en-us/product/W0OO9102",
    rating: { rate: 4.6, count: 8700 }
  },

  // Bags & Luggage
  {
    id: 53,
    title: "Away Bigger Carry-On",
    price: 295.00,
    description: "Durable polycarbonate suitcase with TSA-approved lock and USB port.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=500",
    productUrl: "https://www.awaytravel.com/suitcases/bigger-carry-on",
    rating: { rate: 4.8, count: 5400 }
  },
  {
    id: 54,
    title: "Herschel Little America Backpack",
    price: 109.99,
    description: "Mountaineering-inspired backpack with laptop sleeve and drawstring closure.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    productUrl: "https://herschel.com/shop/backpacks/little-america-backpack",
    rating: { rate: 4.7, count: 6200 }
  },

  // Kitchen Appliances
  {
    id: 55,
    title: "KitchenAid Artisan Stand Mixer",
    price: 449.99,
    description: "Iconic stand mixer with 5-quart bowl and 10 speeds.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
    productUrl: "https://www.kitchenaid.com/countertop-appliances/stand-mixers/tilt-head-stand-mixers/p.artisan-series-5-quart-tilt-head-stand-mixer.ksm150ps.html",
    rating: { rate: 4.9, count: 18000 }
  },
  {
    id: 56,
    title: "Nespresso Vertuo Plus",
    price: 179.00,
    description: "Coffee and espresso maker with Centrifusion technology.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    productUrl: "https://www.nespresso.com/us/en/order/machines/vertuo/vertuo-plus-coffee-machine",
    rating: { rate: 4.6, count: 9800 }
  },
  {
    id: 57,
    title: "Vitamix 5200 Blender",
    price: 449.95,
    description: "Professional-grade blender with variable speed control.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
    productUrl: "https://www.vitamix.com/us/en_us/shop/5200",
    rating: { rate: 4.8, count: 12000 }
  },
  {
    id: 58,
    title: "Instant Pot Duo 7-in-1",
    price: 89.99,
    description: "Multi-cooker that pressure cooks, slow cooks, and more.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500",
    productUrl: "https://www.instanthome.com/product/instant-pot/duo-7-in-1",
    rating: { rate: 4.7, count: 45000 }
  },

  // Beauty & Personal Care
  {
    id: 59,
    title: "Dyson Supersonic Hair Dryer",
    price: 429.99,
    description: "Fast drying with intelligent heat control to protect hair.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500",
    productUrl: "https://www.dyson.com/hair-care/dyson-supersonic-hair-dryer",
    rating: { rate: 4.8, count: 8900 }
  },
  {
    id: 60,
    title: "Philips Sonicare DiamondClean",
    price: 199.95,
    description: "Electric toothbrush with 5 modes and premium charging glass.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500",
    productUrl: "https://www.philips.com/c-p/HX9911_09/sonicare-diamondclean-smart-9300",
    rating: { rate: 4.7, count: 6700 }
  },

  // Jewelry
  {
    id: 61,
    title: "Tiffany & Co. Return to Tiffany Heart Tag Bracelet",
    price: 325.00,
    description: "Sterling silver bracelet with iconic heart tag charm.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    productUrl: "https://www.tiffany.com/jewelry/bracelets/return-to-tiffany-heart-tag-bracelet-GRP00012/",
    rating: { rate: 4.9, count: 2100 }
  },
  {
    id: 62,
    title: "Pandora Moments Charm Bracelet",
    price: 65.00,
    description: "Classic snake chain bracelet for collecting meaningful charms.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
    productUrl: "https://us.pandora.net/en/jewelry/bracelets/pandora-moments-snake-chain-bracelet/590702HV.html",
    rating: { rate: 4.7, count: 8900 }
  },

  // Books
  {
    id: 63,
    title: "Atomic Habits by James Clear",
    price: 16.99,
    description: "Proven way to build good habits and break bad ones.",
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    productUrl: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299",
    rating: { rate: 4.9, count: 125000 }
  },
  {
    id: 64,
    title: "The Psychology of Money",
    price: 14.99,
    description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
    category: "books",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500",
    productUrl: "https://www.amazon.com/Psychology-Money-Timeless-lessons-happiness/dp/0857197681",
    rating: { rate: 4.8, count: 89000 }
  },

  // Pet Supplies
  {
    id: 65,
    title: "Furbo 360° Dog Camera",
    price: 210.00,
    description: "Smart pet camera with treat tossing and 360° rotating view.",
    category: "pets",
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=500",
    productUrl: "https://shopus.furbo.com/products/furbo-360-dog-camera",
    rating: { rate: 4.5, count: 4200 }
  },
  {
    id: 66,
    title: "KONG Classic Dog Toy",
    price: 12.99,
    description: "Ultra-durable rubber toy for stuffing with treats.",
    category: "pets",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
    productUrl: "https://www.kongcompany.com/products/classic",
    rating: { rate: 4.8, count: 34000 }
  },

  // Home Decor
  {
    id: 67,
    title: "Philips Hue Smart Bulb Starter Kit",
    price: 199.99,
    description: "Color-changing smart bulbs with voice control and app integration.",
    category: "home decor",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    productUrl: "https://www.philips-hue.com/en-us/p/hue-white-and-color-ambiance-starter-kit-e26/046677548483",
    rating: { rate: 4.7, count: 12000 }
  },
  {
    id: 68,
    title: "Nest Learning Thermostat",
    price: 249.00,
    description: "Smart thermostat that learns your schedule and saves energy.",
    category: "home decor",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=500",
    productUrl: "https://store.google.com/product/nest_learning_thermostat_3rd_gen",
    rating: { rate: 4.6, count: 8900 }
  },

  // Toys & Games
  {
    id: 69,
    title: "LEGO Star Wars Millennium Falcon",
    price: 849.99,
    description: "Ultimate collector's edition with 7,541 pieces.",
    category: "toys",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500",
    productUrl: "https://www.lego.com/en-us/product/millennium-falcon-75192",
    rating: { rate: 4.9, count: 5600 }
  },
  {
    id: 70,
    title: "Nintendo Switch Pro Controller",
    price: 69.99,
    description: "Premium controller with motion controls and HD rumble.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500",
    productUrl: "https://www.nintendo.com/us/store/products/pro-controller/",
    rating: { rate: 4.8, count: 23000 }
  },

  // Sports Equipment
  {
    id: 71,
    title: "Wilson Evolution Basketball",
    price: 64.99,
    description: "Official size indoor basketball with microfiber composite cover.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
    productUrl: "https://www.wilson.com/en-us/product/evolution-indoor-game-basketball",
    rating: { rate: 4.9, count: 8900 }
  },
  {
    id: 72,
    title: "TaylorMade Stealth 2 Driver",
    price: 599.99,
    description: "Advanced golf driver with carbon face technology.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500",
    productUrl: "https://www.taylormadegolf.com/Stealth-2-Driver/DW-TA238.html",
    rating: { rate: 4.7, count: 1200 }
  },

  // Automotive
  {
    id: 73,
    title: "NOCO Boost Plus GB40 Jump Starter",
    price: 99.95,
    description: "Portable lithium jump starter for 12V batteries.",
    category: "automotive",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
    productUrl: "https://no.co/gb40",
    rating: { rate: 4.8, count: 45000 }
  },
  {
    id: 74,
    title: "Garmin DriveSmart 65 GPS",
    price: 249.99,
    description: "6.95-inch GPS navigator with voice-activated navigation.",
    category: "automotive",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
    productUrl: "https://www.garmin.com/en-US/p/643230",
    rating: { rate: 4.6, count: 3400 }
  },

  // Office Supplies
  {
    id: 75,
    title: "Herman Miller Aeron Chair",
    price: 1395.00,
    description: "Iconic ergonomic office chair with PostureFit support.",
    category: "office",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500",
    productUrl: "https://www.hermanmiller.com/products/seating/office-chairs/aeron-chairs/",
    rating: { rate: 4.9, count: 2100 }
  },
  {
    id: 76,
    title: "LG UltraWide 34-inch Monitor",
    price: 499.99,
    description: "34-inch curved monitor with 21:9 aspect ratio and HDR10.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    productUrl: "https://www.lg.com/us/monitors/lg-34wn80c-b-ultrawide-monitor",
    rating: { rate: 4.7, count: 5600 }
  },

  // Musical Instruments
  {
    id: 77,
    title: "Yamaha P-125 Digital Piano",
    price: 649.99,
    description: "88-key digital piano with authentic piano sound and touch.",
    category: "musical instruments",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500",
    productUrl: "https://usa.yamaha.com/products/musical_instruments/pianos/p_series/p-125/index.html",
    rating: { rate: 4.8, count: 3400 }
  },
  {
    id: 78,
    title: "Fender Player Stratocaster",
    price: 849.99,
    description: "Classic electric guitar with three single-coil pickups.",
    category: "musical instruments",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    productUrl: "https://www.fender.com/en-US/electric-guitars/stratocaster/player-stratocaster/",
    rating: { rate: 4.9, count: 2800 }
  },

  // Travel Accessories
  {
    id: 79,
    title: "Bose QuietComfort 45",
    price: 329.00,
    description: "Wireless noise cancelling headphones with 24-hour battery.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500",
    productUrl: "https://www.bose.com/p/headphones/bose-quietcomfort-45-headphones/QC45.html",
    rating: { rate: 4.7, count: 12000 }
  },
  {
    id: 80,
    title: "Anker PowerCore 20000mAh",
    price: 49.99,
    description: "High-capacity portable charger with dual USB ports.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    productUrl: "https://www.anker.com/products/a1271",
    rating: { rate: 4.8, count: 34000 }
  },

  // Smart Home
  {
    id: 81,
    title: "Ring Video Doorbell Pro 2",
    price: 249.99,
    description: "Smart doorbell with 1536p HD video and 3D motion detection.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500",
    productUrl: "https://ring.com/products/video-doorbell-pro-2",
    rating: { rate: 4.6, count: 8900 }
  },
  {
    id: 82,
    title: "Amazon Echo Dot 5th Gen",
    price: 49.99,
    description: "Smart speaker with Alexa and improved audio quality.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    productUrl: "https://www.amazon.com/dp/B09B8V1LZ3",
    rating: { rate: 4.7, count: 56000 }
  },

  // Cookware
  {
    id: 83,
    title: "Le Creuset Dutch Oven 5.5qt",
    price: 360.00,
    description: "Enameled cast iron Dutch oven for superior heat distribution.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f8?w=500",
    productUrl: "https://www.lecreuset.com/round-dutch-oven/LS2501.html",
    rating: { rate: 4.9, count: 12000 }
  },
  {
    id: 84,
    title: "All-Clad D3 Stainless Steel 10-Piece Set",
    price: 799.95,
    description: "Professional-grade cookware set with tri-ply construction.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500",
    productUrl: "https://www.all-clad.com/d3-stainless-10-piece-cookware-set.html",
    rating: { rate: 4.8, count: 5600 }
  },

  // Bedding
  {
    id: 85,
    title: "Brooklinen Luxe Sheet Set",
    price: 149.00,
    description: "Premium 480 thread count sateen sheets in various colors.",
    category: "home decor",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
    productUrl: "https://www.brooklinen.com/products/luxe-core-sheet-set",
    rating: { rate: 4.7, count: 8900 }
  },
  {
    id: 86,
    title: "Casper Original Pillow",
    price: 89.00,
    description: "Pillow-in-pillow design for perfect support and comfort.",
    category: "home decor",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
    productUrl: "https://casper.com/pillows/original-pillow/",
    rating: { rate: 4.6, count: 12000 }
  },

  // Outdoor Furniture
  {
    id: 87,
    title: "Weber Genesis II E-335 Gas Grill",
    price: 999.00,
    description: "Premium 3-burner gas grill with side burner and sear station.",
    category: "outdoor",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500",
    productUrl: "https://www.weber.com/US/en/grills/gas-grills/genesis-ii/genesis-ii-e-335-gas-grill/61016001.html",
    rating: { rate: 4.8, count: 3400 }
  },

  // Cycling
  {
    id: 88,
    title: "Specialized Sirrus X 4.0 Bike",
    price: 1200.00,
    description: "Versatile fitness bike with hydraulic disc brakes.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=500",
    productUrl: "https://www.specialized.com/us/en/sirrus-x-4-0/p/199901",
    rating: { rate: 4.7, count: 890 }
  },

  // Water Bottles
  {
    id: 89,
    title: "YETI Rambler 26oz",
    price: 39.99,
    description: "Vacuum insulated bottle with TripleHaul cap.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    productUrl: "https://www.yeti.com/drinkware/bottles/26-oz/21071500017.html",
    rating: { rate: 4.9, count: 23000 }
  },

  // Yoga & Fitness
  {
    id: 90,
    title: "Manduka PRO Yoga Mat",
    price: 120.00,
    description: "Professional-grade yoga mat with lifetime guarantee.",
    category: "sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    productUrl: "https://www.manduka.com/products/manduka-pro-yoga-mat",
    rating: { rate: 4.8, count: 5600 }
  },

  // Running Shoes
  {
    id: 91,
    title: "Brooks Ghost 15",
    price: 140.00,
    description: "Neutral running shoe with smooth transitions and soft cushioning.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    productUrl: "https://www.brooksrunning.com/en_us/ghost-15-mens-road-running-shoe/110381.html",
    rating: { rate: 4.8, count: 7800 }
  },
  {
    id: 92,
    title: "Hoka Clifton 9",
    price: 145.00,
    description: "Lightweight running shoe with maximum cushioning.",
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
    productUrl: "https://www.hoka.com/en/us/mens-road/clifton-9/1127895.html",
    rating: { rate: 4.9, count: 6200 }
  },

  // Skincare
  {
    id: 93,
    title: "CeraVe Moisturizing Cream",
    price: 19.99,
    description: "Daily face and body moisturizer with hyaluronic acid and ceramides.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500",
    productUrl: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream",
    rating: { rate: 4.7, count: 45000 }
  },
  {
    id: 94,
    title: "The Ordinary Niacinamide 10% + Zinc 1%",
    price: 5.90,
    description: "High-strength vitamin and mineral serum for blemish-prone skin.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
    productUrl: "https://theordinary.com/en-us/niacinamide-10-zinc-1-serum-100412.html",
    rating: { rate: 4.6, count: 67000 }
  },

  // Fragrance
  {
    id: 95,
    title: "Dior Sauvage Eau de Toilette",
    price: 135.00,
    description: "Fresh and woody fragrance with Calabrian bergamot.",
    category: "beauty",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
    productUrl: "https://www.dior.com/en_us/beauty/products/sauvage-eau-de-toilette-Y0685219.html",
    rating: { rate: 4.8, count: 12000 }
  },

  // Coffee
  {
    id: 96,
    title: "Breville Barista Express",
    price: 699.95,
    description: "All-in-one espresso machine with built-in grinder.",
    category: "kitchen",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    productUrl: "https://www.breville.com/us/en/products/espresso/bes870.html",
    rating: { rate: 4.7, count: 8900 }
  },

  // Tablets
  {
    id: 97,
    title: "iPad Pro 12.9-inch M2",
    price: 1099.00,
    description: "Powerful tablet with M2 chip and Liquid Retina XDR display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    productUrl: "https://www.apple.com/ipad-pro/",
    rating: { rate: 4.9, count: 5600 }
  },
  {
    id: 98,
    title: "Samsung Galaxy Tab S9 Ultra",
    price: 1199.99,
    description: "Premium Android tablet with 14.6-inch AMOLED display.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
    productUrl: "https://www.samsung.com/us/tablets/galaxy-tab-s9/",
    rating: { rate: 4.7, count: 2100 }
  },

  // E-Readers
  {
    id: 99,
    title: "Kindle Paperwhite Signature Edition",
    price: 189.99,
    description: "Premium e-reader with auto-adjusting light and wireless charging.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500",
    productUrl: "https://www.amazon.com/dp/B08N3J8GTX",
    rating: { rate: 4.8, count: 23000 }
  },

  // Drones
  {
    id: 100,
    title: "DJI Mini 3 Pro",
    price: 759.00,
    description: "Lightweight drone with 4K HDR video and 34-minute flight time.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
    productUrl: "https://www.dji.com/mini-3-pro",
    rating: { rate: 4.8, count: 3400 }
  }
];
