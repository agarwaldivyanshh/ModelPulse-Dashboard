import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { models } from "@/data/models";

interface ModelSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const statusDot: Record<string, string> = {
  Healthy: "bg-success",
  Degraded: "bg-warning",
  Failed: "bg-destructive",
};

const ModelSelector = ({ selectedId, onSelect }: ModelSelectorProps) => (
  <Select value={selectedId} onValueChange={onSelect}>
    <SelectTrigger className="w-[220px] h-9 text-sm bg-card border-border">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="bg-popover border-border">
      {models.map((m) => (
        <SelectItem key={m.id} value={m.id}>
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusDot[m.status]}`} />
            {m.name} {m.version}
          </span>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default ModelSelector;
