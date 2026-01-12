import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-120 w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover "
          style={{ backgroundImage: `url('/vegetable-1.jpg')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
              We started as a small team who were frustrated by how difficult it
              was to find truly fresh fruits and vegetables we could trust. Too
              often, produce looked good on the outside but lacked freshness,
              care, and transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
              Our Service Philosophy
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {` At our core, our customers always come first. From selecting fresh
              fruits and vegetables to careful packaging and timely delivery,
              every step is handled with your convenience and satisfaction in
              mind. We listen closely to feedback, improve continuously, and
              take responsibility for the quality we deliver. If it's not good
              enough for our own table, it's not good enough for yours.`}
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-12">
            {/* You First, Always */}
            <div className="group">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl text-green-600 mt-1">•</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  You First, Always
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed md:pl-8">
                Every step, from selecting fresh produce to careful delivery, is
                designed for your convenience. We listen, learn, and improve to
                bring you fresher, better-quality fruits and vegetables every
                day.
              </p>
            </div>

            {/* Support with a Human Touch */}
            <div className="group">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl text-green-600 mt-1">•</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  Support with a Human Touch
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed md:pl-8">
                Whether you need help with your order or have a question about
                freshness or delivery, our friendly team is always here to
                assist — quickly and genuinely.
              </p>
            </div>

            {/* Made for Your Table */}
            <div className="group">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl text-green-600 mt-1">•</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  Made for Your Table
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed md:pl-8">
                {` We don't just sell fruits and vegetables — we help you choose fresh, quality produce
                for your everyday meals. From careful selection to reliable delivery, everything is
                designed to fit naturally into your daily life.`}
              </p>
            </div>

            {/* Clear Communication */}
            <div className="group">
              <div className="flex items-start gap-4 mb-3">
                <span className="text-2xl text-green-600 mt-1">•</span>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                  Clear Communication
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed md:pl-8">
                {` We keep things simple and transparent — from product details and pricing to delivery
                updates. You'll always know what you're getting and when to expect it`}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
