export default function FAQPage() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Browse products on the Service page, add items to your cart, then go to checkout to confirm your delivery details and submit the order.",
    },
    {
      question: "Who can create an account?",
      answer:
        "Our platform is designed for business customers such as restaurants, retailers, and catering services. You can register with your business details and contact information.",
    },
    {
      question: "How are prices and availability updated?",
      answer:
        "Prices and stock levels can change based on market conditions and availability. The prices you see at checkout are the ones that apply to your current order.",
    },
    {
      question: "When will my order be delivered?",
      answer:
        "Delivery windows are shown during checkout. After placing an order you will see the selected delivery date and time window in your order details.",
    },
    {
      question: "What if there is an issue with my delivery?",
      answer:
        "If you receive incorrect items or have quality concerns, please contact our support team as soon as possible with your order number so we can review and resolve the issue.",
    },
    {
      question: "How can I update my business or contact details?",
      answer:
        "You can update your profile information from your account area. For changes that affect billing or contracts, you may also reach out to our support team.",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 md:mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1E32] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Answers to common questions about using the platform, placing
            orders, and managing your business account.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start">
          <div className="space-y-4 md:space-y-5">
            {faqs.map((item, index) => (
              <div
                key={item.question}
                className="group rounded-2xl bg-white border border-gray-100 px-5 py-4 md:px-6 md:py-5 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-semibold text-[#0D1E32] mb-1">
                      {item.question}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-3xl bg-white border border-gray-100 p-6 md:p-7 shadow-sm space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#0D1E32]">
                Still need help?
              </h2>
              <p className="text-sm text-gray-600">
                If you cannot find an answer here, you can reach out to our
                support team and we&apos;ll be happy to assist with your account
                or orders.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="font-medium text-[#0D1E32] mb-1">Contact email</p>
                <p className="text-gray-600">
                  support@unifiedproduce.com (please include your business name
                  and order number if available).
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="font-medium text-[#0D1E32] mb-1">
                  Best time to reach us
                </p>
                <p className="text-gray-600">
                  We aim to respond to messages during normal business hours on
                  working days.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
