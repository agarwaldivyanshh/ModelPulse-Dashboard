import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  sparkline: number[];
}

const MetricCard = ({ label, value, delta, trend, sparkline }: MetricCardProps) => {
  const isPositive = (trend === "up" && !label.includes("Error")) || (trend === "down" && label.includes("Error"));
  const colorClass = isPositive ? "text-success" : "text-destructive";
  const sparkColor = isPositive ? "hsl(142 71% 45%)" : "hsl(0 72% 51%)";

  const chartData = sparkline.map((v) => ({ v }));

  return (
    <div className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${colorClass}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {delta}
          </div>
        </div>
        <div className="w-20 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke={sparkColor} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
