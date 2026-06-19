"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";
  const total = searchParams.get("total") || "0";

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cardNumber.replace(/\s/g, "").length < 16) { setError("Invalid card number"); return; }
    if (expiry.length < 5) { setError("Invalid expiry"); return; }
    if (cvc.length < 3) { setError("Invalid CVC"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, total: parseFloat(total) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Payment failed"); return; }
      setSuccess(true);
    } catch {
      setError("Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #1A4B7A 0%, #E8A435 100%)" }}>
        <div className="bg-[#FAF3E0] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#5A8F6E] flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-[#1A4B7A] mb-2">Pagamento Completato!</h1>
          <p className="text-gray-600 mb-6">Your booking has been confirmed. A confirmation email is on its way.</p>
          <p className="font-playfair text-xl text-[#C75B39] mb-6">Booking ID: {bookingId}</p>
          <button onClick={() => router.push("/dashboard")} className="bg-[#C75B39] text-[#FAF3E0] px-8 py-3 rounded-full font-medium hover:bg-[#C75B39]/90 transition-all">
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "linear-gradient(135deg, #1A4B7A 0%, #E8A435 100%)" }}>
      <div className="bg-[#FAF3E0] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="font-playfair text-3xl font-bold text-[#1A4B7A] text-center mb-1">Secure Payment</h1>
        <p className="text-[#C75B39] text-sm text-center mb-6">Complete your reservation</p>

        <div className="bg-[#1A4B7A]/5 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">Booking ID: <span className="font-mono text-[#1A4B7A]">{bookingId}</span></p>
          <p className="font-playfair text-2xl font-bold text-[#1A4B7A] mt-1">€{parseFloat(total).toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" required maxLength={19}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
              <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" required maxLength={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input type="text" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" required maxLength={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent font-mono" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name on card" required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E8A435] focus:border-transparent" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-[#C75B39] text-[#FAF3E0] py-3 rounded-lg font-medium hover:bg-[#C75B39]/90 transition-all disabled:opacity-50">
            {loading ? "Processing..." : `Pay €${parseFloat(total).toFixed(2)}`}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">This is a placeholder payment form. No real charges will be made.</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
}
