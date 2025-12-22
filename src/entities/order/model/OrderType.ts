import type CartItem from "../../cart/model/CartItem";

export type OrderStatus = "Processing" | "Delivered" | "Cancelled";

export interface OrderType {
    id: string;
    date: string;
    items: CartItem[]; // Товары, которые были в корзине
    totalPrice: number;
    deliveryMethod: string; // "Pickup" или "Courier"
    status: OrderStatus;
}