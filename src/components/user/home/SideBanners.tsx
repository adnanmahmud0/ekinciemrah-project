"use client";

import Image from "next/image";
import { useApi } from "@/hooks/use-api-data";
import { BannerResponse } from "@/types/banner";

const getImageUrl = (path: string | undefined) => {
  if (!path) return "/promotion-2.png";
  if (path.startsWith("http")) return path;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
  const baseUrl = apiUrl.includes("/api") ? new URL(apiUrl).origin : apiUrl;
  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
};

export default function SideBanners() {
  const { data: bannerData } = useApi<BannerResponse>("/banner", ["banners"]);
  const webBanners = bannerData?.data?.webBanners || [];

  const rightBanner1 = webBanners[2]
    ? getImageUrl(webBanners[2].image)
    : "/promotion-2.png";
  const rightBanner2 = webBanners[3]
    ? getImageUrl(webBanners[3].image)
    : "/promotion-3.png";

  return (
    <section className="bg-white my-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Side Banner 1 */}
          <div className="relative h-[200px] md:h-[335px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <Image
              src={rightBanner1}
              width={860}
              height={300}
              alt="Promotion Banner"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>

          {/* Side Banner 2 */}
          <div className="relative h-[200px] md:h-[335px] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <Image
              src={rightBanner2}
              alt="Promotion Banner 2"
              width={860}
              height={300}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
