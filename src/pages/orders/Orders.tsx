import { useState } from "react";
import { Link } from "react-router-dom";
import OrderDao from "../../entities/order/api/OrderDao";
import type { OrderType } from "../../entities/order/model/OrderType";
import "./Orders.css";
import Preloader from "../../shared/ui/Preloader/Preloader";
import type CartItem from "../../entities/cart/model/CartItem";

export default function Orders() {
    const [orders, setOrders] = useState<OrderType[]>(() => {
        return OrderDao.getOrders();
    });

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this order history?")) {
            OrderDao.deleteOrder(id);
            setOrders(orders.filter(order => order.id !== id));
        }
    };

    if (!orders) return <Preloader />;

    return (
        <div className="orders-page">
            {/* Обертка-карточка */}
            <div className="orders-container">
                <h1 className="orders-title">My Orders</h1>

                <div className="orders-list">
                    {orders.length === 0 ? (
                        <div className="no-orders">
                            <i className="bi bi-box-seam" style={{fontSize: '64px', color: '#ccc', marginBottom: '15px'}}></i>
                            <p>You have no orders yet.</p>
                            
                            <Link to="/" className="btn-go-shopping">
                                Go in catalog
                            </Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div>
                                        <div className="order-id">Order #{order.id}</div>
                                        <div className="order-date">from {order.date}</div>
                                    </div>
                                    <div className="order-header-right">
                                        <span className="order-status">{order.status}</span>
                                        <button 
                                            className="btn-delete-order" 
                                            onClick={() => handleDelete(order.id)}
                                            title="Delete order history"
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="order-body">
                                    <div className="order-preview-images">
                                        {order.items?.slice(0, 3).map((item: CartItem, idx: number) => (
                                            <div key={idx} className="order-img-thumb">
                                                <img 
                                                    src={item.product?.imageUrl} 
                                                    alt="item" 
                                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="order-summary">
                                        <div>Method: <strong>{order.method}</strong></div>
                                        <div className="order-total">Total: <span>{order.total} $</span></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}