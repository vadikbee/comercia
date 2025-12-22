import { useEffect, useState, useMemo } from "react";
import ProductDao from "../../entities/product/api/ProductDao";
import type { ProductType } from "../../entities/product/model/ProductType";
import ProductCard from "../../features/product_card/ProductCard";
import "./Catalog.css";

// Список категорий как в дизайне
const CATEGORIES = ["All", "Smartphones", "Laptops", "Tablets", "TVs", "Headphones"];

export default function Catalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  // Удаляем filteredProducts из стейта, так как это вычисляемое значение
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Загружаем товары при открытии страницы
  useEffect(() => {
    ProductDao.getAllProducts().then(setProducts);
  }, []);

  // 2. Фильтрация (Используем useMemo вместо useEffect)
  // useMemo запоминает результат и пересчитывает его только если изменились зависимости
  const filteredProducts = useMemo(() => {
    let result = products;

    // Фильтр по категории
    if (activeCategory !== "All") {
      // Временный хак для демо-данных
      if (activeCategory === "TVs") {
         result = result.filter(p => p.name.toLowerCase().includes("tv"));
      } else if (activeCategory === "Laptops") {
         result = result.filter(p => p.name.toLowerCase().includes("laptop") || p.name.toLowerCase().includes("asus")); 
      }
      // В реальном проекте тут будет проверка: p.category === activeCategory
    }

    // Фильтр по поиску
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="catalog-page">
      <h1 className="catalog-title">Catalog</h1>

      {/* Поиск */}
      <div className="catalog-search">
        <i className="bi bi-search"></i>
        <input 
          type="text" 
          placeholder="Searching products in catalog..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Категории (чипсы) */}
      <div className="catalog-categories">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Сетка товаров */}
      <div className="catalog-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-results">No products found</div>
        )}
      </div>
    </div>
  );
}