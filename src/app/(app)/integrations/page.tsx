import { Database, RefreshCcw } from "lucide-react";
import { PageShell } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const providers = [
  {
    name: "Cat Telematics",
    status: "simulated",
    capabilities: ["location", "engine hours", "idle hours", "faults", "history"]
  },
  {
    name: "Generic AEMP / ISO 15143-3",
    status: "planned",
    capabilities: ["capability manifest", "raw payload preservation", "asset mapping"]
  },
  {
    name: "John Deere",
    status: "disabled",
    capabilities: ["credential requirements pending", "capabilities pending"]
  }
];

export default function IntegrationsPage() {
  return (
    <PageShell
      title="Integrations"
      description="Provider adapters expose capabilities honestly. Unsupported fields stay unsupported."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {providers.map((provider) => (
          <section key={provider.name} className="rounded-md border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <Database className="h-5 w-5 text-primary" />
              <Badge tone={provider.status === "simulated" ? "success" : provider.status === "planned" ? "info" : "neutral"}>
                {provider.status}
              </Badge>
            </div>
            <h2 className="mt-4 text-sm font-semibold">{provider.name}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {provider.capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
            <Button className="mt-4 w-full">
              <RefreshCcw className="h-4 w-4" />
              View connection
            </Button>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
