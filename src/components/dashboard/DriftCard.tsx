import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface DriftCardProps {
  score: number;
}

const DriftCard = ({ score }: DriftCardProps) => {
  const level = score < 0.15 ? "stable" : score < 0.3 ? "monitor" : "critical";
  const colorClass =
    level === "stable"
      ? "text-success"
      : level === "monitor"
      ? "text-warning"
      : "text-destructive";
  const bgClass =
    level === "stable"
      ? "bg-success/10"
      : level === "monitor"
      ? "bg-warning/10"
      : "bg-destructive/10";

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <p className="text-xs text-muted-foreground">Drift Score</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={12} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[220px] text-xs bg-popover border-border">
              Drift score measures distribution shift between training and live inference data.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-foreground">{score.toFixed(2)}</p>
          <span
            className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${colorClass} ${bgClass} capitalize`}
          >
            {level}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DriftCard;
