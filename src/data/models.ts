// Multi-model mock data for ModelPulse

export type ModelStatus = "Healthy" | "Degraded" | "Failed";
export type TimeRange = "24h" | "7d" | "30d";
export type ChartMetric = "accuracy" | "latency";

export interface ModelMetric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  sparkline: number[];
}

export interface LogEntry {
  id: number;
  timestamp: string;
  version: string;
  status: "Success" | "Failed";
  responseTime: number;
  inputSize: string;
}

export interface TimePoint {
  time: string;
  value: number;
}

export interface ModelData {
  id: string;
  name: string;
  version: string;
  status: ModelStatus;
  uptime: number;
  totalRequests: number;
  lastDeployment: string;
  driftScore: number;
  metrics: ModelMetric[];
  performance: {
    accuracy: Record<TimeRange, TimePoint[]>;
    latency: Record<TimeRange, TimePoint[]>;
  };
  logs: LogEntry[];
}

// Deterministic seeded random for reproducibility
const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const generateTimeSeries = (
  points: number,
  baseValue: number,
  variance: number,
  trend: number,
  seed: number
): TimePoint[] => {
  const rng = seededRandom(seed);
  const now = Date.now();
  const interval = points <= 24 ? 3600000 : points <= 168 ? 3600000 : 86400000;
  return Array.from({ length: points }, (_, i) => ({
    time: new Date(now - (points - 1 - i) * interval).toISOString(),
    value: +(baseValue + trend * (i / points) + (rng() - 0.5) * variance).toFixed(2),
  }));
};

const generateLogs = (
  count: number,
  version: string,
  failRate: number,
  latencyBase: number,
  latencyVariance: number,
  seed: number
): LogEntry[] => {
  const rng = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const failed = rng() < failRate;
    return {
      id: i + 1,
      timestamp: new Date(Date.now() - i * 45000).toISOString(),
      version,
      status: failed ? ("Failed" as const) : ("Success" as const),
      responseTime: failed ? 0 : Math.floor(latencyBase + rng() * latencyVariance),
      inputSize: `${(rng() * 4 + 0.5).toFixed(1)} KB`,
    };
  });
};

