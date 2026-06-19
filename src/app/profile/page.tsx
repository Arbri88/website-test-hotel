"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookingCount {
  count: number;
}

interface FavoritesCount {
  count: number;
}

interface ReviewsCount {
  count: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchCounts() {
      try {
        const [bookingsRes, favsRes, reviewsRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/favorites"),
          fetch("/api/reviews"),
        ]);

        if (bookingsRes.ok) {
          const bookings: any[] = await bookingsRes.json();
          setBookingCount(bookings.length);
        }
        if (favsRes.ok) {
          const favs: any[] = await favsRes.json();
          setFavoritesCount(favs.length);
        }
        if (reviewsRes.ok) {
          const reviews: any[] = await reviewsRes.json();
          setReviewsCount(reviews.length);
        }
      } catch (err) {
        console.error("Error fetching counts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, [status]);

  async function handleSaveName() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/profile/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error("Error updating name:", err);
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1A4B7A] border-t-[#E8A435] mx-auto mb-4"></div>
          <p className="font-playfair text-xl text-[#1A4B7A]">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const quickLinks = [
    { label: "My Bookings", href: "/dashboard?tab=bookings", icon: "📅" },
    { label: "My Favorites", href: "/dashboard?tab=favorites", icon: "❤️" },
    { label: "My Reviews", href: "/dashboard?tab=reviews", icon: "⭐" },
    { label: "Browse Rooms", href: "/rooms", icon: "🏠" },
  ];

  if ((session.user as any)?.role === "admin") {
    quickLinks.push({ label: "Admin Panel", href: "/admin", icon: "⚙️" });
  }

  return (
    <div className="min-h-screen bg-[#FAF3E0] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#1A4B7A] text-[#FAF3E0] text-4xl font-playfair font-bold flex items-center justify-center mx-auto mb-4">
            {(session.user.name || "U")[0].toUpperCase()}
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#1A4B7A]">
            {session.user.name || "Guest"}
          </h1>
          <p className="text-gray-600 mt-1">{session.user.email}</p>
        </div>

        {/* Edit Name Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="font-playfair text-xl font-bold text-[#1A4B7A] mb-4">
            Edit Profile
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#E8A435] focus:border-transparent text-gray-900"
            />
            <button
              onClick={handleSaveName}
              disabled={saving || !name.trim()}
              className="bg-[#C75B39] text-[#FAF3E0] px-6 py-2.5 rounded-lg font-medium hover:bg-[#C75B39]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-playfair font-bold text-[#1A4B7A]">
              {bookingCount}
            </div>
            <div className="text-sm text-gray-600 mt-1">Bookings</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-playfair font-bold text-[#C75B39]">
              {favoritesCount}
            </div>
            <div className="text-sm text-gray-600 mt-1">Favorites</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 text-center">
            <div className="text-3xl font-playfair font-bold text-[#E8A435]">
              {reviewsCount}
            </div>
            <div className="text-sm text-gray-600 mt-1">Reviews</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-playfair text-xl font-bold text-[#1A4B7A] mb-4">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#E8A435] hover:bg-[#FAF3E0] transition-colors group"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#1A4B7A]">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
