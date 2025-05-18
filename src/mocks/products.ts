import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Headphones",
    slug: "premium-headphones",
    price: 129.99,
    discountPrice: 99.99,
    images: ["/placeholder.jpg"],
    category: "electronics",
    description: "Premium noise-cancelling headphones with exceptional sound quality and comfort for extended use.",
    specifications: {
      "Brand": "AudioPro",
      "Type": "Over-ear",
      "Battery Life": "30 hours",
      "Connection": "Bluetooth 5.0",
      "Weight": "250g"
    },
    attributes: {
      "Color": ["Black", "White", "Blue"],
      "Features": ["Noise Cancellation", "Built-in Microphone"]
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: "2",
    name: "Leather Wallet",
    slug: "leather-wallet",
    price: 49.99,
    images: ["/placeholder.jpg"],
    category: "accessories",
    description: "Genuine leather wallet with multiple card slots and spacious compartments. Slim profile fits comfortably in your pocket.",
    specifications: {
      "Material": "Genuine Leather",
      "Dimensions": "4.5 x 3.5 inches",
      "Card Slots": "8",
      "Bill Compartments": "2"
    },
    attributes: {
      "Color": ["Brown", "Black", "Tan"]
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 85
  },
  {
    id: "3",
    name: "Smart Watch",
    slug: "smart-watch",
    price: 199.99,
    discountPrice: 179.99,
    images: ["/placeholder.jpg"],
    category: "electronics",
    description: "Stay connected with this advanced smartwatch. Track your fitness, receive notifications, and more with this sleek wearable device.",
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery Life": "Up to 7 days",
      "Water Resistance": "5 ATM",
      "Sensors": "Heart rate, accelerometer, gyroscope"
    },
    attributes: {
      "Color": ["Black", "Silver", "Rose Gold"],
      "Band Material": ["Silicone", "Leather", "Metal"]
    },
    inStock: true,
    rating: 4.2,
    reviewCount: 142
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    slug: "cotton-tshirt",
    price: 24.99,
    images: ["/placeholder.jpg"],
    category: "clothing",
    description: "Soft and comfortable 100% cotton t-shirt perfect for casual wear. Breathable fabric keeps you cool throughout the day.",
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Regular",
      "Neckline": "Crew neck",
      "Care": "Machine washable"
    },
    attributes: {
      "Color": ["White", "Black", "Gray", "Navy"],
      "Size": ["S", "M", "L", "XL", "XXL"]
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 219
  },
  {
    id: "5",
    name: "Coffee Maker",
    slug: "coffee-maker",
    price: 89.99,
    discountPrice: 69.99,
    images: ["/placeholder.jpg"],
    category: "home-garden",
    description: "Brew delicious coffee at home with this easy-to-use coffee maker. Features programmable timer and auto shut-off for convenience.",
    specifications: {
      "Capacity": "12 cups",
      "Functions": "Programmable, Auto shut-off",
      "Filter Type": "Reusable mesh",
      "Warranty": "2 years"
    },
    attributes: {
      "Color": ["Black", "Stainless Steel", "White"]
    },
    inStock: true,
    rating: 4.3,
    reviewCount: 76
  },
  {
    id: "6",
    name: "Wireless Mouse",
    slug: "wireless-mouse",
    price: 34.99,
    images: ["/placeholder.jpg"],
    category: "electronics",
    description: "Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work or gaming.",
    specifications: {
      "DPI": "Up to 3200",
      "Connectivity": "2.4GHz wireless",
      "Battery Life": "12 months",
      "Compatible With": "Windows, Mac, Linux"
    },
    attributes: {
      "Color": ["Black", "Gray", "Blue"]
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 103
  },
  {
    id: "7",
    name: "Yoga Mat",
    slug: "yoga-mat",
    price: 29.99,
    images: ["/placeholder.jpg"],
    category: "fitness",
    description: "Non-slip yoga mat with excellent cushioning and support. Ideal for yoga, pilates, and general fitness exercises.",
    specifications: {
      "Material": "TPE Foam",
      "Thickness": "6mm",
      "Dimensions": "72\" x 24\"",
      "Weight": "2.5 lbs"
    },
    attributes: {
      "Color": ["Purple", "Blue", "Black", "Green"]
    },
    inStock: true,
    rating: 4.4,
    reviewCount: 58
  },
  {
    id: "8",
    name: "Sunglasses",
    slug: "sunglasses",
    price: 79.99,
    discountPrice: 59.99,
    images: ["/placeholder.jpg"],
    category: "accessories",
    description: "Stylish sunglasses with UV protection. Lightweight frame provides comfort for all-day wear.",
    specifications: {
      "Frame Material": "Acetate",
      "Lens Material": "Polycarbonate",
      "UV Protection": "100%",
      "Weight": "25g"
    },
    attributes: {
      "Color": ["Black", "Tortoise", "Clear"],
      "Lens Color": ["Brown", "Black", "Gray", "Green"]
    },
    inStock: true,
    rating: 4.1,
    reviewCount: 47
  },
  {
    id: "9",
    name: "Desk Lamp",
    slug: "desk-lamp",
    price: 39.99,
    images: ["/placeholder.jpg"],
    category: "home-garden",
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures. Energy-efficient and perfect for reading or working.",
    specifications: {
      "Light Source": "LED",
      "Power": "10W",
      "Color Temperature": "3000K-6000K",
      "Brightness Levels": "5"
    },
    attributes: {
      "Color": ["White", "Black", "Silver"]
    },
    inStock: true,
    rating: 4.5,
    reviewCount: 63
  },
  {
    id: "10",
    name: "Water Bottle",
    slug: "water-bottle",
    price: 19.99,
    images: ["/placeholder.jpg"],
    category: "fitness",
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design perfect for travel and sports.",
    specifications: {
      "Capacity": "24oz",
      "Material": "Stainless Steel",
      "Insulation": "Double-wall vacuum",
      "Mouth Size": "Wide"
    },
    attributes: {
      "Color": ["Black", "White", "Blue", "Red", "Green"]
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 92
  },
  {
    id: "11",
    name: "Backpack",
    slug: "backpack",
    price: 59.99,
    discountPrice: 49.99,
    images: ["/placeholder.jpg"],
    category: "accessories",
    description: "Versatile backpack with multiple compartments, including padded laptop sleeve. Durable and water-resistant for daily use or travel.",
    specifications: {
      "Material": "Polyester",
      "Capacity": "25L",
      "Laptop Compartment": "Up to 15\"",
      "Dimensions": "18\" x 12\" x 8\""
    },
    attributes: {
      "Color": ["Black", "Navy", "Gray", "Green"]
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 78
  },
  {
    id: "12",
    name: "Portable Speaker",
    slug: "portable-speaker",
    price: 79.99,
    images: ["/placeholder.jpg"],
    category: "electronics",
    description: "Bluetooth portable speaker with powerful sound and deep bass. Waterproof design perfect for outdoor adventures.",
    specifications: {
      "Connectivity": "Bluetooth 5.0",
      "Battery Life": "12 hours",
      "Water Resistance": "IPX7",
      "Power": "20W"
    },
    attributes: {
      "Color": ["Black", "Blue", "Red", "Gray"]
    },
    inStock: true,
    rating: 4.3,
    reviewCount: 114
  }
];