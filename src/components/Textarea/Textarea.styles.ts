import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  "flex w-full text-sm transition-colors placeholder:text-brand-400/70 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-brand-200 bg-white/80 px-3 py-2 text-brand-900 focus-visible:ring-2 focus-visible:ring-brand-400/30 focus-visible:ring-offset-0",
        ghost:
          "resize-none bg-transparent text-brand-900 focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
