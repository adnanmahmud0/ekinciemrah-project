import AppMockUpBanner from "@/components/user/home/AppMockUpBanner";
import Categories from "@/components/user/home/Categories";
import HeroSection from "@/components/user/home/HeroSection";
import HowItWorks from "@/components/user/home/HowItWorks";
import Products from "@/components/user/home/Products";
import Review from "@/components/user/home/Review";

export default function page() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <Products />
      <HowItWorks />
      <AppMockUpBanner />
      <Review />
    </div>
  );
}
