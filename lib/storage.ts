const prefix = "shopswipe";

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(`${prefix}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${prefix}:${key}`, JSON.stringify(value));
}

export function removeKey(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${prefix}:${key}`);
}
