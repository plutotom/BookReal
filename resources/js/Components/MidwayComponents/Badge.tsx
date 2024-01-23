import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = {
  type?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "accent"
    | "accentTwo";
} & HTMLAttributes<HTMLSpanElement>;

const Badge = ({
  children,
  type = "primary",
  className = "",
  ...props
}: BadgeProps) => {
  const badgeStyle: string | undefined = {
    primary: "border-transparent bg-primary text-primary-foreground shadow ",
    secondary: "border-transparent bg-secondary text-secondary-foreground ",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground shadow ",
    accent: "border-transparent bg-accent text-accent-foreground shadow ",
    accentTwo:
      "border-transparent bg-accent-two text-accent-two-foreground shadow ",

    outline: "text-foreground",
  }[type || "primary"];

  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeStyle,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";

export default Badge;
