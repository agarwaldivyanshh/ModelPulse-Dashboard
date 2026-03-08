import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { type ModelData, type TimeRange, type ChartMetric } from "@/data/models";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PerformanceChartProps {
  model: ModelData;
}

const PerformanceChart = ({ model }: PerformanceChartProps) => {
  const [metric, setMetric] = useState<ChartMetric>("accuracy");
  const [range, setRange] = useState<TimeRange>("24h");

  const data = useMemo(() => {
    const raw = model.performance[metric][range];
    return raw.map((d) => ({
      time: new Date(d.time).toLocaleString([], {
        ...(range === "30d"
          ? { month: "short", day: "numeric" }
          : range === "7d"
          ? { weekday: "short", hour: "2-digit" }
          : { hour: "2-digit", minute: "2-digit" }),
      }),
      value: d.value,
    }));
  }, [model, metric, range]);

  const unit = metric === "accuracy" ? "%" : "ms";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1 rounded-lg bg-secondary/40 p-1">
          {(["accuracy", "latency"] as ChartMetric[]).map((m) => (
            <button
              key={m}
              className={`relative rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                metric === m ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setMetric(m)}
            >
              {metric === m && (
                <motion.div
                  layoutId="chart-metric"
                  className="absolute inset-0 rounded-md bg-primary/20 border border-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg bg-secondary/40 p-1">
          {(["24h", "7d", "30d"] as TimeRange[]).map((r) => (
            <button
              key={r}
              className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setRange(r)}
            >
              {range === r && (
                <motion.div
                  layoutId="chart-range"
                  className="absolute inset-0 rounded-md bg-secondary border border-border/60"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{r}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${metric}-${range}-${model.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[260px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(217,20%,25%,0.3)" vertical={false} />
              <XAxis
                dataKey="time"
                tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => `${v}${unit}`}
              />
              <Tooltip
                contentStyle={{
                  background: "hsla(222,47%,9%,0.95)",
                  border: "1px solid hsla(217,20%,25%,0.5)",
                  borderRadius: "10px",
                  color: "hsl(210 40% 93%)",
                  fontSize: 12,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px hsla(220,40%,3%,0.5)",
                }}
                formatter={(v: number) => [`${v}${unit}`, metric]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(217 91% 60%)"
                strokeWidth={2}
                fill="url(#chartGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "hsl(217 91% 60%)",
                  stroke: "hsl(220 40% 7%)",
                  strokeWidth: 2,
                  style: { filter: "drop-shadow(0 0 6px hsla(217,91%,60%,0.5))" },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default PerformanceChart;
