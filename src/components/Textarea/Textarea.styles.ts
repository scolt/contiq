import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  "flex w-full text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-800 focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-0",
        ghost:
          "resize-none bg-transparent text-gray-800 focus:outline-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
