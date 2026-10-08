"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const densities = ["comfortable", "compact", "dense"] as const;

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState(() =>
    typeof window === "undefined" ? "comfortable" : (window.localStorage.getItem("verrum-density") ?? "comfortable")
  );

  useEffect(() => {
    document.documentElement.dataset.density = density;
    window.localStorage.setItem("verrum-density", density);
  }, [density]);

  function updateDensity(nextDensity: string) {
    setDensity(nextDensity);
  }

  return (
    <div className="space-y-6 rounded-md border bg-surface p-4">
      <section>
        <h2 className="text-sm font-semibold">Mode</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {["light", "dark", "system"].map((mode) => (
            <Button
              key={mode}
              variant={theme === mode ? "primary" : "secondary"}
              onClick={() => setTheme(mode)}
            >
              {mode}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold">Density</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {densities.map((item) => (
            <Button
              key={item}
              variant={density === item ? "primary" : "secondary"}
              onClick={() => updateDensity(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
