import { type ModelData } from "@/data/models";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Server, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface OverviewCardProps {
  model: ModelData;
}

const statusConfig: Record<string, { classes: string; glow: string }> = {
  Healthy: {
    classes: "bg-success/15 text-success border-success/30",
    glow: "0 0 12px hsla(142,71%,45%,0.3)",
  },
  Degraded: {
    classes: "bg-warning/15 text-warning border-warning/30",
    glow: "0 0 12px hsla(38,92%,50%,0.3)",
  },
  Failed: {
    classes: "bg-destructive/15 text-destructive border-destructive/30",
    glow: "0 0 12px hsla(0,72%,51%,0.3)",
  },
};

const OverviewCard = ({ model }: OverviewCardProps) => {
  const { name, version, status, uptime, totalRequests, lastDeployment } = model;
  const deployDate = new Date(lastDeployment);
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Current Model
          </p>
          <h2 className="text-2xl font-semibold text-foreground mt-1">
            {name}{" "}
            <span className="font-mono text-lg text-primary/80">{version}</span>
          </h2>
        </div>
        <Badge
          className={`${config.classes} border text-xs px-3 py-1`}
          style={{ boxShadow: config.glow }}
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current status-pulse" />
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Activity, label: "Uptime", value: `${uptime}%` },
          { icon: Server, label: "Requests Today", value: totalRequests.toLocaleString() },
          { icon: Clock, label: "Avg Response", value: model.metrics[1]?.value ?? "—" },
          {
            icon: Calendar,
            label: "Last Deploy",
            value: `${deployDate.toLocaleDateString()} ${deployDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <Stat icon={stat.icon} label={stat.label} value={stat.value} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-start gap-3 group">
    <div className="w-9 h-9 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/15">
      <Icon size={15} className="text-muted-foreground transition-colors group-hover:text-primary" />
    </div>
    <div>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground font-mono">{value}</p>
    </div>
  </div>
);

export default OverviewCard;
