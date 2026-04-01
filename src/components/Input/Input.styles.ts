import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-foreground/20 focus-visible:ring-foreground/30",
        error:
          "border-red-500 focus-visible:ring-red-500/30 text-red-900 placeholder:text-red-400",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
