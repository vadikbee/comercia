import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductType } from "../../entities/product/model/ProductType";
import "./ui/ProductCard.css";
// Импортируем контекст и вспомогательные функции
import { AppContext } from "../app_context/AppContext";
import CartDao from "../../entities/cart/api/CartDao";

export default function ProductCard({ product }: { product: ProductType }) {
  // 1. Достаем корзину и функцию её обновления из глобального состояния
  const { cart, setCart, showToast } = useContext(AppContext);
  const navigate = useNavigate();

  // 2. Логика клика по кнопке
  const buyClick = () => {
    // Создаем копию корзины (в React нельзя менять state напрямую)
    const newCart = { ...cart };
    
    // Ищем, есть ли уже этот товар в корзине
    const item = newCart.items.find((i) => i.product.id === product.id);

    if (item) {
      // Если есть - увеличиваем количество
      item.cnt += 1;
    } else {
      // Если нет - добавляем новый
      newCart.items.push({
        product: product,
        cnt: 1,
        price: product.price // Цена за 1 шт
      });
    }

    // Пересчитываем общую цену (используем наш CartDao)
    CartDao.calcPrices(newCart);

    // 3. Обновляем глобальное состояние
    setCart(newCart);
    
    // Показываем уведомление
    showToast({ message: `Added to cart: ${product.name}` });
  };

  // Проверяем, есть ли товар уже в корзине (для изменения вида кнопки)
  const isInCart = cart.items.some(item => item.product.id === product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`} className="product-link">
        <div className="product-image-container">
           <img 
             src={product.imageUrl} 
             alt={product.name} 
             onError={(e) => e.currentTarget.style.display = 'none'} 
           />
        </div>
        <h3 className="product-title">{product.name}</h3>
      </Link>

      <div className="product-rating">
        <span style={{color: '#FFB800'}}>★</span> {product.rating}
      </div>

      <div className="product-footer">
        <div className="product-price">{product.price} $</div>
        
        {/* Если товар в корзине - меняем кнопку */}
        {isInCart ? (
            <button className="btn-buy" style={{backgroundColor: '#28a745'}} onClick={() => navigate('/cart')}>
                <i className="bi bi-check-lg"></i> In Cart
            </button>
        ) : (
            <button className="btn-buy" onClick={buyClick}>
                <i className="bi bi-cart"></i> Buy
            </button>
        )}
      </div>
    </div>
  );
}