import { Link } from "react-router-dom";
import type { HomePageSection } from "./types/section";
import "./ui/SectionCard.css";

export default function SectionCard({ section }: { section: HomePageSection }) {
  return (
    <Link to={`/section/${section.slug}`} className="section-card">
      <div className="card-image">
        {/* Если картинки нет, показываем заглушку */}
        <img src={section.imageUrl} alt={section.title} onError={(e) => e.currentTarget.style.display = 'none'} />
      </div>
      <p className="card-title">{section.title}</p>
    </Link>
  );
}