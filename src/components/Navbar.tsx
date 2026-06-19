"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-amber-400 text-xl font-playfair font-bold tracking-wider text-[#FAF3E0]">
              Terrazza di Sole
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#suites" className="nav-link text-sm tracking-wide">
              Suites
            </Link>
            <Link href="/#spa" className="nav-link text-sm tracking-wide">
              Spa
            </Link>
            <Link href="/#dining" className="nav-link text-sm tracking-wide">
              Dining
            </Link>
            <Link href="/#adventures" className="nav-link text-sm tracking-wide">
              Adventures
            </Link>
            {status === "authenticated" ? (
              <>
                {(session?.user as any)?.role === "admin" && (
                  <Link href="/admin" className="nav-link text-sm tracking-wide">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="nav-link text-sm tracking-wide">
                  Dashboard
                </Link>
                <Link href="/profile" className="nav-link text-sm tracking-wide">
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="nav-link text-sm tracking-wide cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link text-sm tracking-wide">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#C75B39] text-[#FAF3E0] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#C75B39]/90 transition-colors"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#FAF3E0] p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/#suites" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
              Suites
            </Link>
            <Link href="/#spa" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
              Spa
            </Link>
            <Link href="/#dining" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
              Dining
            </Link>
            <Link href="/#adventures" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
              Adventures
            </Link>
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/profile" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="block nav-link text-sm cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block nav-link text-sm" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block bg-[#C75B39] text-[#FAF3E0] px-4 py-2 rounded-lg text-sm font-medium text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
