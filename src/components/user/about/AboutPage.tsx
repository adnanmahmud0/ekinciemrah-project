import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="w-full bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F5FBF7] px-4 py-1 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#1B8057]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E676]" />
                <span>
                  Unified Products • Fresh market for modern businesses
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#061019] leading-tight">
                Fresh, honest produce delivered with premium care
              </h1>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Unified Products was created to make premium-quality vegetables
                and fruits as easy to buy as they are to enjoy. From farm to
                doorstep, every step is designed around trust, freshness, and
                your everyday convenience.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Partner farms</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    120+
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">On-time deliveries</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    98%
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Cities served</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    35+
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Freshness checks</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    3x
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 md:h-80 lg:h-[360px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#F5FBF7] shadow-sm">
                <img
                  src="/vegetable-1.jpg"
                  alt="Fresh vegetables from Unified Products"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto text-center mb-14 md:mb-16">
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#1B8057] uppercase mb-3">
              Our service philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#061019] mb-4">
              Built for busy kitchens that refuse to compromise on freshness
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Every part of Unified Products is carefully designed for
              real-world use: consistent quality, transparent pricing, and
              support that feels human, not scripted.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="group rounded-2xl bg-white/90 p-7 md:p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#1B8057]/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF6F6] text-[#1B8057] text-lg font-semibold">
                  01
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  You first, always
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                From how we select produce to how we deliver it, every decision
                starts with your kitchen in mind. If it is not good enough for
                our own tables, it never reaches yours.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/90 p-7 md:p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#1B8057]/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF6F6] text-[#1B8057] text-lg font-semibold">
                  02
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Support with a human touch
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Need to adjust an order, ask about a delivery, or share
                feedback? Our team responds quickly, clearly, and with the same
                care we put into every box we pack.
              </p>
            </div>

            <div className="group rounded-2xl bg-white/90 p-7 md:p-8 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#1B8057]/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF6F6] text-[#1B8057] text-lg font-semibold">
                  03
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Made for your table
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We do not just move boxes. We help you plan menus, keep stock
                predictable, and make sure you always have the right ingredients
                in the right condition at the right time.
              </p>
            </div>
          </div>

          <div className="mt-14 md:mt-16 max-w-5xl mx-auto rounded-3xl bg-[#EAF6F6] px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="shrink-0 rounded-2xl bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#1B8057]">
                Clear and simple communication
              </p>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              From product details and pricing to delivery updates, we keep
              everything transparent and easy to understand. You always know
              what you are getting, when it is arriving, and how fresh it will
              be when it reaches you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
