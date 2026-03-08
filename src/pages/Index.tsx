import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewCard from "@/components/dashboard/OverviewCard";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import MetricCard from "@/components/dashboard/MetricCard";
import DriftCard from "@/components/dashboard/DriftCard";
import LogsTable from "@/components/dashboard/LogsTable";
import ModelSelector from "@/components/dashboard/ModelSelector";
import { models, jitterMetrics } from "@/data/models";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedId, setSelectedId] = useState(models[0].id);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [activeView, setActiveView] = useState<"overview" | "logs">("overview");

  useEffect(() => {
    setLastUpdated(0);
    const interval = setInterval(() => setLastUpdated((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [refreshKey, selectedId]);

  const baseModel = models.find((m) => m.id === selectedId) ?? models[0];
  const model = refreshKey > 0 ? jitterMetrics(baseModel, refreshKey) : baseModel;

  const handleRefresh = useCallback(() => {
    setSpinning(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setSpinning(false), 600);
  }, []);

  const handleLogsClick = () => {
    setActiveView("logs");
    setTimeout(() => {
      document.getElementById("logs-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 10%, hsla(217,91%,60%,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, hsla(217,91%,60%,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 50%, hsla(220,45%,5%,0.5) 0%, transparent 70%)
          `,
        }}
      />
      {/* Grid */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-60" />

      <Sidebar
        activeView={activeView}
        onOverviewClick={() => setActiveView("overview")}
        onLogsClick={handleLogsClick}
      />

      <main className="relative z-10 ml-20 px-6 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary status-pulse" />
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/80">
                  Live Monitoring
                </p>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl tracking-tight">
                ModelPulse
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Production model health, performance, and drift.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-xl border border-border/40 bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
                Updated{" "}
                <span className="font-mono font-medium text-foreground">
                  {lastUpdated}s
                </span>{" "}
                ago
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-xl border border-border/40 bg-secondary/20 hover:bg-primary/10 hover:border-primary/30 transition-all"
                onClick={handleRefresh}
                title="Refresh metrics"
              >
                <RefreshCw
                  size={14}
                  className={`text-muted-foreground transition-all ${
                    spinning ? "animate-spin text-primary" : ""
                  }`}
                />
              </Button>
              <ModelSelector selectedId={selectedId} onSelect={setSelectedId} />
            </div>
          </motion.header>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeView}-${selectedId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeView === "overview" && (
                <>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                    <OverviewCard model={model} />
                    <PerformanceChart model={model} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
                    {model.metrics.map((m, i) => (
                      <MetricCard key={m.label} {...m} index={i} />
                    ))}
                    <DriftCard score={model.driftScore} />
                  </div>
                </>
              )}

              <section
                id="logs-section"
                className="scroll-mt-8"
                aria-label="Recent inference logs"
              >
                <LogsTable logs={model.logs} />
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Index;
