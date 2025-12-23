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
      
      {/* ХЕДЕР */}
      <header>
        <div className="container header-inner">
          {/* Логотип */}
          <Link to="/" className="navbar-brand">
            {/* Если есть картинка логотипа */}
            <img src="/img/logo/logo.png" alt="Online Shop" className="site-logo" />
            {/* Или текстом, если картинки нет, как в макете ONLINE SHOP */}
          </Link>

          {/* Навигация */}
          <nav>
            <ul className="navbar-nav">
              <li><Link to="/" className="nav-link">Home page</Link></li>
              <li><Link to="/catalog" className="nav-link">Catalog</Link></li>
              <li><Link to="/cart" className="nav-link">Basket</Link></li>
              <li><Link to="/orders" className="nav-link">Orders</Link></li>
            </ul>
          </nav>

          {/* Иконки */}
          <div className="nav-icons">
             <Link to="/cart" className="icon-btn">
               <i className="bi bi-bag"></i>
               {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
             </Link>
             <Link to="/auth" className="icon-btn">
               <i className="bi bi-person"></i>
             </Link>
          </div>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      {/* Outlet рендерит Home, Cart и т.д. Внутри этих страниц сами страницы решают,
          где использовать .container, а где растягивать фон на 100% */}
      <main>
        <Outlet />
      </main>

      {/* ФУТЕР (По макету Figma) */}
      <footer>
        <div className="container">
          
          <div className="footer-grid">
            {/* Колонки навигации */}
            <div className="footer-nav-col">
              <div className="footer-col-title">For buyers</div>
              <Link to="#" className="footer-link">Frequently asked questions</Link>
              <Link to="#" className="footer-link">Promotions and discounts</Link>
              <Link to="#" className="footer-link">Delivery</Link>
              <Link to="#" className="footer-link">Exchange and return</Link>
              <Link to="#" className="footer-link">Storage of purchases</Link>
              <Link to="#" className="footer-link">Gift cards</Link>
            </div>

            <div className="footer-nav-col">
              <div className="footer-col-title">Details</div>
              <Link to="#" className="footer-link">Documents</Link>
              <Link to="#" className="footer-link">Privacy Policy</Link>
              <Link to="#" className="footer-link">Vacancies</Link>
            </div>
          </div>

          {/* Нижняя часть футера */}
          <div className="footer-bottom">
            <div>
               © All rights reserved
            </div>
            
            <div className="social-icons">
              {/* Используем иконки Bootstrap Icons или картинки */}
              <a href="#" className="social-link"><i className="bi bi-telegram"></i></a>
              <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}