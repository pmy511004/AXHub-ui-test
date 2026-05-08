"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "axhub-dark-mode";

function applyClass(value: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark-mode", value);
}

export function useDarkMode(): [boolean, (value: boolean) => void] {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "true";
    setDarkModeState(stored);
    applyClass(stored);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue === "true";
      setDarkModeState(next);
      applyClass(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    }
    applyClass(value);
  };

  return [darkMode, setDarkMode];
}
