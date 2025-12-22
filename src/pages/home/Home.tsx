import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./ui/Home.css";
import SectionDao from "../../entities/section/api/SectionDao";
import ProductDao from "../../entities/product/api/ProductDao";
import ProductCard from "../../features/product_card/ProductCard";
import type { HomePageSection } from "../../features/section_card/types/section";
import type { ProductType } from "../../entities/product/model/ProductType";
import SectionCard from "../../features/section_card/SectionCard";

export default function Home() {
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [bestsellers, setBestsellers] = useState<ProductType[]>([]);
  

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    SectionDao.getSections().then(setSections);
    ProductDao.getBestsellers().then(setBestsellers);
  }, []);


  const handleSearch = () => {
    if (searchValue.trim()) {
      // Переходим в каталог и передаем параметр ?search=...
      navigate(`/catalog?search=${searchValue}`);
    }
  };

  return (
    <div className="home-page">
      
      <div className="main-banner">
        <div className="banner-content">
          <h1 className="banner-title">Welcome to the online shop!</h1>
          <p className="banner-subtitle">
            Thousands of products from trusted sellers with fast delivery.
          </p>
          
          {/* 4. Привязываем инпут */}
          <div className="banner-search">
            <i className="bi bi-search" onClick={handleSearch} style={{cursor: 'pointer'}}></i>
            <input 
                type="text" 
                placeholder="Searching products..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Поиск по Enter
            />
          </div>
        </div>

        {/* Декоративные картинки */}
        <img src="/img/headphonesfull.png.webp" alt="headphones" className="banner-decor decor-headphones" />
        <img src="/img/big-2025-iphonefull.png.webp" alt="phone" className="banner-decor decor-phone" />
        <img src="/img/wide-noutfull.png.webp" alt="laptop" className="banner-decor decor-laptop" />
      </div>

      {/* Секция Категорий */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Categories</h2>
        
        { }
        <div className="categories-grid">
          {sections.map((sec) => (
            <SectionCard section={sec} key={sec.slug} />
          ))}
        </div>
      </div>

      {/* Секция Хиты Продаж */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Bestsellers</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px'}}>
          {bestsellers.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}