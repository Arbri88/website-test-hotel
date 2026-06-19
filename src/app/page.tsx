"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BookingModal from "@/components/BookingModal";

const features = [
  {
    id: "suites",
    title: "Cliffside Suites",
    subtitle: "Your private sky lounge above the sea",
    description:
      "Wake to the Mediterranean stretching endlessly beyond your private balcony. Each suite features floor-to-ceiling windows, hand-painted Vietri ceramic details, and furnishings crafted from local lemon wood.",
    details: [
      "Private balcony with panoramic sea views",
      "Hand-painted Vietri ceramic bathrooms",
      "King beds with Italian linen",
      "Complimentary Aperol Spritz at sunset",
    ],
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&h=800&fit=crop",
  },
  {
    id: "spa",
    title: "Limonaia Spa",
    subtitle: "Where lemon groves meet deep relaxation",
    description:
      "Nestled within a converted 18th-century lemon house, our spa channels centuries of Mediterranean wellness tradition. Treatments blend locally harvested lemon and olive essences with ancient techniques.",
    details: [
      "Lemon & olive oil body treatments",
      "18th-century stone architecture",
      "Sea-view relaxation terrace",
      "Artisan herbal tea bar",
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&h=800&fit=crop",
  },
  {
    id: "dining",
    title: "Cucina della Costa",
    subtitle: "The sea is our pantry, tradition is our guide",
    description:
      "Our Michelin-adjacent tasting menus celebrate the Amalfi Coast's extraordinary terroir. Hand-caught seafood arrives from fishermen you'll meet on the harbor. Heirloom tomatoes from terraced hillside gardens.",
    details: [
      "Seven-course seasonal tasting menu",
      "Hand-caught daily seafood",
      "Heirloom produce from local terraces",
      "Natural wines from volcanic slopes",
    ],
    image: "https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=1200&h=800&fit=crop",
  },
  {
    id: "adventures",
    title: "Sentiero degli Dei",
    subtitle: "Walk where the gods once roamed",
    description:
      "The legendary Path of the Gods traces the Amalfi coastline 600 meters above the sea. Our guided hikes reveal hidden wildflower meadows, ancient shepherd huts, and breathtaking viewpoints.",
    details: [
      "Expert local guides",
      "Gourmet picnic with regional specialties",
      "Hidden viewpoints off the beaten trail",
      "Photography stops at golden hour",
    ],
    image: "https://images.unsplash.com/photo-1534113414509-8eec48573341?w=1200&h=800&fit=crop",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = features.map((f) => document.getElementById(f.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-transition">
      {/* ===== HERO ===== */}
      <section className="relative h-screen overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-golden-hour" style={{
          background: "linear-gradient(135deg, #1A4B7A 0%, #2a6ba8 25%, #E8A435 50%, #f0c56d 75%, #C75B39 100%)",
          backgroundSize: "400% 400%",
        }} />

        {/* Ken Burns still — graceful motion fallback behind the video */}
        <div
          className="absolute inset-0 animate-ken-burns"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1534113414509-8eec48573341?w=1920&h=1080&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6) saturate(1.3)",
          }}
        />

        {/* Full-bleed looping drone video — autoplays muted; falls back to poster/still if the file is absent */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1534113414509-8eec48573341?w=1920&h=1080&fit=crop"
          style={{ filter: "brightness(0.62) saturate(1.25)" }}
        >
          <source src="/videos/terrazza-hero.mp4" type="video/mp4" />
          <source src="/videos/terrazza-hero.webm" type="video/webm" />
        </video>

        {/* Cinematic scrim for headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Golden hour light overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 70% 80%, rgba(232,164,53,0.35) 0%, transparent 55%)",
        }} />

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1
            className="font-playfair text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#FAF3E0] tracking-wider mb-4"
            style={{ letterSpacing: "0.08em", textShadow: "0 2px 30px rgba(250,243,224,0.5), 0 4px 60px rgba(232,164,53,0.2)" }}
          >
            Terrazza di Sole
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-[#FAF3E0]/90 tracking-wide mb-2 italic">
            La dolce vita, elevated.
          </p>
          <div className="w-24 h-px bg-[#E8A435] my-6" />
          <p className="font-sans text-sm sm:text-base text-[#FAF3E0]/70 max-w-lg mb-10">
            A boutique cliffside hotel perched above the Amalfi Coast, where golden hour lasts all day
            and every view feels like a Renaissance painting.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="btn-reserve bg-[#C75B39] text-[#FAF3E0] font-sans text-lg px-10 py-4 rounded-full font-medium tracking-wide"
          >
            Reserve Your Terrazza
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-[#FAF3E0]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>

        {/* Nav dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-3">
          {features.map((f, i) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeSection ? "bg-[#E8A435] scale-150" : "bg-[#FAF3E0]/40"
              }`}
              aria-label={f.title}
            />
          ))}
        </div>
      </section>

      {/* ===== FEATURE SECTIONS ===== */}
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={feature.id}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
            {/* Image side with Ken Burns */}
            <div className={`relative order-1 ${index % 2 === 1 ? "lg:order-2" : ""} overflow-hidden`}>
              <div
                className="absolute inset-0 animate-ken-burns bg-cover bg-center"
                style={{ backgroundImage: `url(${feature.image})` }}
              />
              <div className="absolute inset-0" style={{
                background: index % 2 === 0
                  ? "linear-gradient(to right, transparent 60%, var(--sun-bleached-linen) 100%)"
                  : "linear-gradient(to left, transparent 60%, var(--sun-bleached-linen) 100%)",
              }} />
            </div>

            {/* Text side with parallax */}
            <div className={`relative order-2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="text-[#C75B39] font-sans text-sm tracking-widest uppercase mb-2">{feature.subtitle}</p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1A4B7A] mb-6">{feature.title}</h2>
              <p className="font-sans text-lg text-gray-600 leading-relaxed mb-8 max-w-md">{feature.description}</p>
              <ul className="space-y-3 mb-8">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8A435] flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setBookingOpen(true)}
                className="btn-reserve self-start bg-[#C75B39] text-[#FAF3E0] font-sans px-8 py-3 rounded-full font-medium tracking-wide"
              >
                Book This Experience
              </button>
            </div>
          </div>
        </section>
      ))}

      {/* ===== MOBILE SWIPEABLE CARDS ===== */}
      <section className="lg:hidden py-16 px-4">
        <h2 className="font-playfair text-3xl font-bold text-[#1A4B7A] text-center mb-8">Experiences</h2>
        <div className="feature-cards flex gap-4 overflow-x-auto pb-4 px-2">
          {features.map((f) => (
            <div key={f.id} className="feature-card flex-shrink-0 w-80 rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${f.image})` }} />
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-[#1A4B7A] mb-2">{f.title}</h3>
                <p className="font-sans text-sm text-gray-600 line-clamp-3">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BOOKING MODAL ===== */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
