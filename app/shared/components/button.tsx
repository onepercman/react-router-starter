"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { cn } from "~/shared/utils";
import { Spinner } from "./spinner";

export const button = tv({
  base: [
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-bold",
    "cursor-pointer border-0 border-transparent outline-none ring-2 ring-transparent transition-all duration-200",
    "h-[var(--button-size)] min-h-[var(--button-size)] min-w-[var(--button-size)] px-4 text-xs",
    "rounded-xl", // border-radius lớn hơn
    "shadow-sm", // shadow nhẹ mặc định
    "focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
    "[&:not(:disabled)]:active:brightness-105",
    "[&:not(:disabled)]:hover:shadow-md", // shadow lớn hơn khi hover
    "[&:not(:disabled)]:hover:scale-[1.03]", // scale nhẹ khi hover
    "[&:not(:disabled)]:hover:brightness-105", // sáng hơn khi hover
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:bg-muted disabled:text-secondary",
  ],
  variants: {
    size: {
      xs: "px-3 text-xs [--button-size:1.75rem]",
      sm: "px-4 text-sm [--button-size:2rem]",
      md: "px-5 text-sm [--button-size:2.5rem]",
      lg: "px-6 text-base [--button-size:3rem]",
    },
    variant: {
      default: "border-0",
      outlined: "border-2 bg-transparent",
      ghost: "border-0 bg-transparent shadow-none", // luôn không nền
      light: "border-0 bg-background text-foreground",
    },
    color: {
      default:
        "bg-background text-foreground [&:not(:disabled)]:hover:bg-background/80",
      primary:
        "bg-primary text-white [&:not(:disabled)]:hover:bg-primary-focus [&:not(:disabled)]:hover:text-white",
      accent:
        "bg-accent text-white [&:not(:disabled)]:hover:bg-accent-focus [&:not(:disabled)]:hover:text-white",
      info: "bg-info text-white [&:not(:disabled)]:hover:bg-info-focus [&:not(:disabled)]:hover:text-white",
      success:
        "bg-success text-white [&:not(:disabled)]:hover:bg-success-focus [&:not(:disabled)]:hover:text-white",
      warning:
        "bg-warning text-white [&:not(:disabled)]:hover:bg-warning-focus [&:not(:disabled)]:hover:text-white",
      error:
        "bg-error text-white [&:not(:disabled)]:hover:bg-error-focus [&:not(:disabled)]:hover:text-white",
    },
    shape: {
      normal: "rounded-xl",
      pill: "rounded-full",
      circle: "aspect-square rounded-full p-0",
      square: "aspect-square rounded-xl p-0",
    },
  },
  compoundVariants: [
    // Outlined variant colors
    {
      variant: "outlined",
      color: "default",
      class: [
        "border border-border text-foreground bg-transparent [&:not(:disabled)]:hover:bg-background",
      ],
    },
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border border-primary text-primary bg-transparent [&:not(:disabled)]:hover:border-primary-focus [&:not(:disabled)]:hover:bg-primary/10",
      ],
    },
    {
      variant: "outlined",
      color: "accent",
      class: [
        "border border-accent text-accent bg-transparent [&:not(:disabled)]:hover:border-accent-focus [&:not(:disabled)]:hover:bg-accent/10",
      ],
    },
    {
      variant: "outlined",
      color: "info",
      class: [
        "border border-info text-info bg-transparent [&:not(:disabled)]:hover:border-info-focus [&:not(:disabled)]:hover:bg-info/10",
      ],
    },
    {
      variant: "outlined",
      color: "success",
      class: [
        "border border-success text-success bg-transparent [&:not(:disabled)]:hover:border-success-focus [&:not(:disabled)]:hover:bg-success/10",
      ],
    },
    {
      variant: "outlined",
      color: "warning",
      class: [
        "border border-warning text-warning bg-transparent [&:not(:disabled)]:hover:border-warning-focus [&:not(:disabled)]:hover:bg-warning/10",
      ],
    },
    {
      variant: "outlined",
      color: "error",
      class: [
        "border border-error text-error bg-transparent [&:not(:disabled)]:hover:border-error-focus [&:not(:disabled)]:hover:bg-error/10",
      ],
    },
    // Ghost variant colors
    {
      variant: "ghost",
      color: "default",
      class: [
        "text-foreground bg-transparent [&:not(:disabled)]:hover:bg-background",
      ],
    },
    {
      variant: "ghost",
      color: "primary",
      class: [
        "text-primary bg-transparent [&:not(:disabled)]:hover:bg-primary/10",
      ],
    },
    {
      variant: "ghost",
      color: "accent",
      class: [
        "text-accent bg-transparent [&:not(:disabled)]:hover:bg-accent/10",
      ],
    },
    {
      variant: "ghost",
      color: "info",
      class: ["text-info bg-transparent [&:not(:disabled)]:hover:bg-info/10"],
    },
    {
      variant: "ghost",
      color: "success",
      class: [
        "text-success bg-transparent [&:not(:disabled)]:hover:bg-success/10",
      ],
    },
    {
      variant: "ghost",
      color: "warning",
      class: [
        "text-warning bg-transparent [&:not(:disabled)]:hover:bg-warning/10",
      ],
    },
    {
      variant: "ghost",
      color: "error",
      class: ["text-error bg-transparent [&:not(:disabled)]:hover:bg-error/10"],
    },
  ],
  defaultVariants: {
    size: "lg",
    variant: "default",
    shape: "normal",
    color: "default",
  },
});

