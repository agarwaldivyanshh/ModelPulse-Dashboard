import { LayoutDashboard, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeView: "overview" | "logs";
  onOverviewClick: () => void;
  onLogsClick: () => void;
}

const navItems = [
  { id: "overview" as const, icon: LayoutDashboard, label: "Overview" },
  { id: "logs" as const, icon: FileText, label: "Logs" },
];

const Sidebar = ({ activeView, onOverviewClick, onLogsClick }: SidebarProps) => {
  const handlers = { overview: onOverviewClick, logs: onLogsClick };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-full w-20 flex-col items-center border-r border-sidebar-border/60 bg-[hsl(var(--sidebar-background))] pb-8 pt-6">
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsla(217,91%,60%,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="relative mb-8 flex h-10 w-10 items-center justify-center rounded-xl font-mono text-xs font-bold tracking-tight text-primary-foreground"
        style={{
          background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 50%))",
          boxShadow: "0 4px 20px hsla(217,91%,60%,0.4)",
        }}
      >
        MP
      </motion.div>

      <div className="flex flex-1 flex-col items-center gap-3">
        {navItems.map((item, i) => {
          const active = activeView === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              type="button"
              onClick={handlers[item.id]}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(217 91% 60%), hsl(217 91% 50%))",
                    boxShadow: "0 6px 25px hsla(217,91%,60%,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {!active && (
                <div className="absolute inset-0 rounded-xl bg-secondary/30 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
              <item.icon size={18} className="relative z-10" />
            </motion.button>
          );
        })}
      </div>

      {/* Bottom decorative dot */}
      <div className="h-1.5 w-1.5 rounded-full bg-primary/40 status-pulse" />
    </aside>
  );
};

export default Sidebar;
