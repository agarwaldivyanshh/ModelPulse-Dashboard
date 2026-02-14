import { type ModelData } from "@/data/models";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Server, Calendar } from "lucide-react";

interface OverviewCardProps {
  model: ModelData;
}

const statusColors: Record<string, string> = {
  Healthy: "bg-success/15 text-success border-success/30",
  Degraded: "bg-warning/15 text-warning border-warning/30",
  Failed: "bg-destructive/15 text-destructive border-destructive/30",
};

const OverviewCard = ({ model }: OverviewCardProps) => {
  const { name, version, status, uptime, totalRequests, lastDeployment } = model;
  const deployDate = new Date(lastDeployment);

  return (
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Current Model</p>
          <h2 className="text-2xl font-semibold text-foreground mt-1">{name} {version}</h2>
        </div>
        <Badge className={`${statusColors[status]} border text-xs px-3 py-1`}>
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat icon={Activity} label="Uptime" value={`${uptime}%`} />
        <Stat icon={Server} label="Requests Today" value={totalRequests.toLocaleString()} />
        <Stat icon={Clock} label="Avg Response" value={model.metrics[1]?.value ?? "—"} />
        <Stat icon={Calendar} label="Last Deploy" value={`${deployDate.toLocaleDateString()} ${deployDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`} />
      </div>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
      <Icon size={16} className="text-muted-foreground" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default OverviewCard;
