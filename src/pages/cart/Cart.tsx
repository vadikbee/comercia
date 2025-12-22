import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../features/app_context/AppContext";
import CartItemCard from "./ui/CartItemCard";
import "./ui/Cart.css";

export default function Cart() {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate(); // Хук навигации

  // Считаем общее количество товаров
  const totalItems = cart.items.reduce((sum, item) => sum + item.cnt, 0);

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Basket</h1>
        <div className="empty-cart-message">
          <i className="bi bi-cart-x" style={{ fontSize: '48px', display: 'block', marginBottom: '10px' }}></i>
          <p>Your basket is empty</p>
          <Link to="/" className="btn-confirm" style={{ display: 'inline-block', width: 'auto', textDecoration: 'none' }}>
            Go to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Basket <span style={{color: '#777C82', fontSize: '0.6em'}}>{totalItems} items</span></h1>

      <div className="cart-layout">
        
        {/* Левая колонка: Список товаров */}
        <div className="cart-items-list">
          {cart.items.map((item) => (
            <CartItemCard key={item.product.id} cartItem={item} />
          ))}
        </div>

        {/* Правая колонка: Итого (Order Summary) */}
        <div className="cart-summary">
          <h2 className="summary-title">Your order</h2>
          
          <div className="summary-row">
            <span>Product ({totalItems})</span>
            <span>{cart.price.toMoney()} $</span>
          </div>
          
          <div className="summary-row">
            <span>Delivery</span>
            <span style={{color: '#28a745'}}>Free</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>{cart.price.toMoney()} $</span>
          </div>

           <button className="btn-confirm" onClick={() => navigate('/checkout')}>
     Confirm the order
  </button>
        </div>

      </div>
    </div>
  );
}