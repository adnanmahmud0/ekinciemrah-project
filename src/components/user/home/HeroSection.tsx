"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#EAF6F6]">
      {/* Background Animation */}
      {/* change the background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#146041]/5 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[0%] w-[30%] h-[30%] bg-[#00E676]/5 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-[#1D5DFF]/5 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />

        {/* Decorative Rings */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] border border-[#146041]/5 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] border border-[#146041]/5 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
      </div>
      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#0D1E32] leading-tight mb-8">
              Freshness Delivered <br />
              to Your Doorstep
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {`"Fresh vegetables, fruits, and groceries delivered straight to
              your door – healthy, simple, and convenient."`}
            </p>
            <Button className="bg-[#146041] hover:bg-[#0F4C33] text-white px-8 py-6 text-lg rounded-md font-medium transition-transform hover:scale-105 shadow-xl shadow-green-900/10">
              Offer a Service
            </Button>
          </div>

          {/* Right Visuals - Collage */}
          <div className="lg:w-1/2 relative min-h-125 w-full flex items-center justify-center">
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#146041]/10 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-dashed border-[#146041]/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

            <div className="relative w-full max-w-150 h-125">
              {/* Image 1: Market Display - Top Right */}
              <div className="absolute -top-8 -right-8 w-[45%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-500 z-10">
                <Image
                  src="/hero_happy_customers.png"
                  alt="Happy customers enjoying fresh produce"
                  width={320}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2: Delivery Handover - Bottom Left */}
              <div className="absolute bottom-12 left-8 w-[45%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-500 z-20">
                <Image
                  src="/hero_delivery_handover.png"
                  alt="Friendly delivery service"
                  width={320}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3: Happy Customer - Center/Top Left floating */}
              {/* Image 3: Happy Customer - Center/Bottom Right floating */}
              <div className="absolute -bottom-18 right-6 w-[40%] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 transition-all duration-500 z-30">
                <Image
                  src="/hero_market_display.png"
                  alt="Fresh market display"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
