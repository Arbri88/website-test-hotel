"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  room?: {
    id: string;
    name: string;
    price: number;
  } | null;
}

const SAMPLE_ROOMS = [
  { id: "sample-1", name: "Lemon Grove Suite", price: 350 },
  { id: "sample-2", name: "Ceramic Terrace Room", price: 450 },
  { id: "sample-3", name: "Infinity Panorama Suite", price: 650 },
];

export default function BookingModal({ isOpen, onClose, room }: BookingModalProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(room?.id || SAMPLE_ROOMS[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<0 | 1>(0);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setError("");
      if (room) setSelectedRoom(room.id);
    }
  }, [isOpen, room]);

  const getRoom = () => {
    if (room) return room;
    return SAMPLE_ROOMS.find((r) => r.id === selectedRoom) || SAMPLE_ROOMS[0];
  };

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const n = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    return n > 0 ? n : 0;
  })();

  const totalPrice = nights * getRoom().price;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates");
      return;
    }
    if (nights === 0) {
      setError("Check-out must be after check-in");
      return;
    }
    setStep(1);
  };

  const handleBook = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: getRoom().id,
          checkIn,
          checkOut,
          guests,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Booking failed");
        return;
      }
      const booking = await res.json();
      router.push(`/payment?bookingId=${booking.id}&total=${booking.totalPrice}`);
      onClose();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="relative bg-[#FAF3E0] rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 0 ? "bg-[#C75B39] text-white" : "bg-gray-200"}`}>1</div>
          <div className={`flex-1 h-0.5 ${step >= 1 ? "bg-[#C75B39]" : "bg-gray-200"}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-[#C75B39] text-white" : "bg-gray-200"}`}>2</div>
        </div>

        {step === 0 ? (
          <>
            <h2 className="font-playfair text-2xl font-bold text-[#1A4B7A] mb-1">
              Reserve Your Stay
            </h2>
            <p className="text-[#C75B39] text-sm mb-6">Select your dates and preferred suite</p>

            <form onSubmit={handleContinue} className="space-y-4">
              {!room && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Suite</label>
                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent bg-white"
                  >
                    {SAMPLE_ROOMS.map((r) => (
                      <option key={r.id} value={r.id}>{r.name} — €{r.price}/night</option>
                    ))}
                  </select>
                </div>
              )}
              {room && <p className="text-sm text-gray-600 mb-2">{room.name} — €{room.price}/night</p>}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={today}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || today}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent bg-white"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#C75B39] text-[#FAF3E0] py-3 rounded-lg font-medium hover:bg-[#C75B39]/90 transition-all"
              >
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-playfair text-2xl font-bold text-[#1A4B7A] mb-1">
              Confirm Booking
            </h2>
            <div className="bg-[#1A4B7A]/5 rounded-lg p-4 space-y-2 mb-4">
              <p className="font-playfair text-lg text-[#1A4B7A]">{getRoom().name}</p>
              <p className="text-sm text-gray-600">{checkIn} → {checkOut} ({nights} nights)</p>
              <p className="text-sm text-gray-600">{guests} guests</p>
              <div className="border-t border-[#1A4B7A]/10 pt-2 mt-2">
                <p className="font-playfair text-xl font-bold text-[#1A4B7A]">€{totalPrice}</p>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleBook}
                disabled={loading}
                className="flex-1 bg-[#C75B39] text-[#FAF3E0] py-3 rounded-lg font-medium hover:bg-[#C75B39]/90 transition-all disabled:opacity-50"
              >
                {loading ? "Booking..." : session ? "Confirm & Pay" : "Sign In to Book"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
