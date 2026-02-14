import { useState, useEffect } from "react";
import { type LogEntry } from "@/data/models";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 8;

interface LogsTableProps {
  logs: LogEntry[];
}

const LogsTable = ({ logs }: LogsTableProps) => {
  const [page, setPage] = useState(0);
  const logsKey = logs[0]?.version ?? "";
  const totalPages = Math.ceil(logs.length / PAGE_SIZE);

  // Reset to page 0 when model changes
  useEffect(() => {
    setPage(0);
  }, [logsKey]);

  const slice = logs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-5 pb-0">
        <h3 className="text-sm font-semibold text-foreground">Recent Inference Logs</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs">Timestamp</TableHead>
              <TableHead className="text-muted-foreground text-xs">Version</TableHead>
              <TableHead className="text-muted-foreground text-xs">Status</TableHead>
              <TableHead className="text-muted-foreground text-xs">Response Time</TableHead>
              <TableHead className="text-muted-foreground text-xs">Input Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slice.map((log) => (
              <TableRow key={`${logsKey}-${log.id}`} className="border-border">
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </TableCell>
                <TableCell className="text-xs text-foreground">{log.version}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${log.status === "Success" ? "text-success" : "text-destructive"}`}>
                    {log.status}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-foreground">{log.status === "Failed" ? "—" : `${log.responseTime}ms`}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.inputSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Page {page + 1} of {totalPages}
        </p>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft size={14} />
          </Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogsTable;
