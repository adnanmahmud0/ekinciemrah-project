"use client";
import { Apple, Play } from "lucide-react";
import Image from "next/image";

export default function AppMockUpBanner() {
  return (
    <section className="py-14 bg-[#E6F4F1] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1E32] leading-tight mb-6">
              Join <span className="text-[#146041]">Servify</span> & Simplify
              Your Service Experience Today!
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Find trusted professionals or grow your business by offering
              services online — all in one seamless platform. Accessible anytime
              from your desktop or mobile browser.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Google Play Button */}
              <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                <Play className="w-8 h-8 fill-current" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-medium leading-none">
                    Get it on
                  </p>
                  <p className="text-lg font-bold leading-tight">Google Play</p>
                </div>
              </button>

              {/* App Store Button  */}
              <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition-opacity">
                <Apple className="w-8 h-8 fill-current" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-medium leading-none">
                    Download on the
                  </p>
                  <p className="text-lg font-bold leading-tight">App Store</p>
                </div>
              </button>
            </div>
          </div>

          {/* Right Visuals - Phone Mockup */}
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-full h-[500px] lg:h-[600px] z-10">
              <Image
                src="/hand-mockup.png"
                alt="Hand holding mobile phone showing Servify app"
                fill
                className="object-contain object-center lg:object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
