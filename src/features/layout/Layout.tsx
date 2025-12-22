import { Link, Outlet } from "react-router-dom";
import "./ui/Layout.css";
import { useContext } from "react";
import { AppContext } from "../app_context/AppContext";

export default function Layout() {
  // 1. Получаем корзину из глобального состояния
  const { cart } = useContext(AppContext);

  // 2. Считаем общее количество товаров (суммируем поле cnt каждого товара)
  // Если items пустой, вернет 0
  const totalItems = cart.items.reduce((sum, item) => sum + item.cnt, 0);

  return (
    <div className="layout-wrapper">
      <header>
        {/* Логотип */}
        <Link to="/" className="navbar-brand">
          <div className="logo-circle">
            <i className="bi bi-cart-fill"></i>
          </div>
          ONLINE SHOP
        </Link>

        {/* Меню навигации */}
        <nav>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link">Home page</Link>
            </li>
            <li>
              <Link to="/catalog" className="nav-link">Catalog</Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">Basket</Link>
            </li>
            <li>
              <Link to="/orders" className="nav-link">Orders</Link>
            </li>
          </ul>
        </nav>

        {/* Иконки справа */}
        <div className="nav-icons">
          <Link to="/cart" className="icon-btn">
             <i className="bi bi-bag"></i>
             {/* 3. Показываем кружочек, только если есть товары */}
             {totalItems > 0 && (
               <span className="cart-badge">{totalItems}</span>
             )}
          </Link>
          <Link to="/auth" className="icon-btn">
            <i className="bi bi-person"></i>
          </Link>
        </div>
      </header>

      {/* Сюда будут подставляться страницы (Home, Cart и т.д.) */}
      <main>
        <Outlet />
      </main>

      {/* Футер из дизайна */}
      <footer>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                © Komercia Shop, 2025. <br/>
                All rights reserved.
            </div>
            <div>
                <Link to="/privacy" style={{color: '#9A9A9A'}}>Privacy Policy</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}