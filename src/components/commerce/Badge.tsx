import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  new: "bg-ivory text-espresso border border-espresso/15",
  bestseller: "bg-espresso text-ivory",
  sale: "bg-blush text-espresso",
  limited: "bg-champagne text-espresso",
};

const labels: Record<string, string> = {
  new: "New",
  bestseller: "Bestseller",
  sale: "Sale",
  limited: "Limited",
};

export function Badge({ kind, className }: { kind: keyof typeof labels; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase",
        styles[kind],
        className,
      )}
    >
      {labels[kind]}
    </span>
  );
}
