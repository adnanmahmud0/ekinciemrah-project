"use client";

import { Leaf, TrendingDown, Truck, Handshake } from "lucide-react";

const companyCards = [
  {
    icon: Leaf,
    title: "Farm Fresh Quality",
    description:
      "We source directly from trusted farms, delivering the freshest produce to your door with zero compromise on quality.",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: TrendingDown,
    title: "Competitive Pricing",
    description:
      "Our direct farm relationships eliminate middlemen, giving you the best prices on fresh produce every single day.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Fast, reliable delivery across the country. We ensure your order reaches you fresh, on time, every time.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    icon: Handshake,
    title: "Trusted Partnerships",
    description:
      "Built on years of strong relationships with farmers and businesses, we are a partner you can always count on.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
  },
];

export default function CompanySection() {
  return (
    <section className="bg-gray-50/50 mt-14">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Heading */}
          <div className="flex flex-col justify-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border px-4 py-1.5 rounded-full w-fit mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Unified Produce —{" "}
              <span className="text-emerald-600">Fresh &amp; Reliable</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
              We are a premium produce distributor committed to delivering the
              freshest, highest-quality vegetables and fruits straight from the
              farm to your business or doorstep.
            </p>
            <div className="mt-8 h-1 w-16 rounded-full bg-emerald-500" />
          </div>

          {/* Right: Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className={`${card.color} rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-300`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} shrink-0`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