export const models: ModelData[] = [
  {
    id: "sentimentnet",
    name: "SentimentNet",
    version: "v2.1",
    status: "Healthy",
    uptime: 99.97,
    totalRequests: 1_284_302,
    lastDeployment: "2026-02-12T14:32:00Z",
    driftScore: 0.04,
    metrics: [
      { label: "Accuracy", value: "97.2%", delta: "+1.3%", trend: "up", sparkline: [94, 95, 95.5, 96, 96.8, 97, 97.2] },
      { label: "Avg Latency", value: "42ms", delta: "-8ms", trend: "up", sparkline: [58, 55, 50, 48, 45, 43, 42] },
      { label: "Error Rate", value: "0.12%", delta: "-0.03%", trend: "up", sparkline: [0.18, 0.16, 0.15, 0.14, 0.13, 0.12, 0.12] },
      { label: "Throughput", value: "1,847/s", delta: "+124/s", trend: "up", sparkline: [1650, 1700, 1720, 1780, 1800, 1830, 1847] },
    ],
    performance: {
      accuracy: {
        "24h": generateTimeSeries(24, 96.5, 1.5, 0.3, 101),
        "7d": generateTimeSeries(168, 95.8, 2, 0.8, 102),
        "30d": generateTimeSeries(30, 94.5, 3, 1.5, 103),
      },
      latency: {
        "24h": generateTimeSeries(24, 45, 15, -2, 104),
        "7d": generateTimeSeries(168, 52, 20, -5, 105),
        "30d": generateTimeSeries(30, 60, 25, -10, 106),
      },
    },
    logs: generateLogs(80, "v2.1", 0.05, 30, 50, 201),
  },
  {
    id: "frauddetect",
    name: "FraudDetect",
    version: "v3.0",
    status: "Degraded",
    uptime: 98.4,
    totalRequests: 876_541,
    lastDeployment: "2026-02-10T09:15:00Z",
    driftScore: 0.27,
    metrics: [
      { label: "Accuracy", value: "91.8%", delta: "-2.1%", trend: "down", sparkline: [94.5, 94, 93.2, 92.8, 92.3, 92, 91.8] },
      { label: "Avg Latency", value: "128ms", delta: "+34ms", trend: "down", sparkline: [88, 95, 102, 110, 118, 124, 128] },
      { label: "Error Rate", value: "3.4%", delta: "+1.8%", trend: "down", sparkline: [1.2, 1.5, 1.9, 2.4, 2.8, 3.1, 3.4] },
      { label: "Throughput", value: "923/s", delta: "-210/s", trend: "down", sparkline: [1180, 1120, 1080, 1020, 980, 950, 923] },
    ],
    performance: {
      accuracy: {
        "24h": generateTimeSeries(24, 92, 2.5, -0.5, 301),
        "7d": generateTimeSeries(168, 93.5, 3, -1.2, 302),
        "30d": generateTimeSeries(30, 95, 3.5, -2.5, 303),
      },
      latency: {
        "24h": generateTimeSeries(24, 125, 25, 3, 304),
        "7d": generateTimeSeries(168, 100, 30, 8, 305),
        "30d": generateTimeSeries(30, 85, 35, 15, 306),
      },
    },
    logs: generateLogs(80, "v3.0", 0.18, 80, 100, 401),
  },
  {
    id: "visionclassifier",
    name: "VisionClassifier",
    version: "v1.4",
    status: "Failed",
    uptime: 72.3,
    totalRequests: 214_089,
    lastDeployment: "2026-02-08T22:48:00Z",
    driftScore: 0.46,
    metrics: [
      { label: "Accuracy", value: "64.1%", delta: "-18.7%", trend: "down", sparkline: [88, 82, 76, 72, 68, 66, 64.1] },
      { label: "Avg Latency", value: "340ms", delta: "+195ms", trend: "down", sparkline: [145, 180, 220, 260, 290, 320, 340] },
      { label: "Error Rate", value: "18.9%", delta: "+14.2%", trend: "down", sparkline: [4.2, 6.5, 9.1, 12.3, 15.0, 17.4, 18.9] },
      { label: "Throughput", value: "312/s", delta: "-845/s", trend: "down", sparkline: [1200, 980, 760, 580, 450, 370, 312] },
    ],
    performance: {
      accuracy: {
        "24h": generateTimeSeries(24, 65, 8, -3, 501),
        "7d": generateTimeSeries(168, 75, 10, -8, 502),
        "30d": generateTimeSeries(30, 88, 12, -18, 503),
      },
      latency: {
        "24h": generateTimeSeries(24, 330, 50, 5, 504),
        "7d": generateTimeSeries(168, 250, 60, 25, 505),
        "30d": generateTimeSeries(30, 150, 70, 50, 506),
      },
    },
    logs: generateLogs(80, "v1.4", 0.4, 200, 200, 601),
  },
];

// Jitter function for simulated refresh
export const jitterMetrics = (model: ModelData, seed: number): ModelData => {
  const rng = seededRandom(seed);
  return {
    ...model,
    totalRequests: model.totalRequests + Math.floor(rng() * 200 - 50),
    metrics: model.metrics.map((m) => {
      const raw = parseFloat(m.value.replace(/[^0-9.\-]/g, ""));
      const jitter = (rng() - 0.5) * raw * 0.01;
      const suffix = m.value.replace(/[0-9.\-,]/g, "");
      const newVal = m.label === "Throughput"
        ? `${Math.round(raw + jitter).toLocaleString()}${suffix}`
        : `${(raw + jitter).toFixed(m.label.includes("Rate") || m.label.includes("Accuracy") ? 2 : 0)}${suffix}`;
      return { ...m, value: newVal };
    }),
  };
};
