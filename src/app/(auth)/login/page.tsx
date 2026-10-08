import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-4">
      <section className="w-full max-w-md rounded-md border bg-surface p-6 shadow-raised">
        <div className="mb-6">
          <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-primary font-semibold text-primary-foreground">
            V
          </div>
          <h1 className="text-2xl font-semibold">Sign in to Verrum</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Demo access is available while the production authentication boundary is being wired.
          </p>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input className="mt-1 h-10 w-full rounded-md border bg-background px-3" defaultValue="demo@verrum.local" />
          </label>
          <label className="block text-sm font-medium">
            Access code
            <input className="mt-1 h-10 w-full rounded-md border bg-background px-3" defaultValue="DEMO-ACCESS" />
          </label>
          <Button asChild variant="primary" className="w-full">
            <Link href="/overview">Enter demo environment</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
