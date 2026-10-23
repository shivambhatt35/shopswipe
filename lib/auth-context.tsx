"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "./types";
import { readJson, removeKey, writeJson } from "./storage";

type StoredAccount = User & { passwordHash?: string; salt?: string };

async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 100000, hash: "SHA-256" }, key, 256);
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, "0")).join("");
}

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  loginWithGoogle: () => void;
  loginWithApple: () => void;
  loginWithEmail: (input: {
    name?: string;
    email: string;
    password: string;
    mode: "signin" | "signup";
  }) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUser(readJson<User | null>("user", null));
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const persistUser = useCallback((next: User | null) => {
    setUser(next);
    if (next) writeJson("user", next);
    else removeKey("user");
  }, []);

  const loginWithGoogle = useCallback(() => {
    persistUser({
      id: "google-demo",
      name: "Alex Rivera",
      email: "alex@gmail.com",
      provider: "google",
    });
  }, [persistUser]);

  const loginWithApple = useCallback(() => {
    persistUser({
      id: "apple-demo",
      name: "Alex Rivera",
      email: "alex@icloud.com",
      provider: "apple",
    });
  }, [persistUser]);

  const loginWithEmail = useCallback(
    async ({
      name,
      email,
      password,
      mode,
    }: {
      name?: string;
      email: string;
      password: string;
      mode: "signin" | "signup";
    }) => {
      email = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
      if (password.length < 6) return "Use at least six characters for your demo password.";
      const accounts = readJson<StoredAccount[]>("accounts", []);
      const existing = accounts.find(
        (account) => account.email.toLowerCase() === email.trim().toLowerCase(),
      );

      if (mode === "signup") {
        if (existing) return "An account with that email already exists.";
        const salt = crypto.randomUUID();
        const passwordHash = await hashPassword(password, salt);
        const created: StoredAccount = {
          id: crypto.randomUUID(),
          name: name?.trim() || email.split("@")[0],
          email: email.trim(),
          provider: "email",
          passwordHash,
          salt,
        };
        writeJson("accounts", [...accounts, created]);
        persistUser({
          id: created.id,
          name: created.name,
          email: created.email,
          provider: "email",
        });
        return null;
      }

      if (!existing?.salt || existing.passwordHash !== await hashPassword(password, existing.salt)) {
        return "Email or password is incorrect.";
      }
      persistUser({
        id: existing.id,
        name: existing.name,
        email: existing.email,
        provider: "email",
      });
      return null;
    },
    [persistUser],
  );

  const logout = useCallback(() => {
    removeKey("session");
    persistUser(null);
  }, [persistUser]);

  const value = useMemo(
    () => ({
      user,
      ready,
      loginWithGoogle,
      loginWithApple,
      loginWithEmail,
      logout,
    }),
    [user, ready, loginWithGoogle, loginWithApple, loginWithEmail, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
