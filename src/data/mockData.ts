// Time-series data generation
const generateTimeSeries = (points: number, baseValue: number, variance: number, trend: number = 0) => {
  const now = Date.now();
  const interval = (points <= 24 ? 3600000 : points <= 168 ? 3600000 : 86400000);
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - 1 - i) * interval).toISOString(),
    value: +(baseValue + trend * (i / points) + (Math.random() - 0.5) * variance).toFixed(2),
  }));
};

export const performanceData = {
  accuracy: {
    "24h": generateTimeSeries(24, 96.5, 1.5, 0.3),
    "7d": generateTimeSeries(168, 95.8, 2, 0.8),
    "30d": generateTimeSeries(30, 94.5, 3, 1.5),
  },
  latency: {
    "24h": generateTimeSeries(24, 45, 15, -2),
    "7d": generateTimeSeries(168, 52, 20, -5),
    "30d": generateTimeSeries(30, 60, 25, -10),
  },
};

export const modelOverview = {
  version: "v2.1",
  status: "Healthy" as const,
  uptime: 99.97,
  totalRequests: 1_284_302,
  lastDeployment: "2026-02-12T14:32:00Z",
};

export const metrics = [
  { label: "Accuracy", value: "97.2%", delta: "+1.3%", trend: "up" as const, sparkline: [94, 95, 95.5, 96, 96.8, 97, 97.2] },
  { label: "Avg Latency", value: "42ms", delta: "-8ms", trend: "up" as const, sparkline: [58, 55, 50, 48, 45, 43, 42] },
  { label: "Error Rate", value: "0.12%", delta: "+0.03%", trend: "down" as const, sparkline: [0.08, 0.09, 0.1, 0.09, 0.11, 0.11, 0.12] },
  { label: "Throughput", value: "1,847/s", delta: "+124/s", trend: "up" as const, sparkline: [1650, 1700, 1720, 1780, 1800, 1830, 1847] },
];

const statuses = ["Success", "Success", "Success", "Success", "Success", "Success", "Success", "Failed"] as const;
const versions = ["v2.1", "v2.1", "v2.0", "v2.1"];

export const logs = Array.from({ length: 80 }, (_, i) => {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  return {
    id: i + 1,
    timestamp: new Date(Date.now() - i * 45000).toISOString(),
    version: versions[Math.floor(Math.random() * versions.length)],
    status,
    responseTime: status === "Failed" ? 0 : Math.floor(20 + Math.random() * 80),
    inputSize: `${(Math.random() * 4 + 0.5).toFixed(1)} KB`,
  };
});
