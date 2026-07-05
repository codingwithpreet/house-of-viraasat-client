import ProductCard from "../../../components/ProductCard";
import { products } from "../data/products.data";

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  filterKey: "isNewArrival" | "isBestSeller";
}

export default function ProductShowcase({ title, subtitle, filterKey }: ProductShowcaseProps) {
  const filteredProducts = products.filter((p) => p[filterKey]);

  return (
    <section className="py-16 sm:py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans block">
            {title}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1C1C] font-normal tracking-wide">
            {subtitle}
          </h2>
          <div className="w-12 h-px bg-[#C5A059]/40 mx-auto mt-4" />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              category={product.category}
              fabric={product.fabric}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
              badge={product.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
