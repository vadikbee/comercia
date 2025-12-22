import type { ProductType } from "../model/ProductType";

// Наши данные вынесем в отдельную переменную, чтобы искать по ним
const DEMO_PRODUCTS: ProductType[] = [
    {
        id: "1",
        name: "TV Hisense 55E7Q PRO",
        price: 1500,
        rating: 4.8,
        imageUrl: "/img/tv-hisense.png",
        stock: 5,
        slug: "tv-hisense-55",
        discount: 150
    },
    {
        id: "2",
        name: "Samsung Galaxy A17",
        price: 70,
        rating: 4.9,
        imageUrl: "/img/samsung-a17.png",
        stock: 10,
        slug: "samsung-a17"
    },
    {
        id: "3",
        name: "ASUS E1504FA-BQ1346",
        price: 1000,
        rating: 4.9,
        imageUrl: "/img/asus-laptop.png",
        stock: 2,
        slug: "asus-laptop"
    },
    {
        id: "4",
        name: "Baseus Bass BP1 Pro",
        price: 20,
        rating: 4.5,
        imageUrl: "/img/baseus-headphones.png",
        stock: 100,
        slug: "baseus-bp1"
    }
];

export default class ProductDao {
    
    // Получить все хиты
    static getBestsellers(): Promise<ProductType[]> {
        return Promise.resolve(DEMO_PRODUCTS);
    }

    // НОВЫЙ МЕТОД: Получить все товары (для каталога)
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
                const product = DEMO_PRODUCTS.find(p => p.slug === slug || p.id === slug);
                resolve(product);
            }, 300);
        });
    }
}