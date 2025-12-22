import type CartItem from "./CartItem";

export default interface CartType {
    items: Array<CartItem>; // Массив товаров
    price: number;          // Общая сумма
}