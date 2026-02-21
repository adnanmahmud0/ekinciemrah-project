import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Unified Produce Privacy Policy to understand how we collect, use, and protect your business information.",
  alternates: { canonical: "/privacyPolicy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Privacy for your business account
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1E32] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Learn how we handle your data when you use the platform to browse,
            order, and manage fresh produce for your business.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white border border-emerald-50 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Transparent
                </p>
                <p className="text-sm text-gray-600">
                  Clear overview of what we collect and how it is used.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-emerald-50 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Purpose-driven
                </p>
                <p className="text-sm text-gray-600">
                  Data is used only to run, support, and improve the service.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-emerald-50 p-4">
                <p className="text-xs uppercase tracking-wide text-emerald-600 mb-1">
                  Protected
                </p>
                <p className="text-sm text-gray-600">
                  Reasonable safeguards to keep your business information safe.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  1. Information we collect
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We collect information you provide directly, such as your
                  name, email, business details, delivery addresses, and order
                  history. We may also collect technical information like device
                  type, browser, and usage analytics to understand how the
                  platform is used and to improve performance and reliability.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  2. How we use your information
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your information is used to process orders, manage your
                  account, provide customer support, and send important
                  service-related updates. We may also use aggregated and
                  anonymised data to analyse trends, plan stock, and improve our
                  product offering and delivery experience.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm">
                <h2 className="text-lg font-semibold text-[#0D1E32] mb-2">
                  3. Data sharing
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We do not sell your personal data. We may share limited
                  information with trusted partners such as payment processors,
                  logistics providers, and analytics tools, but only so they can
                  perform services on our behalf and only under appropriate
                  safeguards and confidentiality obligations.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#0D1E32]">
                Your privacy choices
              </h2>
              <p className="text-sm text-gray-600">
                Quick overview of how you can manage your information and
                contact us about privacy.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="font-medium text-[#0D1E32] mb-1">
                  Account information
                </p>
                <p className="text-gray-600">
                  Update your business details, contact information, and
                  delivery addresses from your profile or by contacting our
                  support team.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="font-medium text-[#0D1E32] mb-1">
                  Communication preferences
                </p>
                <p className="text-gray-600">
                  You can opt out of non-essential marketing updates while still
                  receiving important service and order notifications related to
                  your account.
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="font-medium text-[#0D1E32] mb-1">
                  Retention and deletion
                </p>
                <p className="text-gray-600">
                  We keep your data only as long as needed for orders, legal
                  requirements, and legitimate business purposes. You can
                  request account closure, after which data is archived or
                  deleted where possible.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 text-xs text-gray-500 space-y-2">
              <p>
                If you have questions about this policy or how your information
                is used, please contact our support team. We are happy to help
                clarify anything on this page.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
