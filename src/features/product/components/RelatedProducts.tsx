import ProductCard from "../../../components/ProductCard";
import type { RelatedProduct } from "../data/related.data";

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 border-t border-[#E5E1DA]">
      <div className="text-center mb-10 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium font-sans">
          You May Also Like
        </span>
        <h2 className="font-serif text-2xl text-[#1C1C1C] font-light">From the Same Atelier</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
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
    </section>
  );
}
