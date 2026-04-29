'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Calendar, Heart, LogOut, User, Mail, ChevronRight, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login?callbackUrl=/profile');
    if (status === 'authenticated') {
      fetch('/api/bookings').then(r => r.json()).then(d => { setBookings(d.bookings || []); setFavorites(d.favorites || []); }).finally(() => setLoading(false));
    }
  }, [status]);

  if (status === 'loading' || loading) return <div className="min-h-screen bg-linen flex items-center justify-center"><Loader2 className="w-8 h-8 text-terracotta animate-spin" /></div>;
  if (!session) return null;

  const statusColors: Record<string, string> = { pending: 'bg-lemon-gold/20 text-lemon-gold', confirmed: 'bg-leaf-green/20 text-leaf-green', completed: 'bg-mediterranean/20 text-mediterranean', cancelled: 'bg-terracotta/20 text-terracotta' };
  const roomNames: Record<string, string> = { 'deluxe-sea': 'Deluxe Sea View', 'junior-suite': 'Junior Suite', 'royal-terrace': 'Royal Terrace Suite', 'garden-villa': 'Garden Villa' };

  return (
    <div className="min-h-screen bg-linen">
      <div className="bg-mediterranean-deep text-linen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2"><Sun className="w-6 h-6 text-lemon-gold" /><span className="font-heading text-lg tracking-widest">Terrazza</span></Link>
            <button onClick={() => signOut()} className="flex items-center gap-2 text-linen/70 hover:text-linen transition-colors"><LogOut className="w-4 h-4" /><span className="text-sm">Sign out</span></button>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-terracotta/20 flex items-center justify-center"><User className="w-10 h-10 text-terracotta" /></div>
            <div>
              <h1 className="font-heading text-3xl">{session.user?.name || 'Guest'}</h1>
              <p className="text-linen/60 mt-1 flex items-center gap-4"><span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {session.user?.email}</span></p>
              <span className="inline-block mt-2 px-3 py-1 bg-lemon-gold/20 text-lemon-gold text-xs tracking-wider uppercase rounded-full">{session.user?.role === 'admin' ? 'Administrator' : 'Guest'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h2 className="font-heading text-2xl text-mediterranean-deep mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-terracotta" /> My Bookings</h2>
          {bookings.length === 0 ? <div className="bg-white rounded-xl p-8 text-center"><p className="text-mediterranean/60">No bookings yet.</p><Link href="/" className="text-terracotta hover:text-terracotta/80 font-medium mt-2 inline-block">Reserve your terrace →</Link></div> : (
            <div className="space-y-3">{bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-lg bg-mediterranean/5 flex items-center justify-center"><Calendar className="w-5 h-5 text-mediterranean" /></div>
                  <div><h3 className="font-medium text-mediterranean-deep">{roomNames[b.roomType] || b.roomType}</h3><p className="text-sm text-mediterranean/60 mt-1">{new Date(b.checkIn).toLocaleDateString()} — {new Date(b.checkOut).toLocaleDateString()}</p><p className="text-xs text-mediterranean/40 mt-1">{b.guests} guests · €{b.totalPrice}</p></div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase ${statusColors[b.status] || ''}`}>{b.status}</span>
              </div>
            ))}</div>
          )}
        </div>

        <div>
          <h2 className="font-heading text-2xl text-mediterranean-deep mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-terracotta" /> Saved Favorites</h2>
          {favorites.length === 0 ? <div className="bg-white rounded-xl p-8 text-center"><p className="text-mediterranean/60">No favorites saved yet.</p></div> : (
            <div className="grid sm:grid-cols-2 gap-3">{favorites.map((f) => (
              <div key={f.id} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm"><Heart className="w-4 h-4 text-terracotta" fill="currentColor" /><span className="font-medium text-mediterranean-deep">{roomNames[f.roomType] || f.roomType}</span></div>
            ))}</div>
          )}
        </div>

        {session.user?.role === 'admin' && (
          <Link href="/admin" className="block bg-mediterranean-deep text-linen rounded-xl p-5 hover:bg-mediterranean transition-colors">
            <div className="flex items-center justify-between"><div><h3 className="font-heading text-lg">Admin Dashboard</h3><p className="text-linen/60 text-sm">Manage bookings, content, and users</p></div><ChevronRight className="w-5 h-5" /></div>
          </Link>
        )}
      </div>
    </div>
  );
}
