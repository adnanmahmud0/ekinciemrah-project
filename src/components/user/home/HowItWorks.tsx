"use client";
import React from "react";
import { ClipboardCheck, Search, CalendarCheck, Pin } from "lucide-react";

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
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D1E32] flex items-center gap-2">
            <span className="text-[#146041] text-xl uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
              <Pin className="w-5 h-5" />
              Servify
            </span>
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D1E32]">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: { id: number; title: string; description: string; icon: React.ElementType } }) {
  const Icon = step.icon;
  return (
    <div className="group relative h-[320px] rounded-3xl overflow-hidden ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{ backgroundImage: `url('/category-bg.png')` }}
      />

      {/* Content */}
      <div className="relative z-10 h-full border-2 border-[#E6F4F1] rounded-3xl flex flex-col items-start justify-center p-8">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-[#146041] text-white flex items-center justify-center">
          <Icon className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-[#0D1E32] mb-3">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed font-semibold">
          {step.description}
        </p>
      </div>
    </div>
  );
}
