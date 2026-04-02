import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white shadow-sm shadow-brand-900/20 hover:bg-brand-700 active:translate-y-px focus-visible:ring-brand-600/30",
        destructive:
          "bg-red-700 text-white shadow-sm hover:bg-red-800 focus-visible:ring-red-600/30",
        outline:
          "border border-brand-300/60 bg-brand-50 text-brand-800 shadow-sm hover:bg-brand-100 hover:border-brand-400 focus-visible:ring-brand-300",
        secondary:
          "bg-brand-100 text-brand-800 hover:bg-brand-200 focus-visible:ring-brand-300",
        ghost:
          "text-brand-700/60 hover:bg-brand-100/70 hover:text-brand-800 focus-visible:ring-brand-200",
        link: "text-sienna underline-offset-4 hover:underline focus-visible:ring-sienna/30",
      },
      size: {
        sm: "h-8 px-3 rounded-lg text-xs",
        md: "h-9 px-4 rounded-xl text-sm",
        lg: "h-10 px-6 rounded-xl text-sm tracking-wide",
        icon: "h-8 w-8 rounded-lg text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