export interface ButtonBaseProps {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactElement | React.ReactNode;
  rightIcon?: React.ReactElement | React.ReactNode;
  loadingVariant?: "default" | "transparent";
}

export interface ButtonProps
  extends ButtonBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  as?: React.ElementType;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "ghost" | "light";
  color?:
    | "default"
    | "primary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  shape?: "normal" | "pill" | "circle" | "square";
}

function useButton({
  onClick,
  loading,
  disabled,
  size,
  variant,
  color,
  shape,
  className,
  ...props
}: ButtonProps) {
  const [asyncLoading, setAsyncLoading] = React.useState(false);

  const isLoading = loading || asyncLoading;

  const handleClick = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isLoading || disabled) return;

      if (onClick) {
        try {
          setAsyncLoading(true);
          const result = onClick(event);
          if (
            result != null &&
            typeof result === "object" &&
            "then" in result &&
            typeof (result as any).then === "function"
          ) {
            await result;
          }
        } catch (error) {
          console.error("Button click error:", error);
        } finally {
          setAsyncLoading(false);
        }
      }
    },
    [onClick, isLoading, disabled]
  );

  const classNameResult = button({ size, variant, color, shape, className });

  return {
    ...props,
    onClick: handleClick,
    disabled: disabled || isLoading,
    loading: isLoading,
    className: classNameResult,
  };
}

export function Button({
  ref,
  as: Component = "button",
  children,
  loadingText,
  loadingVariant = "transparent",
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const buttonProps = useButton(props);

  return (
    <Component
      ref={ref}
      type="button"
      data-loading={buttonProps.loading}
      {...buttonProps}
      className={cn(
        buttonProps.className,
        // Đảm bảo mọi nội dung luôn flex center
        "flex items-center justify-center gap-2 relative"
      )}
    >
      {buttonProps.loading && (
        <span className="absolute left-4 flex items-center justify-center">
          <Spinner className={loadingVariant === "default" ? "relative" : ""} />
        </span>
      )}
      {leftIcon ? (
        buttonProps.loading ? (
          <span
            className={loadingVariant === "default" ? "hidden" : "opacity-0"}
          >
            {leftIcon}
          </span>
        ) : (
          leftIcon
        )
      ) : null}
      {children || loadingText ? (
        buttonProps.loading ? (
          <span
            className={cn("flex-1 flex items-center justify-center", {
              "opacity-0": loadingVariant === "transparent",
            })}
          >
            {loadingText || children}
          </span>
        ) : (
          children
        )
      ) : null}
      {rightIcon ? (
        buttonProps.loading ? (
          <span
            className={cn({ "opacity-0": loadingVariant === "transparent" })}
          >
            {rightIcon}
          </span>
        ) : (
          rightIcon
        )
      ) : null}
    </Component>
  );
}

Button.displayName = "Button";
