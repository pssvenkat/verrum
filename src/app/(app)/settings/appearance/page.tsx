import { AppearanceForm } from "@/components/settings/appearance-form";
import { PageShell } from "@/components/layout/app-shell";

const tokenSwatches = [
  ["primary", "bg-primary"],
  ["success", "bg-success"],
  ["warning", "bg-warning"],
  ["danger", "bg-danger"]
];

export default function AppearancePage() {
  return (
    <PageShell
      title="Appearance"
      description="Modern Clean is implemented through semantic tokens so future themes can be added without rewriting components."
    >
      <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
        <AppearanceForm />
        <section className="rounded-md border bg-surface p-4">
          <h2 className="text-sm font-semibold">Theme architecture</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Components use semantic tokens such as background, surface, border, primary, success,
            warning, danger, and info. Density changes adjust table row and control rhythm across
            the operational screens.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {tokenSwatches.map(([token, colorClass]) => (
              <div key={token} className="rounded-md border p-3">
                <div className={`h-8 rounded ${colorClass}`} />
                <div className="mt-2 text-xs font-medium">{token}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
