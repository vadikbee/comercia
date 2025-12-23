import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './features/layout/Layout';
import Home from './pages/home/Home';
import CartPage from './pages/cart/Cart'; 
import Auth from './pages/auth/Auth';
import Preloader from './shared/ui/Preloader/Preloader';
import Privacy from './pages/privacy/Privacy';
import Catalog from './pages/catalog/Catalog'; 
import Product from './pages/product/Product';
import Checkout from './pages/checkout/Checkout';
import { AppContext } from './features/app_context/AppContext';
import CartDao from './entities/cart/api/CartDao';
import Orders from './pages/orders/Orders';
import type CartType from './entities/cart/model/CartType';
import type ToastData from './features/app_context/ToastData';
import type { UserType } from './entities/user/model/UserType';
import Toast from './features/app_context/ui/Toast'; 

export default function App() {
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
  
  const [cart, setCart] = useState<CartType>(CartDao.restoreSaved());
  
  useEffect(() => {
    CartDao.save(cart);
  }, [cart]);

  // --- ЛОГИКА TOAST ---
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (data: ToastData) => {
    setToast(data);
  };

  // --- ЛОГИКА PRELOADER ---
  const [isLoading, setIsLoading] = useState(false);

  return (
    // Добавляем isLoading и setIsLoading в контекст
    <AppContext.Provider value={{ user, setUser, showToast, cart, setCart, isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
        
        {/* Тостер (уведомления) */}
        {toast && <Toast data={toast} onClose={() => setToast(null)} />}
      </BrowserRouter>

      {/* Прелоадер (спиннер загрузки) - показываем, если isLoading === true */}
      {isLoading && <Preloader />}
    </AppContext.Provider>
  );
}