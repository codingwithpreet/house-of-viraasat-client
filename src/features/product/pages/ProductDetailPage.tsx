import { useState, useRef, useEffect, useCallback } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import VariantSelector from "../components/VariantSelector";
import QuantitySelector from "../components/QuantitySelector";
import ProductActions from "../components/ProductActions";
import ProductHighlights from "../components/ProductHighlights";
import ProductTabs from "../components/ProductTabs";
import TrustIndicators from "../components/TrustIndicators";
import ReviewSection from "../components/ReviewSection";
import RelatedProducts from "../components/RelatedProducts";
import CompleteTheLook from "../components/CompleteTheLook";
import StickyPurchaseCard from "../components/StickyPurchaseCard";
import MobilePurchaseBar from "../components/MobilePurchaseBar";
import { productDetail } from "../data/product.data";
import { colorVariants, sizeVariants, fitVariants } from "../data/variants.data";
import { relatedProducts, completeTheLook } from "../data/related.data";

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function ProductDetailPage() {
  useDocumentMetadata({
    title: productDetail.name,
    description: productDetail.shortDescription,
    keywords: `${productDetail.name}, ${productDetail.category}, raw silk, zardosi embroidery, bespoke groom wear`,
  });

  // Variant state
  const [selectedColor, setSelectedColor] = useState(
    colorVariants.find((c) => c.available)?.name ?? "",
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFit, setSelectedFit] = useState(fitVariants[0]?.value ?? "");
  const [quantity, setQuantity] = useState(1);

  // Sticky card visibility
  const [showSticky, setShowSticky] = useState(false);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Scroll to reviews when rating is clicked
  const scrollToReviews = useCallback(() => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Show/hide sticky header based on purchase section scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );

    const el = purchaseRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const isOutOfStock = productDetail.stockStatus === "out-of-stock";

  return (
    <div className="bg-[#FDFCFB] pb-20 lg:pb-0">
      {/* Sticky Purchase Bar (desktop — appears when main section scrolls away) */}
      <StickyPurchaseCard product={productDetail} sizes={sizeVariants} visible={showSticky} />

      {/* Mobile Purchase Bar (always visible on mobile) */}
      <MobilePurchaseBar product={productDetail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Atelier Collections", path: "/collections" },
            {
              label: productDetail.category,
              path: `/products?category=${productDetail.category.toLowerCase()}`,
            },
            { label: productDetail.name },
          ]}
        />

        {/* ─── Main Two-Column PDP Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 mt-6">
          {/* LEFT — Gallery (sticky on desktop) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="lg:sticky lg:top-6">
              <ProductGallery images={productDetail.images} productName={productDetail.name} />
            </div>
          </div>

          {/* RIGHT — Product Information Column */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6" ref={purchaseRef}>
            {/* Product Info (name, price, rating, stock) */}
            <ProductInfo product={productDetail} onReviewsClick={scrollToReviews} />

            {/* Variant Selectors */}
            <VariantSelector
              colors={colorVariants}
              sizes={sizeVariants}
              fits={fitVariants}
              fabricName={productDetail.specifications[0]?.value ?? "Pure Raw Silk"}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              selectedFit={selectedFit}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
              onFitChange={setSelectedFit}
            />

            {/* Quantity */}
            <QuantitySelector quantity={quantity} onChange={setQuantity} disabled={isOutOfStock} />

            {/* Purchase Actions */}
            <ProductActions
              inStock={!isOutOfStock}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />

            {/* Product Highlights */}
            <ProductHighlights highlights={productDetail.highlights} />

            {/* Trust Indicators */}
            <TrustIndicators />
          </div>
        </div>

        {/* ─── Below-the-fold Sections ─── */}
        <div className="mt-16">
          {/* Product Tabs: Description / Specs / Care / Shipping / Returns / Styling */}
          <ProductTabs product={productDetail} />

          {/* Complete the Look */}
          <CompleteTheLook items={completeTheLook} />

          {/* Customer Reviews */}
          <ReviewSection sectionRef={reviewsRef} />

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
