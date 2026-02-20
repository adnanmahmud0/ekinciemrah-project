import {
  Headphones,
  Leaf,
  ShieldCheck,
  TrendingDown,
  Truck,
} from "lucide-react";

function MiniPromotionalBanners() {
  return (
    <section className="bg-white my-14">
      <div className="container mx-auto px-4">
        {/* Bottom Features Marquee - Redesigned UI */}
        <div className="overflow-hidden mt-8 relative py-6 rounded-3xl bg-gradient-to-r from-emerald-50/50 via-white to-emerald-50/50 border border-emerald-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex w-fit items-center animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
            {/* First set of features */}
            <div className="flex gap-16 items-center shrink-0 pr-16">
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                    Free Delivery
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Orders from £30
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                    Freshness
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Fresh Products Every Day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                    Safe Payment
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    With Any Bank Card
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-600 font-bold">
                    24/7 Support
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Always Be There for You
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                    Best Price
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Lowest Prices Guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="flex gap-16 items-center shrink-0 pr-16">
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                    Free Delivery
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Orders from £30
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                    Freshness
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Fresh Products Every Day
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">
                    Safe Payment
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    With Any Bank Card
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-purple-600 font-bold">
                    24/7 Support
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Always Be There for You
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-emerald-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                    Best Price
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    Lowest Prices Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MiniPromotionalBanners;
