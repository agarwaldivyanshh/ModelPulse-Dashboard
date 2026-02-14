import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { type ModelData, type TimeRange, type ChartMetric } from "@/data/models";
import { Button } from "@/components/ui/button";

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
    <div className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          {(["accuracy", "latency"] as ChartMetric[]).map((m) => (
            <Button
              key={m}
              size="sm"
              variant={metric === m ? "default" : "ghost"}
              className="text-xs capitalize h-8"
              onClick={() => setMetric(m)}
            >
              {m}
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["24h", "7d", "30d"] as TimeRange[]).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? "secondary" : "ghost"}
              className="text-xs h-8"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 20% 18%)" />
            <XAxis
              dataKey="time"
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={["auto", "auto"]}
              tickFormatter={(v) => `${v}${unit}`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(222 47% 9%)",
                border: "1px solid hsl(217 20% 18%)",
                borderRadius: "8px",
                color: "hsl(210 40% 93%)",
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}${unit}`, metric]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(217 91% 60%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(217 91% 60%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
