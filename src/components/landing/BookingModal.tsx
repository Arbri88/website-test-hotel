'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Users, ChevronLeft, ChevronRight, Star, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const roomTypes = [
  { id: 'deluxe-sea', name: 'Deluxe Sea View', price: 450, desc: 'Panoramic terrace, king bed, Vietri ceramics' },
  { id: 'junior-suite', name: 'Junior Suite', price: 680, desc: 'Separate living area, infinity plunge pool' },
  { id: 'royal-terrace', name: 'Royal Terrace Suite', price: 950, desc: 'Private rooftop, outdoor jacuzzi, butler service' },
  { id: 'garden-villa', name: 'Garden Villa', price: 1200, desc: 'Lemon grove setting, two bedrooms, kitchen' },
];

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'dates' | 'room' | 'confirm'>('dates');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState<typeof roomTypes[0] | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const nights = () => {
    if (!checkIn || !checkOut) return 1;
    return Math.max(1, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
  };

  const handleBook = async () => {
    if (!session) { router.push('/auth/login?callbackUrl=/'); return; }
    setLoading(true);
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomType: room?.id, checkIn, checkOut, guests, totalPrice: room ? room.price * nights() : 0 }),
      });
      setConfirmed(true);
      setTimeout(onClose, 3000);
    } catch { /* handle */ } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-linen rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-mediterranean/10">
          <div><h2 className="font-heading text-2xl text-mediterranean-deep">Reserve Your Terrazza</h2><p className="text-mediterranean/60 text-sm mt-1">{step === 'dates' ? 'Choose your dates' : step === 'room' ? 'Select your suite' : 'Confirm your stay'}</p></div>
          <button onClick={onClose} className="p-2 hover:bg-mediterranean/5 rounded-full"><X className="w-5 h-5 text-mediterranean" /></button>
        </div>

        <div className="flex items-center justify-center gap-2 p-4">
          {['dates', 'room', 'confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === s ? 'bg-terracotta text-linen' : 'bg-mediterranean/10 text-mediterranean/40'}`}>{i + 1}</div>
              {i < 2 && <div className="w-12 h-px bg-mediterranean/20" />}
            </div>
          ))}
        </div>

        <div className="p-6">
          {step === 'dates' && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Check-in</label>
                  <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="date" value={checkIn} min={new Date().toISOString().split('T')[0]} onChange={(e) => setCheckIn(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" /></div>
                </div>
                <div>
                  <label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Check-out</label>
                  <div className="relative"><Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="date" value={checkOut} min={checkIn || new Date().toISOString().split('T')[0]} onChange={(e) => setCheckOut(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" /></div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Guests</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-2 rounded-lg border border-mediterranean/20 hover:bg-mediterranean/5"><ChevronLeft className="w-4 h-4" /></button>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4 text-mediterranean" /><span className="text-lg font-medium text-mediterranean-deep">{guests}</span></div>
                  <button onClick={() => setGuests(Math.min(8, guests + 1))} className="p-2 rounded-lg border border-mediterranean/20 hover:bg-mediterranean/5"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <button onClick={() => setStep('room')} disabled={!checkIn || !checkOut} className="w-full bg-terracotta text-linen py-3.5 rounded-full tracking-wider uppercase text-sm font-medium disabled:opacity-40 hover:bg-terracotta/90 transition-colors">Choose Your Suite</button>
            </div>
          )}

          {step === 'room' && (
            <div className="space-y-4">
              {roomTypes.map((r) => (
                <button key={r.id} onClick={() => setRoom(r)} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${room?.id === r.id ? 'border-terracotta bg-terracotta/5' : 'border-mediterranean/10 hover:border-mediterranean/30'}`}>
                  <div className="flex items-center justify-between">
                    <div><h3 className="font-heading text-lg text-mediterranean-deep">{r.name}</h3><p className="text-mediterranean/60 text-sm mt-1">{r.desc}</p></div>
                    <div className="text-right"><span className="text-2xl font-heading text-terracotta">€{r.price}</span><span className="text-mediterranean/40 text-sm block">per night</span></div>
                  </div>
                </button>
              ))}
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep('dates')} className="flex-1 py-3 rounded-full border border-mediterranean/20 text-mediterranean hover:bg-mediterranean/5 tracking-wider uppercase text-sm">Back</button>
                <button onClick={() => setStep('confirm')} disabled={!room} className="flex-1 bg-terracotta text-linen py-3 rounded-full tracking-wider uppercase text-sm font-medium disabled:opacity-40 hover:bg-terracotta/90 transition-colors">Continue</button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              {confirmed ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-leaf-green/10 rounded-full flex items-center justify-center"><Star className="w-8 h-8 text-leaf-green" fill="currentColor" /></div>
                  <h3 className="font-heading text-2xl text-mediterranean-deep mb-2">Booking Confirmed!</h3>
                  <p className="text-mediterranean/60">Your terrace awaits. Check your email for details.</p>
                </motion.div>
              ) : (
                <>
                  <div className="bg-white rounded-xl p-6 space-y-4">
                    <h3 className="font-heading text-xl text-mediterranean-deep">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                      {[['Suite', room?.name], ['Check-in', checkIn], ['Check-out', checkOut], ['Guests', String(guests)], ['Nights', String(nights())]].map(([l, v]) => (
                        <div key={l} className="flex justify-between"><span className="text-mediterranean/60">{l}</span><span className="font-medium text-mediterranean-deep">{v}</span></div>
                      ))}
                      <div className="border-t pt-3 flex justify-between"><span className="text-mediterranean-deep font-medium">Total</span><span className="text-2xl font-heading text-terracotta">€{room ? room.price * nights() : 0}</span></div>
                    </div>
                  </div>
                  <div className="bg-mediterranean/5 rounded-xl p-4 border border-mediterranean/10"><p className="text-sm text-mediterranean/70 text-center">🔒 Secure payment — <span className="text-terracotta">Demo mode</span></p></div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('room')} className="flex-1 py-3 rounded-full border border-mediterranean/20 text-mediterranean hover:bg-mediterranean/5 tracking-wider uppercase text-sm">Back</button>
                    <button onClick={handleBook} disabled={loading || !session} className="flex-1 bg-terracotta text-linen py-3 rounded-full tracking-wider uppercase text-sm font-medium disabled:opacity-40 hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : !session ? 'Sign in to Book' : 'Confirm Booking'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
