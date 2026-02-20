import AppMockUpBanner from "@/components/user/home/AppMockUpBanner";
import BuyItAgain from "@/components/user/home/BuyItAgain";
import CategoryIcons from "@/components/user/home/CategoryIcons";
import CompanySection from "@/components/user/home/CompanySection";
import FeaturedProducts from "@/components/user/home/FeaturedProducts";
import HowItWorks from "@/components/user/home/HowItWorks";
import MiniPromotionalBanners from "@/components/user/home/MiniPromotionalBanners";
import OfferBanners from "@/components/user/home/OfferBanners";
import PromotionalBanners from "@/components/user/home/PromotionalBanners";
import Review from "@/components/user/home/Review";
import SideBanners from "@/components/user/home/SideBanners";

export default function page() {
  return (
    <>
      {/* 1. Category icons row */}
      <CategoryIcons />

      {/* 2. Main full-width slider */}
      <PromotionalBanners />

      {/* 3. Company info section */}
      <CompanySection />

      {/* 3. Mini promotional banners */}
      <MiniPromotionalBanners />

      {/* 4. Featured Products */}
      <FeaturedProducts />

      {/* 5. Side banners (relocated from beside the slider) */}
      <SideBanners />

      {/* 6. All Products grid */}
      <BuyItAgain />

      {/* 7. How It Works */}
      <HowItWorks />

      {/* 8. Small offer banners (unchanged position) */}
      <OfferBanners />

      {/* 9. App mockup banner */}
      <AppMockUpBanner />

      {/* 10. Reviews */}
      <Review />
    </>
  );
}
