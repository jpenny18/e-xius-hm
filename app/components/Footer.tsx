import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Personal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Personal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Accounts
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Savings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Trading
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                  Wallet
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-600 hover:text-primary transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-600 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help-center" className="text-gray-600 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/security-status" className="text-gray-600 hover:text-primary transition-colors">
                  Security Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-600 leading-relaxed">
            All or part of the Exius Services, some features thereof, or some Digital Assets, are
            not available in certain jurisdictions, including where restrictions or limitations may
            apply, as indicated on the Exius Platform and in the relevant general terms and
            conditions. While the nature of digital assets is unique, and when considering digital
            assets in the context of wealth enhancement, any such reference is for a general
            understanding of Exius&apos;s offerings. Materials related to Exius&apos;s services should not be
            treated as a guarantee of future results or as financial advice. When terms such as &quot;up
            to&quot; or &quot;from&quot; are used to denote limits, achieving these maximum or minimum thresholds
            may be conditional on additional actions or fulfilment of certain criteria and
            requirements that may not be attainable by all clients. This material is for general
            information purposes only and is not intended to provide and should not be relied on for
            tax, legal or accounting advice. You should consult a qualified professional, as this
            material is not tailored to your specific circumstances. When referencing digital assets
            as potential investments, any similarities with the traditional concept of investments
            are entirely circumstantial, therefore any parallels between them should not be
            interpreted as deliberate or intended.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">&copy; 2026 Exius. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
