'use client'

import { useState } from 'react'
import { createClient } from '@/libs/supabase/client'
import { Button } from '@/components/Button'
import { Loader2 } from 'lucide-react'

export function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
    if (error) setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {/* Decorative background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-600) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-600) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative flex flex-col items-center w-full max-w-[380px]">
        {/* Floating logomark — bleeds above card */}
        <div className="relative z-10 mb-[-1px]">
          <LogoMark />
        </div>

        {/* Card */}
        <div
          className="w-full rounded-2xl border border-brand-200/50 bg-white/75 backdrop-blur-xl px-8 pt-10 pb-8 shadow-[0_2px_48px_rgba(124,58,237,0.10),0_0_0_1px_rgba(124,58,237,0.04)]"
        >
          {/* Wordmark */}
          <div className="text-center mb-1">
            <span
              className="text-[28px] font-semibold tracking-[-0.04em] text-gray-900"
              style={{ fontFamily: 'var(--font-sans, inherit)' }}
            >
              contiq
            </span>
          </div>

          {/* Tagline */}
          <p className="text-center text-[13px] text-gray-400 tracking-wide mb-8">
            Your intelligent document workspace
          </p>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/75 px-3 text-[11px] uppercase tracking-[0.12em] text-gray-300 font-medium">
                sign in to continue
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full gap-3 border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
            disabled={loading}
            onClick={handleGoogleSignIn}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
            ) : (
              <GoogleIcon />
            )}
            <span className="text-gray-700 font-medium">
              {loading ? 'Redirecting…' : 'Continue with Google'}
            </span>
          </Button>

          {/* Footer note */}
          <p className="mt-6 text-center text-[11px] text-gray-300 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-gray-400 underline underline-offset-2 cursor-pointer hover:text-brand-500 transition-colors">
              Terms
            </span>{' '}
            and{' '}
            <span className="text-gray-400 underline underline-offset-2 cursor-pointer hover:text-brand-500 transition-colors">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}

/* ─── Sub-components ─────────────────────────────────────── */

function LogoMark() {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_16px_rgba(124,58,237,0.3)]"
        style={{ animation: 'spin-slow 18s linear infinite' }}
      >
        <style>{`
          @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        {/* Outer ring — dashed */}
        <circle
          cx="32" cy="32" r="28"
          stroke="#c4b5fd"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {/* Middle ring */}
        <circle
          cx="32" cy="32" r="20"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
          style={{ animation: 'spin-slow 12s linear infinite reverse' }}
        />
        {/* Core dot */}
        <circle cx="32" cy="32" r="6" fill="#7c3aed" opacity="0.9" />
        <circle cx="32" cy="32" r="3" fill="white" opacity="0.95" />
      </svg>
    </div>
  )
}

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
  )
}
