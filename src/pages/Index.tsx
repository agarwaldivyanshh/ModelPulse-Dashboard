import { useState, useEffect, useCallback } from "react";
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

  // Tick "last updated" every second
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
      document.getElementById("logs-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.16),_transparent_55%),hsl(var(--background))]">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to_right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to_bottom, rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <Sidebar
        activeView={activeView}
        onOverviewClick={() => setActiveView("overview")}
        onLogsClick={handleLogsClick}
      />

      <main className="relative ml-20 px-6 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card/70 px-5 py-4 shadow-[0_22px_60px_rgba(15,23,42,0.9)] backdrop-blur-md">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary/80">
                Monitoring
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">
                ModelPulse Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Stay on top of production model health, performance, and drift.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border/70 bg-background/50 px-3 py-1 text-xs text-muted-foreground shadow-sm">
                Updated{" "}
                <span className="font-medium text-foreground">
                  {lastUpdated}s
                </span>{" "}
                ago
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 border border-border/60 bg-background/40 hover:bg-background/70"
                onClick={handleRefresh}
                title="Refresh metrics"
              >
                <RefreshCw
                  size={14}
                  className={`text-muted-foreground transition-transform ${
                    spinning ? "animate-spin" : ""
                  }`}
                />
              </Button>
              <ModelSelector selectedId={selectedId} onSelect={setSelectedId} />
            </div>
          </header>

          {/* Overview Section */}
          {activeView === "overview" && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <OverviewCard model={model} />
                <PerformanceChart model={model} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {model.metrics.map((m) => (
                  <MetricCard key={m.label} {...m} />
                ))}
                <DriftCard score={model.driftScore} />
              </div>
            </>
          )}

          {/* Logs Section */}
          <section
            id="logs-section"
            className="scroll-mt-8 pt-2"
            aria-label="Recent inference logs"
          >
            <LogsTable logs={model.logs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
