import type { HomePageSection } from "../../../features/section_card/types/section";
import type { SectionType } from "../model/SectionType";

export default class SectionDao {
    static cacheSections: Array<HomePageSection> | undefined;

    static getSections() {
        return new Promise<Array<HomePageSection>>((resolve) => {
            if (typeof SectionDao.cacheSections != 'undefined') {
                resolve(SectionDao.cacheSections);
            }
            else setTimeout(() => {
                // ВАЖНО: title здесь совпадают с фильтрами в Catalog.tsx
                SectionDao.cacheSections = [
                    {
                        "imageUrl": "/img/big-2025-iphonefull.png.webp",
                        "title": "Smartphones",
                        "slug": "smartphones"
                    },
                    {
                        "imageUrl": "/img/wide-noutfull.png.webp",
                        "title": "Laptops",
                        "slug": "laptops"
                    },
                    {
                        "imageUrl": "/img/ipad-2022-hero-silver-wifi-selec-1397x1397.jpg.webp", // Добавил пример картинки для планшетов
                        "title": "Tablets",
                        "slug": "tablets"
                    },
                    {
                        "imageUrl": "/img/image24full.png.webp",
                        "title": "TVs",
                        "slug": "tvs"
                    },
                    {
                        "imageUrl": "/img/headphonesfull.png.webp",
                        "title": "Headphones",
                        "slug": "headphones"
                    },
                    // Остальные категории можно оставить или скрыть, 
                    // если для них нет фильтра в Catalog.tsx
                    {
                        "imageUrl": "/img/big-ps5full.png.webp",
                        "title": "Consoles",
                        "slug": "consoles"
                    },
                    {
                        "imageUrl": "/img/wide-photoofull.png.webp",
                        "title": "Cameras",
                        "slug": "cameras"
                    }
                ];
                resolve(SectionDao.cacheSections);
            }, 300);
        });
    }

    static getSection(slug: string) {
        return new Promise<SectionType>((resolve, reject) => {
            setTimeout(() => {
                switch (slug) {
                    case 'apple': resolve({
                        products: [
                            {
                                id: "1", name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
                                slug: "apple-iphone-17-pro-max-256gb-orange",
                                price: 73499, discount: 6050, rating: 2,
                                imageUrl: "/img/CosmicOrange-1397x1397.png.webp"
                            },
                            {
                                id: "2", name: "Наушники Apple AirPods Pro 3 (MFHP4) (2025)",
                                slug: "navushnyky-apple-airpods-pro-3",
                                price: 11899, discount: 2200, rating: 4,
                                imageUrl: "/img/vbfbg-1397x1397.png.webp"
                            },
                            {
                                id: "814897", name: "Apple iPhone 15 256GB (Pink)",
                                slug: "apple-iphone-15-256gb--pink-",
                                price: 37999, discount: 2800, rating: 3,
                                imageUrl: "/img/pink (1)-1397x1397.jpeg.webp",
                                stock: 0
                            },
                            {
                                id: "842447", name: "MacBook Air 13 Retina, Midnight, 256GB, 10 CPU / 8 GPU, 16GB RAM with Apple M4 (2025) (MW123)",
                                slug: "macbook-air-13-retina-midnight-256gb-8-cpu--10-gpu-16gb-ram-with-apple-m4-2025-mw123",
                                price: 41999, discount: 8000, rating: 1,
                                imageUrl: "/img/midnight-1-1397x1397.png.webp",
                                stock: 10
                            },
                            {
                                id: "855417", name: "Apple iPhone 17 Pro Max 512GB (Deep Blue)",
                                slug: "apple-iphone-17-pro-max-512gb-dark-blue",
                                price: 83699, discount: 13050, rating: 3,
                                imageUrl: "/img/deepBlue-(4)-1397x1397.png.webp",
                                stock: 3
                            },
                            {
                                id: "842247", name: "Apple iPad 11 128GB, Wi-Fi (Silver) (2025) (MD3Y4)",
                                slug: "apple-ipad-11-128gb-wi-fi-silver-2025-md3y4",
                                price: 17199, discount: 1300, rating: 5,
                                imageUrl: "/img/ipad-2022-hero-silver-wifi-selec-1397x1397.jpg.webp",
                                stock: 10
                            },
                        ]
                    }); break;
                    default: reject('"Slug not found"');
                }
            }, 300);
        });
    }
}