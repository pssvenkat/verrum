import Link from "next/link";
import { ArrowRight, Database, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary font-semibold text-primary-foreground">
            V
          </span>
          <span className="text-lg font-semibold">Verrum</span>
        </div>
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-normal text-foreground">
            Machine data in. Decisions out.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Self-hosted fleet intelligence for equipment teams that need traceable facts, explicit rules,
            and evidence-backed decisions instead of another generic dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/overview">
                Open demo fleet <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 grid gap-4 border-t pt-8 md:grid-cols-3">
          {[
            ["Raw data preserved", "Every important number can trace back to source readings and raw payloads.", Database],
            ["Evidence first", "Decisions show calculations, assumptions, coverage, and missing data.", FileSearch],
            ["Tenant-safe by design", "The architecture starts with organization boundaries and server-side authorization.", ShieldCheck]
          ].map(([title, copy, Icon]) => (
            <div key={String(title)} className="rounded-md border bg-surface p-4">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-sm font-semibold">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
