import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-2xl border border-brand-200/50 bg-white/90 text-foreground shadow-[0_2px_12px_rgba(44,26,14,0.07)]",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "none",
    },
  }
);
