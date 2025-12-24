import type { OrderType } from "../model/OrderType";

export default class OrderDao {
    static #storageKey = "user-orders";

    // Получить все заказы
    static getOrders(): OrderType[] {
        const data = window.localStorage.getItem(this.#storageKey);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    // Сохранить новый заказ (для справки, пригодится в Checkout)
    static addOrder(order: OrderType) {
        const orders = this.getOrders();
        orders.unshift(order); // Добавляем в начало
        window.localStorage.setItem(this.#storageKey, JSON.stringify(orders));
    }

    
    static deleteOrder(orderId: string) {
        const orders = this.getOrders();
        // Оставляем только те, у которых ID не совпадает с удаляемым
        const newOrders = orders.filter(order => order.id !== orderId);
        window.localStorage.setItem(this.#storageKey, JSON.stringify(newOrders));
    }
}