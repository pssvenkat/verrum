"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedDensity = window.localStorage.getItem("verrum-density") ?? "comfortable";
    document.documentElement.dataset.density = storedDensity;
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem storageKey="verrum-mode">
      {children}
    </NextThemesProvider>
  );
}
