'use client';

import { useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Loader2 } from 'lucide-react';

const CAPABILITIES = [
  {
    emoji: '📄',
    label: 'Document Intelligence',
    detail:
      'Upload contracts, briefs, and syllabi — query them like a seasoned expert.',
  },
  {
    emoji: '🔍',
    label: 'Semantic Search',
    detail:
      'Surface the exact clause, precedent, or concept across your entire library.',
  },
  {
    emoji: '💬',
    label: 'Cited Conversations',
    detail:
      'Ask nuanced questions; receive contextual answers with source references.',
  },
  {
    emoji: '📁',
    label: 'Knowledge Projects',
    detail:
      'Organise by case, matter, or course — full context always at hand.',
  },
];

/* ─────────────────────────────────────────────────────────── */

export function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` },
    });
    if (error) setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <LoginPanel loading={loading} onSignIn={handleGoogleSignIn} />
      <LandingPanel />
    </main>
  );
}

/* ── Login panel ──────────────────────────────────────────── */

interface LoginPanelProps {
  loading: boolean;
  onSignIn: () => void;
}

function LoginPanel({ loading, onSignIn }: LoginPanelProps) {
  return (
    <section className="relative flex flex-col items-center justify-center w-full lg:w-[420px] shrink-0 min-h-screen px-10 bg-[#F9F3E8]">
      {/* Right-edge separator */}
      <div className="hidden lg:block absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-brand-200 to-transparent" />

      {/* Subtle radial wash behind the card */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,rgba(212,184,150,0.18)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logomark + wordmark */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-2xl bg-brand-100/70 border border-brand-200/60 flex items-center justify-center shadow-sm">
            <Logo width={120} height={120} className="text-cognac" />
          </div>
          <div className="text-center">
            <span className="font-display text-[26px] font-bold tracking-[-0.03em] text-espresso block leading-none">
              contiq
            </span>
            <p className="text-[12px] text-umber/70 mt-1.5 tracking-[0.06em] uppercase font-medium">
              Document Intelligence
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl border border-brand-200/60 bg-white/55 backdrop-blur-md px-8 py-8 shadow-[0_2px_32px_rgba(92,61,30,0.08),0_0_0_1px_rgba(139,94,60,0.04)]">
          <div className="relative mb-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/70 px-3 text-[10px] uppercase tracking-[0.16em] text-umber/50 font-semibold">
                sign in to continue
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full gap-3 border-brand-200 hover:border-cognac hover:bg-brand-50/70 transition-all duration-200"
            disabled={loading}
            onClick={onSignIn}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-cognac" />
            ) : (
              <GoogleIcon />
            )}
            <span className="text-espresso font-medium text-sm">
              {loading ? 'Redirecting…' : 'Continue with Google'}
            </span>
          </Button>

          <p className="mt-5 text-center text-[11px] text-umber/45 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-umber/60 underline underline-offset-2 cursor-pointer hover:text-cognac transition-colors">
              Terms
            </span>{' '}
            &amp;{' '}
            <span className="text-umber/60 underline underline-offset-2 cursor-pointer hover:text-cognac transition-colors">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Audience chips */}
        <div className="mt-7 flex items-center gap-2 flex-wrap justify-center">
          <AudienceChip emoji="⚖️" label="Legal" />
          <AudienceChip emoji="🎓" label="Education" />
          <AudienceChip emoji="🔬" label="Research" />
        </div>
      </div>
    </section>
  );
}

/* ── Landing panel ────────────────────────────────────────── */

function LandingPanel() {
  return (
    <section className="hidden lg:flex flex-1 min-h-screen relative overflow-hidden flex-col justify-between px-16 py-14 bg-brand-800">
      {/* Layered warm glows */}
      <div className="absolute top-[-160px] right-[-80px] w-[560px] h-[560px] rounded-full bg-sienna/12 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-60px] w-[420px] h-[420px] rounded-full bg-cognac/10 blur-[100px] pointer-events-none" />

      {/* Faint cream grid */}
      <div
        className="absolute inset-0 opacity-[0.028] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,236,215,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,236,215,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top-right corner ornament */}
      <div className="absolute top-8 right-8 opacity-20">
        <CornerOrnament />
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-sienna/15 border border-sienna/20 rounded-full px-4 py-1.5 mb-10">
          <span className="text-sienna text-xs">✦</span>
          <span className="text-sand/80 text-[10px] font-semibold tracking-[0.18em] uppercase">
            AI-Powered Document Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[48px] leading-[1.08] font-bold text-cream mb-5 max-w-[460px]">
          Your documents,
          <br />
          finally{' '}
          <span className="text-sienna italic">intelligent</span>.
        </h1>

        {/* Subheading */}
        <p className="text-sand/70 text-[15px] leading-relaxed mb-12 max-w-[420px]">
          From legal contracts to academic syllabi — Contiq transforms static
          documents into a living, queryable knowledge base you can converse with.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 gap-4 max-w-[480px]">
          {CAPABILITIES.map((capability) => (
            <CapabilityCard key={capability.label} {...capability} />
          ))}
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="relative z-10 pt-8 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <p className="text-umber/60 text-[11px] tracking-[0.08em] uppercase font-medium">
            Built for professionals who handle complex documents daily
          </p>
          <div className="flex items-center gap-4 text-umber/40 text-[10px] tracking-widest uppercase">
            <span>Secure</span>
            <span className="w-px h-3 bg-umber/20" />
            <span>Private</span>
            <span className="w-px h-3 bg-umber/20" />
            <span>Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Capability card ──────────────────────────────────────── */

interface CapabilityCardProps {
  emoji: string;
  label: string;
  detail: string;
}

function CapabilityCard({ emoji, label, detail }: CapabilityCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.07] hover:border-cognac/25 transition-all duration-200 group">
      <div className="w-9 h-9 rounded-lg bg-cognac/20 border border-cognac/25 flex items-center justify-center text-lg group-hover:bg-cognac/30 transition-colors duration-200">
        {emoji}
      </div>
      <div>
        <p className="text-cream text-[13px] font-semibold mb-1 leading-snug">
          {label}
        </p>
        <p className="text-sand/55 text-[11px] leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

/* ── Audience chip ────────────────────────────────────────── */

function AudienceChip({ emoji, label }: { emoji: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-200/70 text-umber/65 text-[11px] font-medium bg-brand-50/40">
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}

/* ── Corner ornament ──────────────────────────────────────── */

function CornerOrnament() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M80 0 L80 80 M60 0 L60 80 M40 0 L40 80 M20 0 L20 80 M0 0 L80 0 M0 20 L80 20 M0 40 L80 40 M0 60 L80 60"
        stroke="#F5ECD7"
        strokeWidth="0.5"
        opacity="0.6"
      />
      <circle cx="40" cy="40" r="18" stroke="#C9832A" strokeWidth="0.8" strokeDasharray="3 5" />
      <circle cx="40" cy="40" r="8" stroke="#F5ECD7" strokeWidth="0.5" />
      <circle cx="40" cy="40" r="2" fill="#C9832A" opacity="0.7" />
    </svg>
  );
}

/* ── Google icon ──────────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
