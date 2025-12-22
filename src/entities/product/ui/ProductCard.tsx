import './ProductCard.css';
import type { ProductType } from "../model/ProductType";
import Label from '../../../features/label/Label';
import LabelTypes from '../../../features/label/types/LabelTypes';
import SiteButton from '../../../features/buttons/SiteButton';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../features/app_context/AppContext';
import ButtonTypes from '../../../features/buttons/types/ButtonTypes';

export default function ProductCard({product}:{product: ProductType}) {
    const {cart, setCart, showToast} = useContext(AppContext);
    const navigate = useNavigate();

    const buyClick = () => {
        let newCart = {...cart, price: cart.price + product.price};
        let item = newCart.items.find(i => i.product.id == product.id);
        if(item) {
            item.cnt += 1;
            item.price += product.price;
        }
        else {
            newCart.items.push({
                product: product, 
                price: product.price, 
                cnt: 1
            });
        }
        setCart(newCart);
        showToast({message: "Добавлено в корзину " + product.name});
    };

    

    return <div className="product-card">
        <Link to={"/product/" + (product.slug ?? product.id)}>
            {product.discount && product.discount > 0 &&
                <div className='product-card-discount'>
                    <Label type={LabelTypes.Violet} title={product.discount + " $"} />
                </div>}

            <div className='product-card-imgs'>
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className='product-card-rating'>
                {Array.from({ length: Math.round(product.rating ?? 1) }, () => <span>★</span>)}
                {Array.from({ length: Math.round(5-(product.rating ?? 1)) }, () => <span>☆</span>)}
                {product.rating}</div>
            
            <p className='two-line-ellipsis'>{product.name}</p>
        </Link>
        <div className='product-card-footer'>
            {cart.items.find(ci => ci.product.id == product.id)
            ? <SiteButton action={() => navigate("/cart")}>
                <i className="bi bi-cart-check"></i>&thinsp;
                <span>В корзине</span>
              </SiteButton>
            :  (product.stock ?? 1 ) == 0
                ? <SiteButton buttonType={ButtonTypes.White}>
                    <span>Нету</span>
                  </SiteButton>
                : <SiteButton action={buyClick} >
                    <i className="bi bi-cart"></i>&thinsp;
                    <span>Купить</span>
                </SiteButton>
            }
            <span>{product.price} $</span>
        </div>
    </div>;
}