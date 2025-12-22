import { useContext, useState } from "react";
import { AppContext } from "../../features/app_context/AppContext";
import { useNavigate } from "react-router-dom";
import CartDao from "../../entities/cart/api/CartDao";
import "./Checkout.css";

// 1. Импортируем недостающие типы и DAO
import type CartItem from "../../entities/cart/model/CartItem"; 
import OrderDao from "../../entities/order/api/OrderDao";
import type { OrderType } from "../../entities/order/model/OrderType";

export default function Checkout() {
  const { cart, setCart, showToast } = useContext(AppContext);
  const navigate = useNavigate();

  // Состояние формы
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    delivery: "pickup" // pickup | courier
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.items.length === 0) {
        showToast({ message: "Cart is empty!" });
        return;
    }

    // --- ЛОГИКА СОХРАНЕНИЯ ЗАКАЗА ---
    
    // 1. Считаем итоговую сумму с доставкой
    const deliveryCost = formData.delivery === 'courier' ? 20 : 0;
    const finalPrice = cart.price + deliveryCost;

    // 2. Формируем объект заказа
    const newOrder: OrderType = {
        id: Date.now().toString(), // Генерируем ID
        date: new Date().toLocaleDateString(), // Текущая дата
        items: [...cart.items], // Копируем товары
        totalPrice: finalPrice,
        deliveryMethod: formData.delivery === 'pickup' ? 'Pickup' : 'Courier',
        status: 'Processing'
    };

    // 3. Сохраняем заказ в историю
    OrderDao.addOrder(newOrder);

    // 4. Очищаем корзину
    const emptyCart = { items: [], price: 0 };
    setCart(emptyCart);
    CartDao.save(emptyCart);

    // 5. Показываем уведомление и редирект
    showToast({ message: "Order placed successfully!", timeout: 5000 });
    navigate("/orders"); // Переходим на страницу заказов
  };

  if (cart.items.length === 0) {
      return <div className="checkout-page"><h2>Your cart is empty</h2></div>;
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Placing an order</h1>
      
      <div className="checkout-layout">
        {/* ЛЕВАЯ КОЛОНКА - ФОРМА */}
        <form className="checkout-form" onSubmit={handleOrderConfirm}>
            <div className="form-section">
                <h2 className="section-title">Contact details</h2>
                
                <div className="form-row">
                    <input 
                        type="text" name="name" placeholder="Recipient's name*" 
                        className="checkout-input" required 
                        value={formData.name} onChange={handleInputChange}
                    />
                    <input 
                        type="tel" name="phone" placeholder="Phone number" 
                        className="checkout-input" 
                        value={formData.phone} onChange={handleInputChange}
                    />
                </div>
                <input 
                    type="email" name="email" placeholder="Email*" 
                    className="checkout-input full-width" required 
                    value={formData.email} onChange={handleInputChange}
                />
            </div>

            <div className="form-section">
                <h2 className="section-title">Delivery method</h2>
                
                {/* Радио-кнопки для доставки */}
                <label className={`delivery-option ${formData.delivery === 'pickup' ? 'selected' : ''}`}>
                    <input 
                        type="radio" name="delivery" value="pickup" 
                        checked={formData.delivery === 'pickup'} 
                        onChange={handleInputChange} 
                    />
                    <div className="delivery-info">
                        <span className="delivery-title">Pickup from the pick-up point</span>
                        <span className="delivery-time">1-2 days</span>
                    </div>
                    <span className="delivery-price">Free</span>
                </label>

                <label className={`delivery-option ${formData.delivery === 'courier' ? 'selected' : ''}`}>
                    <input 
                        type="radio" name="delivery" value="courier" 
                        checked={formData.delivery === 'courier'} 
                        onChange={handleInputChange} 
                    />
                    <div className="delivery-info">
                        <span className="delivery-title">By courier</span>
                        <span className="delivery-time">15-30 minutes</span>
                    </div>
                    <span className="delivery-price">20 $</span>
                </label>
            </div>
        </form>

        {/* ПРАВАЯ КОЛОНКА - ИТОГО */}
        <div className="checkout-summary">
            <h2 className="summary-title">Your order</h2>
            
            <div className="summary-items">
                {/* 2. ИСПРАВЛЕНИЕ: Явно указываем тип (item: CartItem) */}
                {cart.items.map((item: CartItem) => (
                    <div className="summary-item-row" key={item.product.id}>
                        <span className="item-name">{item.product.name} x {item.cnt}</span>
                        <span className="item-price">{item.price.toMoney()} $</span>
                    </div>
                ))}
            </div>

            <div className="divider"></div>

            <div className="summary-row">
                <span>Product</span>
                <span>{cart.price.toMoney()} $</span>
            </div>
            <div className="summary-row">
                <span>Delivery</span>
                <span>{formData.delivery === 'courier' ? '20 $' : 'Free'}</span>
            </div>

            <div className="summary-total">
                <span>Total</span>
                <span>{(cart.price + (formData.delivery === 'courier' ? 20 : 0)).toMoney()} $</span>
            </div>

            <button className="btn-confirm-order" onClick={handleOrderConfirm}>
                Confirm the order
            </button>
        </div>
      </div>
    </div>
  );
}