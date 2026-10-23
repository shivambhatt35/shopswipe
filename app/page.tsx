"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, loginWithApple, loginWithEmail } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const message = await loginWithEmail({ name, email, password, mode });
      setError(message);
      if (!message) router.push("/discover");
    } catch {
      setError("Unable to sign in. Check that browser storage is enabled and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-10">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
        ShopSwipe
      </p>
      <h1 className="mt-3 font-serif text-5xl leading-[0.95]">
        Tinder for things you might actually buy.
      </h1>
      <p className="mt-4 text-[var(--muted)]">
        Swipe a catalog. Keep the likes. Super-like a piece to compare Amazon,
        Walmart, Zara and the rest.
      </p>

      <div className="mt-8 rounded-3xl border border-black/8 bg-white p-4 shadow-[0_20px_50px_rgba(40,24,12,0.08)]">
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          One-tap sign in
        </p>
        <button
          type="button"
          onClick={() => {
            loginWithGoogle();
            router.push("/discover");
          }}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium"
        >
          <GoogleMark />
          Continue with Google
        </button>
        <button
          type="button"
          onClick={() => {
            loginWithApple();
            router.push("/discover");
          }}
          className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--ink)] px-4 py-3 text-sm font-medium text-[var(--paper)]"
        >
          Continue with Apple
        </button>
        <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
          Google One Tap is mocked for this demo. Plug in a Google client ID
          later to use real accounts. Apple and email are also local demo accounts; use a throwaway password.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-5 space-y-3 rounded-3xl border border-black/8 bg-white p-4"
      >
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={mode === "signin" ? "font-semibold" : "text-[var(--muted)]"}
          >
            Email login
          </button>
          <span className="text-[var(--muted)]">/</span>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={mode === "signup" ? "font-semibold" : "text-[var(--muted)]"}
          >
            Create account
          </button>
        </div>
        {mode === "signup" ? (
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Name"
            autoComplete="name"
            placeholder="Name"
            className="w-full rounded-2xl bg-black/4 px-4 py-3 outline-none"
          />
        ) : null}
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email"
          autoComplete="email"
          placeholder="Email"
          className="w-full rounded-2xl bg-black/4 px-4 py-3 outline-none"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-label="Password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="Password"
          className="w-full rounded-2xl bg-black/4 px-4 py-3 outline-none"
        />
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-2xl bg-[var(--terracotta)] py-3 text-sm font-medium text-white"
        >
          {busy ? "Signing in…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.8-6.6 7.4l6.3 5.3C38.2 37.3 44 32 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
