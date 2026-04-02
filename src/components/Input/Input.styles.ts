import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex w-full rounded-xl border bg-white/80 px-3 py-2 text-sm text-brand-900 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-brand-200 focus-visible:ring-brand-400/30 focus-visible:border-brand-400",
        error:
          "border-red-400 focus-visible:ring-red-400/20 text-red-900 placeholder:text-red-400/60",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3",
        lg: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
