import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A4B7A] text-[#FAF3E0]">
      {/* Coastal map SVG illustration */}
      <div className="relative h-32 overflow-hidden opacity-40">
        <svg
          viewBox="0 0 1200 128"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coastline */}
          <path
            d="M0 80 Q100 60, 200 70 Q300 80, 400 50 Q500 20, 600 40 Q700 60, 800 30 Q900 10, 1000 40 Q1100 70, 1200 50 L1200 128 L0 128 Z"
            fill="#E8A435"
            opacity="0.3"
          />
          {/* Cliff formations */}
          <path d="M100 70 L120 30 L140 70" stroke="#E8A435" strokeWidth="2" opacity="0.5" />
          <path d="M400 50 L420 20 L440 50" stroke="#E8A435" strokeWidth="2" opacity="0.5" />
          <path d="M700 40 L715 15 L730 40" stroke="#E8A435" strokeWidth="2" opacity="0.5" />
          {/* Lighthouse */}
          <rect x="880" y="20" width="8" height="30" fill="#C75B39" opacity="0.6" />
          <circle cx="884" cy="18" r="6" fill="#E8A435" opacity="0.8" />
          {/* Sailboats */}
          <path d="M300 90 L310 75 L320 90 Z" stroke="#FAF3E0" strokeWidth="1" opacity="0.4" />
          <path d="M650 85 L658 70 L666 85 Z" stroke="#FAF3E0" strokeWidth="1" opacity="0.4" />
          {/* Sun */}
          <circle cx="1050" cy="30" r="20" fill="#E8A435" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-[#E8A435] mb-3">
              Terrazza di Sole
            </h3>
            <p className="text-sm text-[#FAF3E0]/70">
              La dolce vita, elevated.
            </p>
            <p className="text-sm text-[#FAF3E0]/70 mt-2">
              Amalfi Coast, Italy
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#E8A435] mb-3 text-sm tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#suites" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Cliffside Suites
                </Link>
              </li>
              <li>
                <Link href="/#spa" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Limonaia Spa
                </Link>
              </li>
              <li>
                <Link href="/#dining" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Cucina della Costa
                </Link>
              </li>
              <li>
                <Link href="/#adventures" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Sentiero degli Dei
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#E8A435] mb-3 text-sm tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF3E0]/70">
              <li>Via della Concordia, 8</li>
              <li>84011 Amalfi SA, Italy</li>
              <li>+39 089 871 234</li>
              <li>info@terrazzadisole.com</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-[#E8A435] mb-3 text-sm tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#FAF3E0]/70 hover:text-[#E8A435] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#FAF3E0]/10 text-center text-sm text-[#FAF3E0]/50">
          &copy; {new Date().getFullYear()} Terrazza di Sole. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
