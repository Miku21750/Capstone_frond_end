import { Link } from "react-router";

import { Navigate, useNavigate } from "react-router";

export function Footer() {
    const navigate = useNavigate();
    return(
        <section className="bg-[#3B6790] text-white px-6 py-10 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Luminou§kin</h1>
            <p className="text-sm">Solusi digital inklusif untuk kesehatan kulit masyarakat Indonesia.</p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3">About</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Website
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/about#meetTeam" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3">Education</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/education" className="hover:text-gray-300">
                  Skin Disease Type
                </Link>
              </li>
              <li>
                <Link to="/education/treatment-option/over-the-counter" className="hover:text-gray-300">
                  Drug Recommendation
                </Link>
              </li>
              <li>
                <Link to="/education/prevention-tips/daily-skincare-routine" className="hover:text-gray-300">
                  Tips Health Skin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-3">Legal</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/terms" className="hover:text-gray-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookieterm" className="hover:text-gray-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    )
}