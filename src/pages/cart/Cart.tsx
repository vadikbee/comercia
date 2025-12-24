import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../features/app_context/AppContext";
import CartItemCard from "./ui/CartItemCard";
import "./ui/Cart.css";
import type CartItem from "../../entities/cart/model/CartItem";

export default function Cart() {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();


  const [selectedIds, setSelectedIds] = useState<string[]>(() => 
    cart.items.map((i: CartItem) => i.product.id)
  );


  const cartIdsHash = JSON.stringify(cart.items.map((i: CartItem) => i.product.id));

  
  useEffect(() => {
    setSelectedIds(JSON.parse(cartIdsHash));
  }, [cartIdsHash]);

  // Проверка: все ли выбраны?
  const isAllSelected = cart.items.length > 0 && selectedIds.length === cart.items.length;

  // Логика клика по "Select all"
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]); // Снять выделение
    } else {
      setSelectedIds(cart.items.map((i: CartItem) => i.product.id)); // Выбрать все
    }
  };

  // Логика клика по одному чекбоксу
  const handleToggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page" style={{textAlign: 'center', paddingTop: '100px'}}>
        <h1 className="cart-title"style={{ marginRight: '5%'}}>
          <p> basket</p></h1>
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
        
        {/* Чекбокс Select all */}
        <div className="select-all-row">
            <input 
              type="checkbox" 
              className="custom-checkbox" 
              checked={isAllSelected}
              onChange={handleSelectAll}
              id="select-all"
            />
            <label htmlFor="select-all" style={{cursor: 'pointer'}}>Select all</label>
        </div>
      </div>

      <div className="cart-layout">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="cart-items-list">
          {cart.items.map((item: CartItem) => (
            <CartItemCard 
                key={item.product.id} 
                cartItem={item} 
                // Передаем состояние
                isSelected={selectedIds.includes(item.product.id)}
                onToggle={handleToggleItem}
            />
          ))}
        </div>

        {/* ПРАВАЯ КОЛОНКА (SUMMARY) */}
        <div className="cart-summary">
          <h2 className="summary-title">Your order</h2>
          
          <div className="summary-items-list">
            {cart.items.map((item: CartItem) => (
                <div key={item.product.id} className="summary-item-row" style={{
                    opacity: selectedIds.includes(item.product.id) ? 1 : 0.5 
                }}>
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

          <button 
            className="btn-confirm" 
            onClick={() => navigate('/checkout')}
            disabled={selectedIds.length === 0} 
            style={{ opacity: selectedIds.length === 0 ? 0.5 : 1 }}
          >
            Confirm the order
          </button>
        </div>
      </div>
    </div>
  );
}