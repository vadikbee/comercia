import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../features/app_context/AppContext";
import CartItemCard from "./ui/CartItemCard";
import "./ui/Cart.css";
// 1. Импортируем тип, чтобы TypeScript понимал, что лежит в корзине
import type CartItem from "../../entities/cart/model/CartItem";

export default function Cart() {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  // Мы убрали totalItems, так как он не использовался в верстке и вызывал ошибку

  if (cart.items.length === 0) {
    return (
      <div className="cart-page" style={{textAlign: 'center', paddingTop: '100px'}}>
        <h1 className="cart-title">Basket</h1>
        <div className="empty-state">
          <i className="bi bi-cart-x" style={{ fontSize: '48px', marginBottom: '20px', display: 'block' }}></i>
          <p>Your basket is empty</p>
          <button className="btn-confirm" style={{width: '200px', marginTop: '20px'}} onClick={() => navigate('/')}>
             Go to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header-block">
        <h1 className="cart-title">Basket</h1>
        
        <div className="select-all-row">
            <input type="checkbox" className="custom-checkbox" defaultChecked />
            <span>Select all</span>
        </div>
      </div>

      <div className="cart-layout">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="cart-items-list">
          {/* 2. Явно указываем тип (item: CartItem) */}
          {cart.items.map((item: CartItem) => (
            <CartItemCard key={item.product.id} cartItem={item} />
          ))}
        </div>

        {/* ПРАВАЯ КОЛОНКА (SUMMARY) */}
        <div className="cart-summary">
          <h2 className="summary-title">Your order</h2>
          
          <div className="summary-items-list">
            {/* 3. И здесь тоже указываем тип */}
            {cart.items.map((item: CartItem) => (
                <div key={item.product.id} className="summary-item-row">
                    <span className="summary-item-name">{item.product.name} x {item.cnt}</span>
                    <span>{item.price.toMoney()} $</span>
                </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="summary-row">
                <span>Product</span>
                <span>{cart.price.toMoney()} $</span>
            </div>
            <div className="summary-row">
                <span>Delivery</span>
                <span>for free</span>
            </div>
            <div className="summary-row total">
                <span>Total</span>
                <span>{cart.price.toMoney()} $</span>
            </div>
          </div>

          <button className="btn-confirm" onClick={() => navigate('/checkout')}>
            Confirm the order
          </button>
        </div>
      </div>
    </div>
  );
}