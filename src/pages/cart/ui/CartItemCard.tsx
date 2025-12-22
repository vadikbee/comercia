import { useContext } from "react";
import type CartItem from "../../../entities/cart/model/CartItem";
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";
import CartDao from "../../../entities/cart/api/CartDao";

// 1. Расширяем пропсы: добавляем isSelected и onToggle
interface Props {
  cartItem: CartItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function CartItemCard({ cartItem, isSelected, onToggle }: Props) {
  const { cart, setCart } = useContext(AppContext);

  // ... (функции incClick, decClick, removeClick оставляем без изменений) ...
  const incClick = () => {
    if(cartItem.product.stock && cartItem.product.stock <= cartItem.cnt) return;
    const newCart = { ...cart };
    const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
    if (item) { item.cnt += 1; CartDao.calcPrices(newCart); setCart(newCart); }
  };

  const decClick = () => {
    if(cartItem.cnt <= 1) return;
    const newCart = { ...cart };
    const item = newCart.items.find((ci: CartItem) => ci.product.id === cartItem.product.id);
    if (item) { item.cnt -= 1; CartDao.calcPrices(newCart); setCart(newCart); }
  };

  const removeClick = () => {
    if(window.confirm("Удалить товар из корзины?")) {
      const newItems = cart.items.filter((ci: CartItem) => ci.product.id !== cartItem.product.id);
      const newCart = { ...cart, items: newItems };
      CartDao.calcPrices(newCart); 
      setCart(newCart);
    }
  };

  return (
    <div className="cart-item-card">
      {/* 2. Привязываем чекбокс к пропсам */}
      <div className="item-checkbox">
        <input 
          type="checkbox" 
          className="custom-checkbox" 
          checked={isSelected}
          onChange={() => onToggle(cartItem.product.id)}
        />
      </div>

      <div className="item-img-wrapper">
        <img
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>

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

      <div className="item-actions">
        <div className="action-top-row">
            <div className="item-price">{cartItem.price.toMoney()} $</div>
            <i className="bi bi-heart icon-action"></i>
            <i className="bi bi-x-lg icon-action icon-remove" onClick={removeClick}></i>
        </div>

        <div className="qty-control">
            <button className="qty-btn" onClick={decClick}>−</button>
            <span className="qty-value">{cartItem.cnt}</span>
            <button className="qty-btn" onClick={incClick}>+</button>
        </div>
      </div>
    </div>
  );
}