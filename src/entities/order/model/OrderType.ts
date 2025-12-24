import type CartItem from "../../cart/model/CartItem";

export type OrderStatus = "Processing" | "Delivered" | "Cancelled";

export interface OrderType {
    id: string;
    date: string;
    status: string;
    total: number;       // Добавили поле
    method: string;      // Добавили поле
    items: CartItem[];   // Используем правильный тип товаров
}