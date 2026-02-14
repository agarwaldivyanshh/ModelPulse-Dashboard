import { LayoutDashboard, FileText } from "lucide-react";

interface SidebarProps {
  activeView: "overview" | "logs";
  onOverviewClick: () => void;
  onLogsClick: () => void;
}

const Sidebar = ({ activeView, onOverviewClick, onLogsClick }: SidebarProps) => {
  return (
    <aside
      className="fixed left-0 top-0 z-20 flex h-full w-20 flex-col items-center border-r border-sidebar-border/80 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),_transparent_55%),hsl(var(--sidebar-background))] pb-8 pt-6 shadow-[0_0_45px_rgba(15,23,42,0.9)]"
    >
      {/* Logo / Brand mark */}
      <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-2xl bg-sidebar-accent text-xs font-semibold tracking-tight text-sidebar-accent-foreground shadow-[0_10px_30px_rgba(15,23,42,0.9)]">
        MP
      </div>

      <div className="flex flex-1 flex-col items-center gap-4">
        {/* Overview */}
        <button
          type="button"
          onClick={onOverviewClick}
          className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-muted-foreground transition-all duration-200 hover:text-foreground hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)] ${
            activeView === "overview"
              ? "bg-primary/95 text-primary-foreground shadow-[0_18px_45px_rgba(37,99,235,0.75)] ring-2 ring-primary/70 ring-offset-2 ring-offset-[hsl(var(--sidebar-background))]"
              : "bg-sidebar-accent/40 hover:bg-sidebar-accent"
          }`}
          aria-label="Overview"
        >
          <LayoutDashboard size={20} />
        </button>

        {/* Logs */}
        <button
          type="button"
          onClick={onLogsClick}
          className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-muted-foreground transition-all duration-200 hover:text-foreground hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)] ${
            activeView === "logs"
              ? "bg-primary/95 text-primary-foreground shadow-[0_18px_45px_rgba(37,99,235,0.75)] ring-2 ring-primary/70 ring-offset-2 ring-offset-[hsl(var(--sidebar-background))]"
              : "bg-sidebar-accent/40 hover:bg-sidebar-accent"
          }`}
          aria-label="Logs"
        >
          <FileText size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
