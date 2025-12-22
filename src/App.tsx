import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './features/layout/Layout';
import Home from './pages/home/Home';
import CartPage from './pages/cart/Cart'; 
import Auth from './pages/auth/Auth';
import Privacy from './pages/privacy/Privacy';
import Catalog from './pages/catalog/Catalog'; 
// Импортируем страницу товара (убедись, что путь правильный, если нет - поправь)
import Product from './pages/product/Product';
import Checkout from './pages/checkout/Checkout';
import { AppContext } from './features/app_context/AppContext';
import CartDao from './entities/cart/api/CartDao';
import Orders from './pages/orders/Orders';
import type CartType from './entities/cart/model/CartType';
import type ToastData from './features/app_context/ToastData';
import type { UserType } from './entities/user/model/UserType';
import Toast from './features/app_context/ui/Toast'; // Импорт тостера

export default function App() {
  // 1. Состояние пользователя
  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = window.localStorage.getItem("user-komercia");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Ошибка восстановления сессии", e);
        return null;
      }
    }
    return null;
  });
  
  // 2. Состояние корзины
  const [cart, setCart] = useState<CartType>(CartDao.restoreSaved());
  
  useEffect(() => {
    CartDao.save(cart);
  }, [cart]);

  // 3. Состояние уведомлений (Toast)
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (data: ToastData) => {
    setToast(data);
  };

   return (
    <AppContext.Provider value={{ user, setUser, showToast, cart, setCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Добавляем маршрут каталога */}
            <Route path="catalog" element={<Catalog />} /> 
            <Route path="orders" element={<Orders />} /> 
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} /> 
            <Route path="auth" element={<Auth />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
        
        {toast && <Toast data={toast} onClose={() => setToast(null)} />}
      </BrowserRouter>
    </AppContext.Provider>
  );
}