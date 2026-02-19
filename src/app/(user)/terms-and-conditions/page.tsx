export default function TermsAndConditionsPage() {
  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Service terms for business customers
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0D1E32] mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Please read these terms carefully. By creating an account or
              placing an order you agree to follow the rules below that keep the
              platform fair and reliable for everyone.
            </p>

            <div className="space-y-8">
              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 1
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Account registration
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You are responsible for providing accurate business
                  information and keeping your login credentials secure. Any
                  activity performed under your account, including orders placed
                  by your team members, is your responsibility.
                </p>
              </div>

              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 2
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Orders and pricing
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Product availability and pricing may change without prior
                  notice. Orders are confirmed only after you receive an order
                  confirmation. We may adjust or cancel orders in case of
                  obvious pricing errors, stock limitations, or suspected
                  misuse.
                </p>
              </div>

              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 3
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Delivery and acceptance
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We aim to deliver orders within the agreed delivery window.
                  Please ensure someone is available to receive the goods, check
                  quantities and quality on arrival, and report any issues to
                  our support team as soon as possible.
                </p>
              </div>

              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 4
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Payments and credit
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Payment terms, including due dates and any credit limits, are
                  agreed between you and our team. Late or missed payments may
                  lead to additional charges, temporary suspension of ordering,
                  or changes to your credit terms.
                </p>
              </div>

              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 5
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Acceptable use
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You agree not to misuse the platform, attempt unauthorised
                  access, interfere with other users, or use the service in a
                  way that could damage our systems or reputation.
                </p>
              </div>

              <div className="border-l-2 border-emerald-200 pl-4">
                <div className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Section 6
                </div>
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  Changes to these terms
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We may update these terms from time to time. When we make
                  material changes we will highlight them on the platform.
                  Continued use of the service after changes take effect means
                  you accept the updated terms.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl bg-[#0D1E32] text-white p-6 md:p-7 shadow-lg space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">At a glance</h2>
              <p className="text-sm text-white/80">
                Short summary of the key points from these terms, so you can
                quickly understand how the service works.
              </p>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Business accounts only – you manage who can order.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>
                  Prices and availability can change based on the market.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>
                  Check deliveries on arrival and report issues promptly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Follow agreed payment terms and credit limits.</span>
              </li>
            </ul>

            <div className="border-t border-white/10 pt-4 text-xs text-white/70 space-y-2">
              <p>
                This page is a general explanation of the terms that apply when
                using the platform. If you have a separate written agreement
                with us, that agreement will take priority where terms differ.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
