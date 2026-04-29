'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, Mail, Lock, User, Phone, AlertCircle, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, password }) });
      if (res.ok) router.push('/auth/login?registered=true');
      else { const d = await res.json(); setError(d.error || 'Registration failed'); }
    } catch { setError('Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-linen flex items-center justify-center px-4 py-12">
      <div className="fixed inset-0 bg-gradient-to-br from-mediterranean-deep via-mediterranean to-mediterranean-deep opacity-90" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8"><Link href="/" className="inline-flex items-center gap-2"><Sun className="w-8 h-8 text-lemon-gold" /><span className="font-heading text-2xl text-linen tracking-widest">Terrazza di Sole</span></Link></div>
        <div className="bg-linen rounded-2xl shadow-2xl p-8">
          <h1 className="font-heading text-3xl text-mediterranean-deep text-center mb-2">Join Us</h1>
          <p className="text-mediterranean/60 text-center mb-8">Create your account</p>
          {error && <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-3 flex items-center gap-2 mb-6"><AlertCircle className="w-4 h-4 text-terracotta shrink-0" /><span className="text-terracotta text-sm">{error}</span></div>}
          <form onSubmit={submit} className="space-y-4">
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Your name" required /></div></div>
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="your@email.com" required /></div></div>
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Phone (optional)</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="+39 ..." /></div></div>
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Min. 6 characters" required minLength={6} /></div></div>
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="Repeat password" required minLength={6} /></div></div>
            <button type="submit" disabled={loading} className="w-full bg-terracotta text-linen py-3.5 rounded-full tracking-wider uppercase text-sm font-medium disabled:opacity-60 hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}</button>
          </form>
          <p className="text-center text-mediterranean/60 text-sm mt-6">Already have an account? <Link href="/auth/login" className="text-terracotta hover:text-terracotta/80 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
