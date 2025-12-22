import { Link, Outlet } from "react-router-dom";
import "./ui/Layout.css";
import { useContext } from "react";
import { AppContext } from "../app_context/AppContext";

import type CartItem from "../../entities/cart/model/CartItem";

export default function Layout() {
  const { cart } = useContext(AppContext);

  
  const totalItems = cart.items.reduce((sum: number, item: CartItem) => sum + item.cnt, 0);

  return (
    <div className="layout-wrapper">
      <header>
        {/* Логотип */}
        <Link to="/" className="navbar-brand">
          <img src="/img/logo/logo.png" alt="Online Shop" className="site-logo" />
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