import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom"; 
import ProductDao from "../../entities/product/api/ProductDao";
import type { ProductType } from "../../entities/product/model/ProductType";
import ProductCard from "../../features/product_card/ProductCard";
import "./Catalog.css";

const CATEGORIES = ["All", "Smartphones", "Laptops", "Tablets", "TVs", "Headphones"];

export default function Catalog() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
 
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Читаем категорию из URL
  const categoryParam = searchParams.get("category");
  const activeCategory = (categoryParam && CATEGORIES.includes(categoryParam)) 
    ? categoryParam 
    : "All";
  
  useEffect(() => {
    ProductDao.getAllProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    // --- ИСПРАВЛЕННАЯ ФИЛЬТРАЦИЯ ---
    // Используем префиксы ID (tv-, ph-, lap-) для точного определения категории
    if (activeCategory !== "All") {
      const catLower = activeCategory.toLowerCase();
      
      result = result.filter(p => {
        if (catLower === "tvs") return p.id.startsWith("tv-");
        if (catLower === "laptops") return p.id.startsWith("lap-");
        if (catLower === "smartphones") return p.id.startsWith("ph-");
        if (catLower === "tablets") return p.id.startsWith("tab-");
        if (catLower === "headphones") return p.id.startsWith("head-");
        
        return true; 
      });
    }

    // Фильтр по поиску
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  const handleCategoryClick = (cat: string) => {
    setSearchParams({ category: cat });
  };

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

      {/* Категории */}
      <div className="catalog-categories">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
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
          <div className="no-results">No products found for "{activeCategory}"</div>
        )}
      </div>
    </div>
  );
}