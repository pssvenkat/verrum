import Link from "next/link";
import { Bell, Building2, Command, Gauge, GitBranch, Home, Settings, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Overview", href: "/overview", icon: Home },
  { label: "Decisions", href: "/decisions", icon: GitBranch },
  { label: "Machines", href: "/machines", icon: Wrench },
  { label: "Telemetry", href: "/telemetry", icon: Gauge },
  { label: "Integrations", href: "/integrations", icon: Building2 },
  { label: "Settings", href: "/settings/appearance", icon: Settings }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-surface lg:block">
        <div className="flex h-16 items-center border-b px-5">
          <Link href="/overview" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
              V
            </span>
            <span>
              <span className="block text-sm font-semibold">Verrum</span>
              <span className="block text-xs text-muted-foreground">Machine data in. Decisions out.</span>
            </span>
          </Link>
        </div>
        <nav className="space-y-1 p-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-surface/95 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm">
              <Building2 className="h-4 w-4" />
              Demo Construction Co.
            </Button>
            <Button variant="ghost" size="sm">
              Last 30 covered days
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" aria-label="Command palette">
              <Command className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-full border bg-surface-muted" aria-label="User menu" />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export function PageShell({
  title,
  description,
  actions,
  children
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6 flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
