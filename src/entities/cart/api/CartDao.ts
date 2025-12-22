import type CartType from "../model/CartType";

export default class CartDao {
    static #cartKey = "cart-komercia"; 
    static #cartDefault: CartType = { items: [], price: 0 };

    // Сохранить корзину
    static save(cart: CartType) {
        window.localStorage.setItem(CartDao.#cartKey, JSON.stringify(cart));
    }

    // Восстановить корзину при загрузке
    static restoreSaved(): CartType {
        const data = window.localStorage.getItem(CartDao.#cartKey);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (err) {
                console.error("Cart restore error:", err);
            }
        }
        return CartDao.#cartDefault;
    }

    // Пересчет цен
    static calcPrices(cart: CartType) {
        let total = 0.0;
        // Исправлено для ESLint
        for (const ci of cart.items) {
            ci.price = ci.product.price * ci.cnt;
            total += ci.price;
        }
        cart.price = total;
    }
}