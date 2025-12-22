import type { ProductType } from "../../product/model/ProductType";

export default interface CartItem {
    product: ProductType;
    cnt: number;      // Количество
    price: number;    // Цена * количество
}