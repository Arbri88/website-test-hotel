'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sun, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const callback = search.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) setError('Invalid email or password');
      else { router.push(callback); router.refresh(); }
    } catch { setError('Something went wrong'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-linen flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-gradient-to-br from-mediterranean-deep via-mediterranean to-mediterranean-deep opacity-90" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8"><Link href="/" className="inline-flex items-center gap-2"><Sun className="w-8 h-8 text-lemon-gold" /><span className="font-heading text-2xl text-linen tracking-widest">Terrazza di Sole</span></Link></div>
        <div className="bg-linen rounded-2xl shadow-2xl p-8">
          <h1 className="font-heading text-3xl text-mediterranean-deep text-center mb-2">Welcome Back</h1>
          <p className="text-mediterranean/60 text-center mb-8">Sign in to manage your bookings</p>
          {error && <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-3 flex items-center gap-2 mb-6"><AlertCircle className="w-4 h-4 text-terracotta shrink-0" /><span className="text-terracotta text-sm">{error}</span></div>}
          <form onSubmit={submit} className="space-y-5">
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="your@email.com" required /></div></div>
            <div><label className="block text-sm text-mediterranean/70 mb-2 tracking-wider uppercase">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mediterranean/40" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-mediterranean/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30" placeholder="••••••••" required minLength={6} /></div></div>
            <button type="submit" disabled={loading} className="w-full bg-terracotta text-linen py-3.5 rounded-full tracking-wider uppercase text-sm font-medium disabled:opacity-60 hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}</button>
          </form>
          <p className="text-center text-mediterranean/60 text-sm mt-6">Don't have an account? <Link href="/auth/register" className="text-terracotta hover:text-terracotta/80 font-medium">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-linen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
