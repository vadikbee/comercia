import type { ProductType } from "../model/ProductType";

const DEMO_PRODUCTS: ProductType[] = [
  // --- ТЕЛЕВИЗОРЫ (TVs) ---
  {
    id: "tv-1",
    name: "TV Hisense 55E7Q PRO",
    price: 650,
    rating: 4.8,
    // Добавил /products/ в путь
    imageUrl: "/img/products/TV Hisense 55E7Q RU.png", 
    stock: 5,
    slug: "tv-hisense-55",
    discount: 50
  },
  {
    id: "tv-2",
    name: "TV Samsung UE50DU7100UX",
    price: 480,
    rating: 4.9,
    imageUrl: "/img/products/TV Samsung UE50DU7100UX.png",
    stock: 12,
    slug: "tv-samsung-ue50"
  },
  {
    id: "tv-3",
    name: "Haier 43 Smart TV S2",
    price: 320,
    rating: 4.5,
    imageUrl: "/img/products/Haier 43 Smart TV S2.png",
    stock: 8,
    slug: "tv-haier-43"
  },
  {
    id: "tv-4",
    name: "TV TCL 75C8K Mini-LED",
    price: 1100,
    rating: 5.0,
    imageUrl: "/img/products/TV TCL 75C8K.png",
    stock: 3,
    slug: "tv-tcl-75",
    discount: 100
  },
  {
    id: "tv-5",
    name: "TV Philips 55PUS8057/60",
    price: 550,
    rating: 4.6,
    imageUrl: "/img/products/TV Philips 55PUS805760.png",
    stock: 6,
    slug: "tv-philips-55"
  },
  {
    id: "tv-6",
    name: "TV Akai TA24BH502 White",
    price: 120,
    rating: 4.2,
    imageUrl: "/img/products/TV Akai TA24BH502 White.png",
    stock: 20,
    slug: "tv-akai-24"
  },

  // --- СМАРТФОНЫ (Smartphones) ---
  {
    id: "ph-1",
    name: "Apple iPhone 17 Pro Max",
    price: 1200,
    rating: 5.0,
    imageUrl: "/img/products/Apple iPhone 17 Pro Max.png",
    stock: 15,
    slug: "iphone-17-pro-max",
    discount: 0
  },
  {
    id: "ph-2",
    name: "Samsung Galaxy A17 LTE",
    price: 180,
    rating: 4.7,
    imageUrl: "/img/products/Samsung Galaxy A17 LTE 8.png",
    stock: 25,
    slug: "samsung-a17"
  },
  {
    id: "ph-3",
    name: "HUAWEI Pura 80 12/256GB",
    price: 750,
    rating: 4.8,
    imageUrl: "/img/products/HUAWEI Pura 80 12256GB.png",
    stock: 10,
    slug: "huawei-pura-80"
  },
  {
    id: "ph-4",
    name: "HONOR 400 Lite 8/256GB",
    price: 320,
    rating: 4.6,
    imageUrl: "/img/products/HONOR 400 Lite 8256GB.png",
    stock: 18,
    slug: "honor-400-lite"
  },
  {
    id: "ph-5",
    name: "Xiaomi REDMI A5 3/64GB",
    price: 90,
    rating: 4.4,
    imageUrl: "/img/products/Xiaomi REDMI A5 364GB.png",
    stock: 50,
    slug: "xiaomi-redmi-a5"
  },
  {
    id: "ph-6",
    name: "Apple iPhone 15 128GB",
    price: 800,
    rating: 4.9,
    imageUrl: "/img/products/Apple iPhone 15 128GB.png",
    stock: 5,
    slug: "iphone-15"
  },

  // --- НОУТБУКИ (Laptops) ---
  {
    id: "lap-1",
    name: "Apple MacBook Air 13 M2",
    price: 1100,
    rating: 4.9,
    imageUrl: "/img/products/Apple MacBook Air 13 M2.png",
    stock: 7,
    slug: "macbook-air-m2"
  },
  {
    id: "lap-2",
    name: "ASUS TUF Gaming F15",
    price: 950,
    rating: 4.7,
    imageUrl: "/img/products/ASUS TUF Gaming F15.png",
    stock: 4,
    slug: "asus-tuf-f15",
    discount: 50
  },
  {
    id: "lap-3",
    name: "MSI Katana 17 Core i5",
    price: 1050,
    rating: 4.8,
    imageUrl: "/img/products/MSI Katana 1717.3Core i5.png",
    stock: 3,
    slug: "msi-katana-17"
  },
  {
    id: "lap-4",
    name: "HONOR MagicBook Pro 16",
    price: 1150,
    rating: 4.8,
    imageUrl: "/img/products/HONOR MagicBook Pro 16.png",
    stock: 6,
    slug: "honor-magicbook-pro"
  },
  {
    id: "lap-5",
    name: "Lenovo IdeaPad 1 15IJL7",
    price: 350,
    rating: 4.3,
    imageUrl: "/img/products/Lenovo IdeaPad 1 15IJL7.png",
    stock: 15,
    slug: "lenovo-ideapad-1"
  },
  {
    id: "lap-6",
    name: "Acer Aspire Go 15.6 Core i5",
    price: 450,
    rating: 4.5,
    imageUrl: "/img/products/Acer Aspire Go 15.6Core i5.png",
    stock: 8,
    slug: "acer-aspire-go"
  },

  // --- ПЛАНШЕТЫ (Tablets) ---
  {
    id: "tab-1",
    name: "Apple iPad Air 11 128GB",
    price: 600,
    rating: 4.9,
    imageUrl: "/img/products/Apple IPad Air 11 128GB.png",
    stock: 10,
    slug: "ipad-air-11"
  },
  {
    id: "tab-2",
    name: "Samsung Galaxy Tab A9",
    price: 170,
    rating: 4.6,
    imageUrl: "/img/products/Samsung Galaxy Tab A9.png",
    stock: 12,
    slug: "samsung-tab-a9"
  },
  {
    id: "tab-3",
    name: "HONOR Pad 9 8/128GB",
    price: 250,
    rating: 4.7,
    imageUrl: "/img/products/HONOR Pad 9 8128GB.png",
    stock: 8,
    slug: "honor-pad-9"
  },
  {
    id: "tab-4",
    name: "HUAWEI MatePad 11.5S",
    price: 400,
    rating: 4.8,
    imageUrl: "/img/products/HUAWEI MatePad 11.5S.png",
    stock: 5,
    slug: "huawei-matepad-11-5s"
  },
  {
    id: "tab-5",
    name: "Xiaomi Redmi Pad SE",
    price: 190,
    rating: 4.7,
    imageUrl: "/img/products/Xiaomi Redmi Pad SE.png",
    stock: 20,
    slug: "xiaomi-redmi-pad-se"
  },

  // --- НАУШНИКИ (Headphones) ---
  {
    id: "head-1",
    name: "Apple AirPods Max Midnight",
    price: 549,
    rating: 4.9,
    imageUrl: "/img/products/Apple AirPods Max Midnight.png",
    stock: 5,
    slug: "airpods-max-midnight"
  },
  {
    id: "head-2",
    name: "Marshall Major IV Black",
    price: 150,
    rating: 4.8,
    imageUrl: "/img/products/Marshall Major IV (F) Black.png",
    stock: 15,
    slug: "marshall-major-iv"
  },
  {
    id: "head-3",
    name: "JBL Tune 520BT White",
    price: 50,
    rating: 4.6,
    imageUrl: "/img/products/JBL Tune 520BT White.png",
    stock: 30,
    slug: "jbl-tune-520bt"
  },
  {
    id: "head-4",
    name: "Samsung Galaxy Buds3",
    price: 130,
    rating: 4.7,
    imageUrl: "/img/products/Samsung Galaxy Buds3.png",
    stock: 10,
    slug: "samsung-buds-3"
  },
  {
    id: "head-5",
    name: "HUAWEI FreeBuds 5",
    price: 120,
    rating: 4.5,
    imageUrl: "/img/products/HUAWEI FreeBuds 5.png",
    stock: 12,
    slug: "huawei-freebuds-5"
  },
  {
    id: "head-6",
    name: "Baseus Bass BP1 Pro",
    price: 35,
    rating: 4.4,
    imageUrl: "/img/products/Baseus Bass BP1 Pro.png",
    stock: 50,
    slug: "baseus-bass-bp1"
  }
];

export default class ProductDao {
  
  // Получить хиты продаж (для главной)
  static getBestsellers(): Promise<ProductType[]> {
    // Берем по одному популярному товару из каждой категории
    const bestsellers = [
      DEMO_PRODUCTS[0], // TV Hisense
      DEMO_PRODUCTS[6], // iPhone 17
      DEMO_PRODUCTS[12], // Macbook Air
      DEMO_PRODUCTS[23]  // AirPods Max
    ];
    return Promise.resolve(bestsellers);
  }

  // Получить все товары (для каталога)
  static getAllProducts(): Promise<ProductType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DEMO_PRODUCTS);
      }, 300); // Имитация задержки сети
    });
  }

  // Получить ОДИН товар по slug (для страницы товара)
  static getProduct(slug: string): Promise<ProductType | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Ищем по slug или по id
        const product = DEMO_PRODUCTS.find(p => p.slug === slug || p.id === slug);
        resolve(product);
      }, 300);
    });
  }
}