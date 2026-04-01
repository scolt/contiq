import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils/cn";
import { textareaVariants } from "./Textarea.styles";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
