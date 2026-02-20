"use client";

import Image from "next/image";
import { useApi } from "@/hooks/use-api-data";
import { BannerResponse } from "@/types/banner";

export default function OfferBanners() {
  const { data: bannerData } = useApi<BannerResponse>("/banner", ["banners"]);
  const webBanners = bannerData?.data?.webBanners || [];

  const getImageUrl = (path: string | undefined, defaultImage: string) => {
    if (!path) return defaultImage;
    if (path.startsWith("http")) return path;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
    const baseUrl = apiUrl.includes("/api") ? new URL(apiUrl).origin : apiUrl;

    if (path.startsWith("/")) return `${baseUrl}${path}`;
    return `${baseUrl}/${path}`;
  };

  const offerBanners =
    webBanners.length >= 2 ? webBanners.slice(-2) : webBanners.slice(0, 2);

  const banner1 = offerBanners[0]
    ? getImageUrl(offerBanners[0].image, "/hero_market_display.png")
    : "/hero_market_display.png";
  const banner2 = offerBanners[1]
    ? getImageUrl(offerBanners[1].image, "/hero_delivery_handover.png")
    : "/hero_delivery_handover.png";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Market Display */}
          <div className="relative h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src={banner1}
              width={750}
              height={250}
              alt="Market Display Offer"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
          </div>

          {/* Banner 2: Delivery Handover */}
          <div className="relative h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src={banner2}
              width={750}
              height={250}
              alt="Delivery Handover Offer"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
