import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils/cn";
import { inputVariants } from "./Input.styles";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
