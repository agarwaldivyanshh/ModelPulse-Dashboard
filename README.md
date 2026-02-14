# ModelPulse — ML Model Monitoring Dashboard

ModelPulse is a frontend simulation of a production-grade ML model monitoring system.  
It demonstrates how modern AI infrastructure dashboards visualize model health, performance metrics, and inference logs in real time.

This project focuses on state-driven UI, time-series data visualization, and realistic monitoring behavior without requiring a backend.

---

## 🚀 Live Demo

https://model-pulse.vercel.app/

---

## 🧠 Overview

ModelPulse simulates a real-world AI platform dashboard used to monitor deployed machine learning models.

The dashboard allows users to:

- Switch between multiple ML models
- View deployment health status
- Monitor accuracy and latency trends
- Track drift score
- Analyze inference logs
- Simulate live metric refresh behavior

The goal of this project is to replicate how ML observability systems function from a frontend perspective.

---

## ✨ Key Features

### Multi-Model Support
- Supports multiple simulated models (Healthy, Degraded, Failed states)
- Switching models dynamically updates metrics, charts, and logs

### Time-Series Performance Tracking
- Toggle between 24h / 7d / 30d views
- Accuracy and latency visualization using line charts

### Deployment Health States
- Color-coded system status indicators
- Status influences metrics to simulate realistic behavior

### Drift Monitoring
- Displays model drift score
- Color-coded stability indication

### Simulated Live Refresh
- Manual refresh with metric jitter
- "Last updated" counter
- Mimics real-time monitoring systems

### Inference Logs
- Paginated logs
- Response time and status tracking
- Status-aware failure distribution

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts**
- **Lucide Icons**
- **React Query (setup for extensibility)**

---

## 📂 Project Structure

src/
components/
dashboard/
Sidebar
OverviewCard
PerformanceChart
MetricCard
DriftCard
LogsTable
ModelSelector
data/
models.ts
pages/
Index.tsx

The project follows a modular component-based architecture to maintain separation of concerns.

---

## 🔄 How It Works

All model data is stored locally in structured JSON-like objects.

Each model contains:

- Metrics
- Time-series datasets
- Deployment status
- Drift score
- Logs array

UI state determines:
- Active model
- Selected time range
- Refresh simulation

This approach mimics how a real monitoring frontend would interact with a backend API.

---

