'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Calendar, DollarSign, Loader2, ChevronRight, CheckCircle, XCircle, Clock, BarChart3, FileText, Users } from 'lucide-react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'overview' | 'bookings' | 'content'>('overview');

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') router.push('/');
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      Promise.all([fetch('/api/admin/bookings'), fetch('/api/admin/content')]).then(([b, c]) => {
        b.json().then(d => { setBookings(d.bookings); setStats(d.stats); });
      }).finally(() => setLoading(false));
    }
  }, [status]);

  const updateStatus = async (id: string, s: string) => {
    await fetch('/api/admin/bookings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: s }) });
    fetch('/api/admin/bookings').then(r => r.json()).then(d => { setBookings(d.bookings); setStats(d.stats); });
  };

  if (status === 'loading' || loading) return <div className="min-h-screen bg-linen flex items-center justify-center"><Loader2 className="w-8 h-8 text-terracotta animate-spin" /></div>;
  if (status === 'unauthenticated' || session?.user?.role !== 'admin') return null;

  const roomNames: Record<string, string> = { 'deluxe-sea': 'Deluxe Sea View', 'junior-suite': 'Junior Suite', 'royal-terrace': 'Royal Terrace Suite', 'garden-villa': 'Garden Villa' };
  const sc: Record<string, string> = { pending: 'bg-lemon-gold/20 text-lemon-gold', confirmed: 'bg-leaf-green/20 text-leaf-green', completed: 'bg-mediterranean/20 text-mediterranean', cancelled: 'bg-terracotta/20 text-terracotta' };

  return (
    <div className="min-h-screen bg-linen">
      <div className="bg-mediterranean-deep text-linen">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4"><Link href="/" className="flex items-center gap-2"><Sun className="w-6 h-6 text-lemon-gold" /><span className="font-heading text-lg tracking-widest">Terrazza</span></Link><span className="text-linen/30">|</span><span className="text-lemon-gold tracking-wider text-sm">Admin</span></div>
          <Link href="/profile" className="text-linen/70 hover:text-linen transition-colors text-sm">← Profile</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 border-b border-mediterranean/10">
          {[{ id: 'overview', label: 'Overview', icon: BarChart3 }, { id: 'bookings', label: 'Bookings', icon: Calendar }, { id: 'content', label: 'Content', icon: FileText }].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)} className={`flex items-center gap-2 px-4 py-3 text-sm tracking-wider uppercase border-b-2 transition-colors ${tab === t.id ? 'border-terracotta text-terracotta' : 'border-transparent text-mediterranean/50 hover:text-mediterranean'}`}><t.icon className="w-4 h-4" />{t.label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'overview' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{ label: 'Total Bookings', value: stats.total || 0, icon: Calendar, color: 'text-mediterranean-deep' }, { label: 'Pending', value: stats.pending || 0, icon: Clock, color: 'text-lemon-gold' }, { label: 'Confirmed', value: stats.confirmed || 0, icon: CheckCircle, color: 'text-leaf-green' }, { label: 'Revenue', value: `€${(stats.revenue || 0).toLocaleString()}`, icon: DollarSign, color: 'text-terracotta' }].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-mediterranean/60 text-sm">{s.label}</p><p className={`text-3xl font-heading ${s.color} mt-1`}>{s.value}</p></div><s.icon className="w-8 h-8 text-mediterranean/20" /></div></div>
              ))}
            </div>
            <div><h3 className="font-heading text-xl text-mediterranean-deep mb-4">Recent Bookings</h3>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {bookings.length === 0 ? <div className="p-8 text-center text-mediterranean/60">No bookings yet</div> : (
                  <table className="w-full"><thead className="bg-mediterranean/5"><tr><th className="text-left p-4 text-xs text-mediterranean/60 tracking-wider uppercase">Guest</th><th className="text-left p-4 text-xs text-mediterranean/60 tracking-wider uppercase">Room</th><th className="text-left p-4 text-xs text-mediterranean/60 tracking-wider uppercase">Dates</th><th className="text-left p-4 text-xs text-mediterranean/60 tracking-wider uppercase">Total</th><th className="text-left p-4 text-xs text-mediterranean/60 tracking-wider uppercase">Status</th></tr></thead>
                    <tbody>{bookings.slice(0, 10).map((b) => (
                      <tr key={b.id} className="border-t border-mediterranean/5"><td className="p-4 text-sm"><div className="font-medium text-mediterranean-deep">{b.user?.name || 'Unknown'}</div><div className="text-xs text-mediterranean/40">{b.user?.email}</div></td><td className="p-4 text-sm text-mediterranean-deep">{roomNames[b.roomType] || b.roomType}</td><td className="p-4 text-sm text-mediterranean/60">{new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}</td><td className="p-4 text-sm font-medium">€{b.totalPrice}</td><td className="p-4"><span className={`px-2 py-1 rounded-full text-xs tracking-wider uppercase ${sc[b.status] || ''}`}>{b.status}</span></td></tr>
                    ))}</tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-mediterranean/60">No bookings to manage</div> : bookings.map((b) => (
              <div key={b.id} className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between">
                <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-lg bg-mediterranean/5 flex items-center justify-center"><Users className="w-5 h-5 text-mediterranean" /></div>
                  <div><h4 className="font-medium text-mediterranean-deep">{roomNames[b.roomType] || b.roomType}</h4><p className="text-sm text-mediterranean/60 mt-1">{b.user?.name} ({b.user?.email})</p><p className="text-xs text-mediterranean/40 mt-1">{new Date(b.checkIn).toLocaleDateString()} — {new Date(b.checkOut).toLocaleDateString()} · {b.guests} guests · €{b.totalPrice}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  {b.status === 'pending' && (<><button onClick={() => updateStatus(b.id, 'confirmed')} className="p-2 rounded-lg bg-leaf-green/10 text-leaf-green hover:bg-leaf-green/20"><CheckCircle className="w-4 h-4" /></button><button onClick={() => updateStatus(b.id, 'cancelled')} className="p-2 rounded-lg bg-terracotta/10 text-terracotta hover:bg-terracotta/20"><XCircle className="w-4 h-4" /></button></>)}
                  <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase ${sc[b.status] || ''}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'content' && (
          <div className="bg-white rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 text-mediterranean/20 mx-auto mb-4" />
            <h3 className="font-heading text-xl text-mediterranean-deep mb-2">Content Management</h3>
            <p className="text-mediterranean/60">Landing page content is currently hardcoded. Dynamic content management coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
