"use client";
import React from "react";
import { Phone, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="w-full bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F5FBF7] px-4 py-1 text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-[#1B8057]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E676]" />
                <span>
                  Unified Products • We respond faster than your vegetables wilt
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#061019] leading-tight">
                Let us know what your kitchen needs
              </h1>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                Questions about bulk orders, delivery slots, or custom
                requirements? Share a few details and our team will reach out
                with clear, practical answers.
              </p>

              <div className="grid gap-4 sm:grid-cols-3 max-w-xl">
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Average reply time</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    under 2h
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Support coverage</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    7 days
                  </p>
                </div>
                <div className="rounded-2xl bg-[#F5FBF7] px-4 py-3 border border-[#E2E8F0]">
                  <p className="text-xs text-gray-500">Happy partners</p>
                  <p className="text-xl md:text-2xl font-bold text-[#061019]">
                    1,000+
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 md:h-80 lg:h-[360px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#F5FBF7] shadow-sm">
                <img
                  src="/vegetable-1.jpg"
                  alt="Fresh produce delivered by Unified Products"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 -mt-4 md:-mt-6 space-y-14 md:space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="rounded-2xl bg-white/95 p-8 flex flex-col items-center text-center shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#1D5DFF]/20">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1D5DFF] rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-blue-500/30">
              <Phone className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              Customer care phone
            </h3>
            <p className="text-sm text-[#05472C] mb-3">
              Call us for instant support on urgent orders.
            </p>
            <p className="text-base md:text-lg text-[#1D5DFF] font-semibold">
              1800-245-6747
            </p>
          </div>

          <div className="rounded-2xl bg-white/95 p-8 flex flex-col items-center text-center shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#00C853]/20">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00C853] rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-green-500/30">
              <Mail className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              Email support
            </h3>
            <p className="text-sm text-[#05472C] mb-3">
              Share detailed requirements or feedback anytime.
            </p>
            <p className="text-base md:text-lg text-[#1D5DFF] font-semibold">
              Support14@vs.com
            </p>
          </div>

          <div className="rounded-2xl bg-white/95 p-8 flex flex-col items-center text-center shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-[#00E676]/20">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00E676] rounded-full flex items-center justify-center mb-5 text-white shadow-lg shadow-green-500/30">
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
              WhatsApp chat
            </h3>
            <p className="text-sm text-[#05472C] mb-3">
              Quick questions, live updates, and order clarifications.
            </p>
            <Button className="bg-[#00E676] hover:bg-[#00C853] text-white font-semibold px-7 mt-1 rounded-full">
              Start chat
            </Button>
          </div>
        </div>

        <div className="rounded-3xl bg-[#EAF6F6]/90 backdrop-blur-sm overflow-hidden flex flex-col lg:flex-row shadow-lg ring-1 ring-[#CDE4E4]">
          <div className="lg:w-1/2 p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Send us a message
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-8">
              Tell us a bit about your business, and we will follow up with
              tailored suggestions, delivery options, and pricing that match
              your daily volume.
            </p>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  placeholder="John Doe"
                  className="bg-white/95 border-none h-11 rounded-xl shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  placeholder="john@example.com"
                  type="email"
                  className="bg-white/95 border-none h-11 rounded-xl shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <Input
                  placeholder="+1 000 000 0000"
                  className="bg-white/95 border-none h-11 rounded-xl shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  placeholder="Bulk order, delivery, or partnership..."
                  className="bg-white/95 border-none h-11 rounded-xl shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  placeholder="Share any details that help us support you better..."
                  className="bg-white/95 border-none min-h-[120px] rounded-2xl resize-none shadow-xs"
                />
              </div>

              <Button className="bg-[#1B8057] hover:bg-[#146041] text-white h-11 px-7 rounded-full inline-flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Submit message</span>
              </Button>
            </form>
          </div>

          <div className="lg:w-1/2 relative min-h-[360px] lg:min-h-full">
            <div className="absolute inset-4 md:inset-5 lg:inset-6 rounded-3xl overflow-hidden border-4 border-white/40 shadow-[0_24px_60px_rgba(6,16,25,0.45)]">
              <img
                src="/office-team.png"
                alt="Unified Products team coordinating fresh deliveries"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
