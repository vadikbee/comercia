import { useContext } from "react";
import type CartItem from "../../../entities/cart/model/CartItem";
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";
import CartDao from "../../../entities/cart/api/CartDao";

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
  const { cart, setCart } = useContext(AppContext);

  const incClick = () => {
    if(cartItem.product.stock && cartItem.product.stock <= cartItem.cnt) return;
    
    const newCart = { ...cart };
    const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
    if (item) { 
      item.cnt += 1;
      CartDao.calcPrices(newCart);
      setCart(newCart);
    }
  };

  const decClick = () => {
    if(cartItem.cnt <= 1) return;
    
    const newCart = { ...cart };
    const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
    if (item) { 
      item.cnt -= 1;
      CartDao.calcPrices(newCart);
      setCart(newCart);
    }
  };

  const removeClick = () => {
    if(window.confirm("Удалить товар из корзины?")) {
      const newItems = cart.items.filter((ci: CartItem) => ci.product.id !== cartItem.product.id);
      const newCart = { ...cart, items: newItems };
      CartDao.calcPrices(newCart); // Пересчитываем общую цену
      setCart(newCart);
    }
  };

  return (
    <div className="cart-item-card">
      {/* 1. Чекбокс */}
      <div className="item-checkbox">
        <input type="checkbox" className="custom-checkbox" defaultChecked />
      </div>

      {/* 2. Картинка */}
      <div className="item-img-wrapper">
        <img
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>

      {/* 3. Инфо по центру */}
      <div className="item-info">
        <div>
            <div className="item-title">{cartItem.product.name}</div>
            <div className="item-specs">Color <span style={{color:'#000'}}>black</span></div>
        </div>
        
        <div className="item-delivery">
            <strong>Pickup</strong> <span style={{color:'#9A9A9A'}}>For free</span>
            <span className="delivery-time">1-2 days</span>
        </div>
      </div>

      {/* 4. Правая колонка (Цена и кнопки) */}
      <div className="item-actions">
        <div className="action-top-row">
            <div className="item-price">{cartItem.price.toMoney()} $</div>
            {/* Иконка сердца (декоративная) */}
            <i className="bi bi-heart icon-action"></i>
            {/* Иконка удаления */}
            <i className="bi bi-x-lg icon-action icon-remove" onClick={removeClick}></i>
        </div>

        {/* Плюс/Минус */}
        <div className="qty-control">
            <button className="qty-btn" onClick={decClick}>−</button>
            <span className="qty-value">{cartItem.cnt}</span>
            <button className="qty-btn" onClick={incClick}>+</button>
        </div>
      </div>
    </div>
  );
}