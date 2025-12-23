import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ProductType } from "../../entities/product/model/ProductType";
import "./ui/ProductCard.css";
import { AppContext } from "../app_context/AppContext";
import CartDao from "../../entities/cart/api/CartDao";
// 1. Добавляем импорт типа CartItem
import type CartItem from "../../entities/cart/model/CartItem";

export default function ProductCard({ product }: { product: ProductType }) {
  const { cart, setCart, showToast } = useContext(AppContext);
  const navigate = useNavigate();

  const buyClick = () => {
    const newCart = { ...cart };
    
    // 2. Исправляем ошибку: указываем тип (i: CartItem)
    const item = newCart.items.find((i: CartItem) => i.product.id === product.id);

    if (item) {
      item.cnt += 1;
    } else {
      newCart.items.push({
        product: product,
        cnt: 1,
        price: product.price
      });
    }

    CartDao.calcPrices(newCart);
    setCart(newCart);
    showToast({ message: `Added to cart: ${product.name}` });
  };

  // 3. Исправляем ошибку: указываем тип (item: CartItem)
  const isInCart = cart.items.some((item: CartItem) => item.product.id === product.id);

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