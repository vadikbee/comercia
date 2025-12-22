import { useParams } from "react-router-dom";
import './ui/Section.css';
import { useEffect, useState } from "react";
import type { SectionType } from "../../entities/section/model/SectionType";
import SectionDao from "../../entities/section/api/SectionDao";
import ProductCard from "../../entities/product/ui/ProductCard";

export default function Section() {
    const {slug} = useParams<string>();
    const [pageData, setPageData] = useState<SectionType|null>(null);

    useEffect(() => {
        if(typeof(slug) != 'undefined') {
            SectionDao.getSection(slug).then(setPageData);
        }        
    }, []);

    return <>
    <h1>Раздел: {slug}</h1>
    <div className="products-container">
        {pageData?.products.map(product => <ProductCard product={product} key={product.id} />)}
    </div>
    </>;
}