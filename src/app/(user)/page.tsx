import CategoryIcons from "@/components/user/home/CategoryIcons";
import PromotionalBanners from "@/components/user/home/PromotionalBanners";
import FeaturedProducts from "@/components/user/home/FeaturedProducts";
import OfferBanners from "@/components/user/home/OfferBanners";
import BuyItAgain from "@/components/user/home/BuyItAgain";
import AppMockUpBanner from "@/components/user/home/AppMockUpBanner";
import HowItWorks from "@/components/user/home/HowItWorks";
import Review from "@/components/user/home/Review";

export default function page() {
  return (
    <div>
      <CategoryIcons />
      <PromotionalBanners />
      <FeaturedProducts />
      <HowItWorks />
      <BuyItAgain />
      <OfferBanners />
      <AppMockUpBanner />
      <Review />
    </div>
  );
}
