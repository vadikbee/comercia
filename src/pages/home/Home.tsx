import { useEffect, useState } from "react";
import "./ui/styles.css"; // Твой переименованный файл стилей
import SectionDao from "../../entities/section/api/SectionDao";
import SectionCard from "../../features/section_card/SectionCard";
import ProductDao from "../../entities/product/api/ProductDao"; // Импорт Дао продуктов
import ProductCard from "../../features/product_card/ProductCard"; // Импорт карточки
import type { HomePageSection } from "../../features/section_card/types/section";
import type { ProductType } from "../../entities/product/model/ProductType";

export default function Home() {
  const [sections, setSections] = useState<HomePageSection[]>([]);
  const [bestsellers, setBestsellers] = useState<ProductType[]>([]);

  useEffect(() => {
    // 1. Загружаем категории
    SectionDao.getSections().then(setSections);
    
    // 2. Загружаем хиты продаж
    ProductDao.getBestsellers().then(setBestsellers);
  }, []);

  return (
    <div className="home-page">
      
      {/* Баннер */}
      <div className="main-banner">
        <h1 className="banner-title">Welcome to the online shop!</h1>
        <p className="banner-subtitle">Thousands of products from trusted sellers with fast delivery.</p>
        <div className="search-bar">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Searching products..." />
        </div>
      </div>

      {/* Секция Категорий */}
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Categories</h2>
        <div className="categories-grid">
           {sections.map((sec) => (
               <SectionCard section={sec} key={sec.slug} />
           ))}
        </div>
      </div>

      {/* Секция Хиты Продаж (Новая!) */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '20px' }}>Bestsellers</h2>
        <div className="categories-grid"> {/* Используем тот же класс сетки или создай products-grid */}
           {bestsellers.map((product) => (
               <ProductCard product={product} key={product.id} />
           ))}
        </div>
      </div>

    </div>
  );
}