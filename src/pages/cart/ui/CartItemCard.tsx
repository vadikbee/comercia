import { useContext } from "react";
import type CartItem from "../../../entities/order/model/CartItem"; // Убран пробел
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";
import CartDao from "../../../entities/cart/api/CartDao"; // Убран пробел

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    const { cart, setCart } = useContext(AppContext);

    const incClick = () => {
        if(cartItem.product.stock && cartItem.product.stock <= cartItem.cnt) {
            return;
        }
        const newCart = { ...cart };
        // Исправлена типизация (ci: CartItem)
        const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
        
        if (item) {       
            item.cnt += 1;
            CartDao.calcPrices(newCart);
            setCart(newCart);
        }
    };

    const decClick = () => {
        if(cartItem.cnt <= 1) {
            return;
        }
        const newCart = { ...cart };
        const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
        
        if (item) { 
            item.cnt -= 1;
            CartDao.calcPrices(newCart);
            setCart(newCart);
        }
    };

    const removeClick = () => {
        if(window.confirm("Удалить позицию?")) {
            setCart({ ...cart,
                items: cart.items.filter((ci: CartItem) => ci.product.id !== cartItem.product.id),
                price: cart.price - cartItem.price
            });
        }
    };

    return (
        <div className="row m-3 p-2 cart-item-card">
            <div className="col col-2">
                <img
                    src={cartItem.product.imageUrl}
                    alt={cartItem.product.name}
                    className="w-100" 
                    onError={(e) => e.currentTarget.style.display = 'none'} // Защита от битых картинок
                />
                <div className="text-center mt-2">
                    <button className="btn btn-outline-secondary me-2" onClick={decClick}>-</button>
                    {cartItem.cnt}
                    <button className="btn btn-outline-secondary ms-2" onClick={incClick}>+</button>
                </div>
            </div>
            <div className="col col-6">
                <h3>{cartItem.product.name}</h3>
                <div>Гарантия 1 год от {Math.round(cartItem.price * 0.1).toMoney()} $</div>
                <div>Гарантия 2 года от {Math.round(cartItem.price * 0.15).toMoney()} $</div>
            </div>
            <div className="col col-3 text-center">
                <h4>{cartItem.price.toMoney()} $</h4>
                {cartItem.product.discount &&
                    <div className="text-decoration-line-through">
                        {(cartItem.price + (cartItem.product.discount ?? 0) * cartItem.cnt).toMoney()} $
                    </div>
                }
            </div>
            <div className="col col-1 text-end">
                <i className="bi bi-trash3" role="button" onClick={removeClick} style={{cursor: 'pointer', color: 'red'}}></i>
            </div>
        </div>
    );
}