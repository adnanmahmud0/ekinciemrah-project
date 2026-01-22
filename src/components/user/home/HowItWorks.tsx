"use client";
import React from "react";
import { ClipboardCheck, Search, CalendarCheck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    description: "Sign up to shop fresh produce or sell your products.",
    icon: ClipboardCheck,
  },
  {
    id: 2,
    title: "Find or List a Service",
    description: "Customers can browse services by category, location, or price.",
    icon: Search,
  },
  {
    id: 3,
    title: "Browse & Select",
    description: "Search and filter for your favorite products.",
    icon: CalendarCheck,
  },
  {
    id: 4,
    title: "Filter by Category",
    description: "Easily filter services and products based on your preferred category.",
    icon: Search,
  },
  {
    id: 5,
    title: "Cash on Delivery & Quick Book Payment",
    description: "Choose cash on delivery or make quick and easy payments during booking.",
    icon: ClipboardCheck,
  },
  {
    id: 6,
    title: "Credit Card Payment",
    description: "Pay securely using your credit card with a smooth checkout experience.",
    icon: CalendarCheck,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#FAFBFC]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            How It Works
          </h2>
          <p className="text-gray-600">Our simple process to get fresh produce delivered to you</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-6 relative">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: { id: number; title: string; description: string; icon: React.ElementType }; index: number }) {
  const Icon = step.icon;
  const stepNumber = (index + 1).toString().padStart(2, '0');

  return (
    <div className="group relative bg-white min-h-[200px] md:h-[280px] rounded-[24px] md:rounded-[32px] p-4 md:p-6 border border-emerald-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,79,59,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">
      {/* Step Badge */}
      <div className="absolute top-3 right-3 md:top-6 md:right-6 text-2xl md:text-[40px] font-black text-emerald-50/70 group-hover:text-emerald-100 transition-colors pointer-events-none">
        {stepNumber}
      </div>

      {/* Icon Container */}
      <div className="w-10 h-10 md:w-14 md:h-14 mb-4 md:mb-6 rounded-2xl bg-emerald-50 text-[#004F3B] flex items-center justify-center group-hover:bg-[#004F3B] group-hover:text-white transition-all duration-500 shadow-sm">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow items-center">
        <h3 className="text-xs md:text-base font-bold text-[#0D1E32] mb-2 md:mb-3 leading-tight group-hover:text-[#004F3B] transition-colors">{step.title}</h3>
        <p className="text-[10px] md:text-[13px] text-gray-500 leading-relaxed font-medium">
          {step.description}
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#004F3B] group-hover:w-1/3 transition-all duration-500 rounded-full" />
    </div>
  );
}
