"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function OfferBanners() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Market Display */}
          <div className="relative h-[300px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src="/hero_market_display.png"
              alt="Market Display Offer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center p-6 md:p-10">
              <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full w-fit mb-4">
                Limited Time Offer
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                Fresh Harvest <br /> Everyday
              </h3>
              <p className="text-white/80 text-sm mb-6 max-w-[200px]">
                Get up to 30% off on exotic organic fruits this weekend.
              </p>
              <button className="flex items-center gap-2 text-white font-bold text-sm group/btn w-fit">
                Shop Now
                <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Banner 2: Delivery Handover */}
          <div className="relative h-[300px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-xl">
            <Image
              src="/hero_delivery_handover.png"
              alt="Delivery Handover Offer"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center p-6 md:p-10">
              <span className="bg-orange-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full w-fit mb-4">
                New Customer Special
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                Fast & Fresh <br /> To Your Door
              </h3>
              <p className="text-white/80 text-sm mb-6 max-w-[200px]">
                Your first delivery is on us when you spend £40 or more.
              </p>
              <button className="flex items-center gap-2 text-white font-bold text-sm group/btn w-fit">
                Claim Offer
                <MoveRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
