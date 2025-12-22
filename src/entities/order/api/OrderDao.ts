import type { OrderType } from "../model/OrderType";

export default class OrderDao {
    static #storageKey = "orders-komercia";

    // Получить все заказы
    static getOrders(): OrderType[] {
        const data = localStorage.getItem(this.#storageKey);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch (e) {
            console.error("Order parse error", e);
            return [];
        }
    }

    // Добавить новый заказ
    static addOrder(order: OrderType) {
        const orders = this.getOrders();
        // Добавляем новый заказ в начало списка
        orders.unshift(order);
        localStorage.setItem(this.#storageKey, JSON.stringify(orders));
    }
}