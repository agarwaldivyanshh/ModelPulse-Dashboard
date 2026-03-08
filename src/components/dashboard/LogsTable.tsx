import { useState, useEffect } from "react";
import { type LogEntry } from "@/data/models";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 8;

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable = ({ logs }: LogsTableProps) => {
  const [page, setPage] = useState(0);
  const logsKey = logs[0]?.version ?? "";
  const totalPages = Math.ceil(logs.length / PAGE_SIZE);

  useEffect(() => {
    setPage(0);
  }, [logsKey]);

  const slice = logs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="p-5 pb-0 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Inference Logs</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">{logs.length} total entries</p>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-success status-pulse" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Timestamp</TableHead>
              <TableHead className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Version</TableHead>
              <TableHead className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Response Time</TableHead>
              <TableHead className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">Input Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((log, i) => (
              <motion.tr
                key={`${logsKey}-${log.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="border-border/30 transition-colors hover:bg-secondary/20"
              >
                <TableCell className="text-xs text-muted-foreground font-mono">
                  {new Date(log.timestamp).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </TableCell>
                <TableCell className="text-xs text-foreground font-mono">{log.version}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${log.status === "Success" ? "text-success" : "text-destructive"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${log.status === "Success" ? "bg-success" : "bg-destructive"}`} />
                    {log.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-foreground font-mono">
                  {log.status === "Failed" ? "—" : `${log.responseTime}ms`}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{log.inputSize}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          Page <span className="text-foreground font-medium">{page + 1}</span> of {totalPages}
        </p>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LogsTable;
