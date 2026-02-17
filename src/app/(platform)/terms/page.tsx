export default function termsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Last updated: February 17, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-gray-600 leading-relaxed">
                  Welcome to FreshCart! These Terms of Service ("Terms") govern
                  your use of our website and services. By accessing or using
                  FreshCart, you agree to be bound by these Terms. Please read
                  them carefully before using our services.
                </p>
              </div>

              {/* Acceptance of Terms */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using FreshCart's website and services, you
                  accept and agree to be bound by the terms and provision of
                  this agreement. If you do not agree to these Terms, you should
                  not use our services. We reserve the right to modify these
                  Terms at any time, and such modifications shall be effective
                  immediately upon posting.
                </p>
              </div>

              {/* User Accounts */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. User Accounts
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    To access certain features of our service, you must create
                    an account. You agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>
                      Provide accurate, current, and complete information during
                      registration
                    </li>
                    <li>
                      Maintain and promptly update your account information
                    </li>
                    <li>Maintain the security of your password and account</li>
                    <li>
                      Accept responsibility for all activities under your
                      account
                    </li>
                    <li>
                      Notify us immediately of any unauthorized use of your
                      account
                    </li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to suspend or terminate your account if
                    any information provided is inaccurate, fraudulent, or
                    violates these Terms.
                  </p>
                </div>
              </div>

              {/* Orders and Payments */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Orders and Payments
                </h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    3.1 Placing Orders
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you place an order through FreshCart, you are making an
                    offer to purchase products at the prices displayed. All
                    orders are subject to acceptance and product availability.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    3.2 Pricing
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    All prices are listed in USD and are subject to change
                    without notice. We reserve the right to correct pricing
                    errors. If a product is listed at an incorrect price, we may
                    cancel any orders for that product.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900">
                    3.3 Payment
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Payment must be received before your order is processed. We
                    accept major credit cards, debit cards, and other payment
                    methods as displayed on our website. By providing payment
                    information, you represent that you are authorized to use
                    the payment method.
                  </p>
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. Delivery
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  We strive to deliver your orders in a timely manner. However:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>You must provide accurate delivery information</li>
                  <li>Risk of loss passes to you upon delivery</li>
                  <li>
                    We are not responsible for delays caused by circumstances
                    beyond our control
                  </li>
                  <li>
                    Delivery fees may apply based on your location and order
                    size
                  </li>
                </ul>
              </div>

              {/* Returns and Refunds */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Returns and Refunds
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    We want you to be completely satisfied with your purchase.
                    Our return and refund policy includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                    <li>
                      Damaged or defective products may be returned within 7
                      days of delivery
                    </li>
                    <li>
                      Fresh and perishable items must be reported within 24
                      hours of delivery
                    </li>
                    <li>
                      Refunds will be processed to the original payment method
                    </li>
                    <li>
                      Please contact customer service to initiate a return
                    </li>
                  </ul>
                </div>
              </div>

              {/* Prohibited Activities */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Prohibited Activities
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  You may not use our website or services to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Engage in fraudulent activities</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Collect user data without consent</li>
                  <li>Interfere with the proper functioning of the website</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. Intellectual Property
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  All content on FreshCart, including text, graphics, logos,
                  images, and software, is the property of FreshCart or its
                  licensors and is protected by copyright, trademark, and other
                  intellectual property laws. You may not reproduce, distribute,
                  or create derivative works without our express written
                  permission.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, FreshCart shall not be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, or any loss of profits or revenues,
                  whether incurred directly or indirectly, or any loss of data,
                  use, goodwill, or other intangible losses resulting from your
                  use of our services.
                </p>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Governing Law
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance
                  with the laws of the State of New York, without regard to its
                  conflict of law provisions. Any disputes arising from these
                  Terms shall be resolved in the courts of New York.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. Contact Information
                </h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>
                    <strong>Email:</strong> legal@freshcart.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </li>
                  <li>
                    <strong>Address:</strong> 123 Fresh Street, Suite 100, New
                    York, NY 10001
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
