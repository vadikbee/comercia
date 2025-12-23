import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDao from "../../entities/product/api/ProductDao";
import type { ProductType } from "../../entities/product/model/ProductType";
import "./ui/Product.css";
import { AppContext } from "../../features/app_context/AppContext";
import CartDao from "../../entities/cart/api/CartDao";
import type CartItem from "../../entities/cart/model/CartItem";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  
  // Достаем корзину, тостер и ПРЕЛОАДЕР из контекста
  const { cart, setCart, showToast, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // 1. Включаем глобальный прелоадер
      setIsLoading(true); 
      
      ProductDao.getProduct(slug)
        .then((data) => {
          setProduct(data || null);
        })
        .catch((err) => {
          console.error(err);
          setProduct(null);
        })
        .finally(() => {
           // 2. Выключаем прелоадер
           setIsLoading(false);
        });
    }
  }, [slug, setIsLoading]);

  // Логика корзины
  const isInCart = product ? cart.items.some((item: CartItem) => item.product.id === product.id) : false;

  const addToCart = () => {
    if (!product) return;
    const newCart = { ...cart };
    
    const item = newCart.items.find((ci: CartItem) => ci.product.id === product.id);
    
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
    showToast({ message: `Added ${product.name} to cart` });
  };

  // Если продукта нет (например, еще грузится или ошибка 404),
  
  if (!product) {
     return <div className="product-page-container"></div>;
     // Либо можно вернуть: <h2>Product not found</h2>, но тогда надпись может появиться на долю секунды перед закрытием прелоадера.
  }

  return (
    <div className="product-page-container">
      {/* Левая часть - Картинка */}
      <div className="product-page-img">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      </div>

      {/* Правая часть - Инфо */}
      <div className="product-page-info">
        <h1 className="product-page-title">{product.name}</h1>
        
        <div className="product-page-rating">
           <span style={{color: '#FFB800'}}>★★★★★</span> {product.rating} (Reviews)
        </div>

        <div className="product-page-price-block">
           <span className="price-current">{product.price.toMoney()} $</span>
           {product.discount && (
             <span className="price-old">
               {(product.price + product.discount).toMoney()} $
             </span>
           )}
        </div>

        <div className="stock-info">
          {product.stock && product.stock > 0 
            ? <span className="stock-status stock-ok">In Stock</span>
            : <span className="stock-status stock-low">Out of Stock</span>
          }
        </div>

        <p style={{color: '#666', lineHeight: '1.6'}}>
           This allows you to experience entertainment in a completely new way. 
           Excellent color reproduction, high contrast and clarity of the image.
        </p>

        {/* Кнопки */}
        {isInCart ? (
            <button 
              className="btn-add-large" 
              style={{backgroundColor: '#28a745'}} 
              onClick={() => navigate('/cart')}
            >
              <i className="bi bi-check-lg"></i> In Cart
            </button>
        ) : (
            <button className="btn-add-large" onClick={addToCart}>
              <i className="bi bi-cart-plus"></i> Add to Basket
            </button>
        )}
      </div>
    </div>
  );
}