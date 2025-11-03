import Link from 'next/link'
export default function PricingPage() {
  return (
    <section className="pricing-section bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Find the plan that’s right for you</h1>
        <div className="flex justify-end mb-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            title="Back to Home"
            aria-label="Back to Home"
          >
            Back to Home
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="plan-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-900">Free</h2>
            <p className="text-gray-600 mt-2">For individuals or very small teams just getting started.</p>
            <div className="price text-3xl font-bold text-green-600 mt-4">Free</div>
            <Link
              href="/auth/signup?plan=free"
              className="w-full inline-flex justify-center mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium"
              title="Choose Free"
              aria-label="Choose Free"
            >
              Choose Free
            </Link>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>Unlimited bases</li>
              <li>1,000 records per base</li>
              <li>Up to 5 editors</li>
              <li>1 GB attachments per base</li>
              <li>100 automation runs</li>
              <li>Interface Designer</li>
            </ul>
          </div>

          <div className="plan-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1 border-2 border-green-600">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Team</h2>
              <span className="text-xs font-semibold text-white bg-green-600 px-2.5 py-1 rounded-full">Most Popular</span>
            </div>
            <p className="text-gray-600 mt-2">For teams building apps to collaborate on shared workflows.</p>
            <div className="price text-3xl font-bold text-green-600 mt-4">$20 <span className="text-base font-medium text-gray-500">/seat/month</span></div>
            <small className="text-gray-500">billed annually</small>
            <Link
              href="/auth/signup?plan=team"
              className="w-full inline-flex justify-center mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium"
              title="Choose Team"
              aria-label="Choose Team"
            >
              Choose Team
            </Link>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>50,000 records per base</li>
              <li>25,000 automation runs</li>
              <li>20 GB attachments per base</li>
              <li>Standard sync integrations</li>
              <li>Extensions, Gantt, Timeline views</li>
            </ul>
          </div>

          <div className="plan-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-900">Business</h2>
            <p className="text-gray-600 mt-2">For departments needing advanced features and administration.</p>
            <div className="price text-3xl font-bold text-green-600 mt-4">$45 <span className="text-base font-medium text-gray-500">/seat/month</span></div>
            <small className="text-gray-500">billed annually</small>
            <Link
              href="/auth/signup?plan=business"
              className="w-full inline-flex justify-center mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium"
              title="Choose Business"
              aria-label="Choose Business"
            >
              Choose Business
            </Link>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>125,000 records per base</li>
              <li>100 GB attachments per base</li>
              <li>Premium sync integrations</li>
              <li>Verified data & two-way sync</li>
              <li>Admin panel &amp; SSO</li>
            </ul>
          </div>

          <div className="plan-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-gray-900">Enterprise Scale</h2>
            <p className="text-gray-600 mt-2">For organizations needing scalability and governance.</p>
            <div className="price text-3xl font-bold text-green-600 mt-4">Custom pricing</div>
            <Link
              href="/contact"
              className="w-full inline-flex justify-center mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 font-medium"
              title="Contact Sales"
              aria-label="Contact Sales"
            >
              Contact Sales
            </Link>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li>500,000 records per base</li>
              <li>1,000 GB attachments per base</li>
              <li>Enterprise Hub &amp; HyperDB</li>
              <li>Enhanced security controls</li>
              <li>Audit logs and DLP</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
