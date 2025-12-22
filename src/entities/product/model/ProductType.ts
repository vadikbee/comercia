export type ProductType = {
    id: string;
    name: string;
    slug?: string;
    price: number;
    discount?: number;
    rating?: number;
    imageUrl: string;
    stock?: number;
};