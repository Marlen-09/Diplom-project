import HeroBanner from "@/components/feature/home/hero-banner";
import FeaturedProducts from "@/components/feature/home/featured-products";
import CategoriesShowcase from "@/components/feature/home/categories-showcase";
import PromoSection from "@/components/feature/home/promo-section";
import Section from "@/components/common/layout/section";

export default function Home() {
  return (
    <div className="pb-16">
      <HeroBanner />
      
      <Section title="Featured Products">
        <FeaturedProducts />
      </Section>
      
      <Section title="Shop by Category">
        <CategoriesShowcase />
      </Section>
      
      <PromoSection />
    </div>
  );
}