import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "primaryAlt" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  variant?: "rounded" | "square";
}

export default function Button({
  className = "",
  disabled,
  children,
  color = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) {
  let buttonStyle: string | undefined = {
    // light
    primary:
      "bg-primary text-primary-foreground enabled:hover:opacity-70 transition-opacity enabled:active:bg-gray-200",
    // slightly darker than primary
    primaryAlt:
      "bg-primary-alt text-primary-foreground enabled:hover:opacity-70 transition-opacity enabled:active:bg-gray-400",
    // dark
    secondary:
      "bg-secondary text-secondary-foreground enabled:hover:opacity-80 transition-opacity enabled:active:bg-gray-300",
    // brownish
    accent:
      "bg-accent text-accent-foreground enabled:hover:opacity-80 transition-opacity enabled:active:bg-gray-400",
  }[color || "primary"];

  let buttonSize = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[props.size || "md"];

  let buttonVariants = {
    rounded: "rounded-full",
    square: "rounded-none",
  }[props.variant || "square"];

  return (
    <button
      {...props}
      className={twMerge(
        "inline-flex items-center justify-center border border-transparent font-semibold transition duration-150 ease-in-out",
        disabled && "opacity-25",
        buttonStyle,
        buttonSize,
        buttonVariants,
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
