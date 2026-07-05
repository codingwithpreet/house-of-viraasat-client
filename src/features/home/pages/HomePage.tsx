import Hero from "../components/Hero";
import FeaturedCategories from "../components/FeaturedCategories";
import FeaturedCollection from "../components/FeaturedCollection";
import ProductShowcase from "../components/ProductShowcase";
import WhyChooseUs from "../components/WhyChooseUs";
import EditorialBanner from "../components/EditorialBanner";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import InstagramGallery from "../components/InstagramGallery";

import { useDocumentMetadata } from "../../../hooks/useDocumentMetadata";

export default function HomePage() {
  useDocumentMetadata({
    title: "Heritage Menswear Atelier",
    description:
      "Discover House of Viraasat's luxury collection of handcrafted Sherwanis, Kurta Sets, Bandhgalas, and Indo-Western attire for the modern groom.",
    keywords:
      "sherwani, kurta set, luxury menswear, groom wear, indian wedding wear, banarasi silk",
  });

  return (
    <div className="space-y-0">
      {/* 1. Hero Banner Section */}
      <Hero />

      {/* 2. Featured Categories Row/Grid */}
      <FeaturedCategories />

      {/* 3. Featured Collection Editorial Block */}
      <FeaturedCollection />

      {/* 4. New Arrivals Showcase */}
      <ProductShowcase
        title="NEW INCLUSIONS"
        subtitle="The Summer Wedding Arrivals"
        filterKey="isNewArrival"
      />

      {/* 5. Best Sellers Showcase */}
      <ProductShowcase
        title="SOVEREIGN CLASSICS"
        subtitle="The Most Coveted Masterpieces"
        filterKey="isBestSeller"
      />

      {/* 6. Why House of Viraasat Standards */}
      <WhyChooseUs />

      {/* 7. Large Editorial Story Spotlight */}
      <EditorialBanner />

      {/* 8. Patron Testimonials */}
      <Testimonials />

      {/* 9. Private Communications Signup */}
      <Newsletter />

      {/* 10. Instagram / Atelier Diaries Grid */}
      <InstagramGallery />
    </div>
  );
}
