import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  sparkline: number[];
  index?: number;
}

const MetricCard = ({ label, value, delta, trend, sparkline, index = 0 }: MetricCardProps) => {
  const isPositive = (trend === "up" && !label.includes("Error")) || (trend === "down" && label.includes("Error"));
  const sparkColor = isPositive ? "hsl(142 71% 45%)" : "hsl(0 72% 51%)";
  const chartData = sparkline.map((v) => ({ v }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden"
    >
      {/* Subtle background shimmer */}
      <div className="absolute inset-0 shimmer pointer-events-none" />

      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground relative z-10">
        {label}
      </p>
      <div className="flex items-end justify-between relative z-10">
        <div>
          <p className="text-2xl font-semibold text-foreground font-mono tracking-tight">{value}</p>
          <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
            {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{delta}</span>
          </div>
        </div>
        <div className="w-20 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={sparkColor}
                strokeWidth={1.5}
                fill={`url(#spark-${label})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
