import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { twMerge } from "tailwind-merge";

const labelStyle =
  "text-sm font-medium leading-none py-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={twMerge(labelStyle, className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
