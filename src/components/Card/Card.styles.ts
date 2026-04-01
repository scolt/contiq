import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-xl border border-foreground/10 bg-background text-foreground shadow-sm",
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
