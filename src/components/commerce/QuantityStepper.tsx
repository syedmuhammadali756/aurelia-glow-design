import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-border">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
        className="h-11 w-11 grid place-items-center hover:bg-accent transition-colors"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="h-11 w-10 grid place-items-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        className="h-11 w-11 grid place-items-center hover:bg-accent transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
