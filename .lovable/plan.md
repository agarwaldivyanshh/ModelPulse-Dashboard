

# ModelPulse — ML Model Monitoring Dashboard

## Overview
A sleek, dark-themed single-page dashboard for monitoring ML model performance, inspired by professional DevOps/AI infrastructure tools. Static mock data, no backend needed.

---

## 1. Theme & Styling
- **Dark navy background** (#0B1220), lighter card surfaces (#111827)
- **Accent blue** (#3B82F6), green for success, red for errors
- Rounded-xl corners, subtle shadows, clean typography
- Minimal, professional aesthetic — no neon, no gradients

## 2. Left Sidebar (Icon-only)
- Fixed narrow sidebar with 4 icons: Overview (active), Models, Logs, Settings
- Active state highlighted with blue accent
- No routing — visual only

## 3. Model Overview Card (Top Left)
- Large hero card showing:
  - Current model version (e.g., v2.1)
  - Deployment status badge (Healthy / Degraded / Failed)
  - Uptime percentage
  - Total requests today
  - Last deployment timestamp
- Clean, spacious layout

## 4. Performance Chart Panel (Top Right)
- Line chart (Recharts) with two toggleable views: **Accuracy** and **Latency** over time
- Time range filter buttons: 24h / 7d / 30d
- Smooth, styled chart with blue line on dark background

## 5. Metric Cards Row (4 Cards)
- **Accuracy %**, **Avg Latency (ms)**, **Error Rate %**, **Throughput (req/sec)**
- Each card includes a delta indicator (+/- %) with color coding (green/red)
- Optional sparkline micro-chart per card

## 6. Recent Inference Logs Table
- Columns: Timestamp, Model Version, Status, Response Time, Input Size
- Status color-coded (green = Success, red = Failed)
- Client-side pagination over mock data

## 7. Mock Data
- A local JSON/TS file with model metrics, time-series arrays (24h/7d/30d), and a logs array
- No API calls

## 8. Architecture
- Clean component structure: `Sidebar`, `OverviewCard`, `MetricCard`, `PerformanceChart`, `LogsTable`
- Mock data in a dedicated `data/` folder
- Modular, readable, production-quality code

