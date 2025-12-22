import { useState } from "react";
import { Link } from "react-router-dom";
import OrderDao from "../../entities/order/api/OrderDao";
import type { OrderType } from "../../entities/order/model/OrderType";
import "./Orders.css";

export default function Orders() {
    const [orders] = useState<OrderType[]>(() => {
        return OrderDao.getOrders();
    });

    if (orders.length === 0) {
        return (
            <div className="orders-page empty">
                <h1 className="orders-title">My Orders</h1>
                <div className="empty-state">
                    <i className="bi bi-box-seam" style={{fontSize: '48px', color: '#ccc', display: 'block', marginBottom: '15px'}}></i>
                    <p style={{marginBottom: '20px'}}>You haven't placed any orders yet.</p>
                    <Link to="/catalog" className="btn-go-shopping">Go to Catalog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1 className="orders-title">My Orders</h1>
            
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        {/* Заголовок карточки заказа */}
                        <div className="order-header">
                            <div className="order-meta">
                                <span className="order-id">Order #{order.id}</span>
                                <span className="order-date">from {order.date}</span>
                            </div>
                            <div className={`order-status ${order.status.toLowerCase()}`}>
                                {order.status}
                            </div>
                        </div>

                        {/* Тело карточки */}
                        <div className="order-body">
                            {/* Список картинок товаров */}
                            <div className="order-images">
                                {order.items.map((item) => (
                                    <div key={item.product.id} className="order-img-wrapper">
                                        <img 
                                            src={item.product.imageUrl} 
                                            alt={item.product.name}
                                            onError={(e) => e.currentTarget.style.display = 'none'} 
                                        />
                                        {item.cnt > 1 && <span className="item-qty-badge">x{item.cnt}</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Информация о цене и доставке */}
                            <div className="order-info">
                                <div className="info-row">
                                    <span>Method:</span>
                                    <strong>{order.deliveryMethod}</strong>
                                </div>
                                <div className="info-row">
                                    <span>Total:</span>
                                    <strong className="order-total-price">{order.totalPrice.toMoney()} $</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}