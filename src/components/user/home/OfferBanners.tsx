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

  const isLocalImage = (url: string) => url.includes("localhost");

  const banner1 = webBanners[4]
    ? getImageUrl(webBanners[4].image, "/hero_market_display.png")
    : "/hero_market_display.png";
  const banner2 = webBanners[5]
    ? getImageUrl(webBanners[5].image, "/hero_delivery_handover.png")
    : "/hero_delivery_handover.png";

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Market Display */}
          <div className="relative h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src={banner1}
              alt="Market Display Offer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized={isLocalImage(banner1)}
            />
          </div>

          {/* Banner 2: Delivery Handover */}
          <div className="relative h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src={banner2}
              alt="Delivery Handover Offer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized={isLocalImage(banner2)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
