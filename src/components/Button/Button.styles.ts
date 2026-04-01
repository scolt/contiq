import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600/30",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/30",
        outline:
          "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-200",
        secondary:
          "bg-brand-100 text-brand-700 hover:bg-brand-200 focus-visible:ring-brand-200",
        ghost:
          "text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-gray-200",
        link: "text-brand-600 underline-offset-4 hover:underline focus-visible:ring-brand-300",
      },
      size: {
        sm: "h-8 px-3 rounded-lg text-xs",
        md: "h-9 px-4 rounded-xl text-sm",
        lg: "h-10 px-6 rounded-xl text-base",
        icon: "h-8 w-8 rounded-full text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
