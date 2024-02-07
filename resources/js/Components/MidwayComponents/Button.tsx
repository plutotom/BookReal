import React from "react";
import { twMerge } from "tailwind-merge";
// interface ButtonProps extends React.RefObject<HTMLButtonElement> {
//   color?: "primary" | "primaryAlt" | "secondary" | "accent";
//   size?: "sm" | "md" | "lg";
//   variant?: "rounded" | "square";
//   type?: "button" | "submit" | "reset";
// }

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  color?: "primary" | "primaryAlt" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  variant?: "rounded" | "square";
  type?: "button" | "submit" | "reset";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      disabled,
      children,
      color = "primary",
      type = "button",
      ...props
    },
    ref,
  ) => {
    let buttonStyle: string | undefined = {
      primary:
        "bg-primary text-primary-foreground enabled:hover:opacity-70 transition-opacity enabled:active:bg-gray-200",
      primaryAlt:
        "bg-primary-alt text-primary-foreground enabled:hover:opacity-70 transition-opacity enabled:active:bg-gray-400",
      secondary:
        "bg-secondary text-secondary-foreground enabled:hover:opacity-80 transition-opacity enabled:active:bg-gray-300",
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
        type={type}
        {...props}
        ref={ref}
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
  },
);

// name the component
Button.displayName = "Button68";

export default Button;
