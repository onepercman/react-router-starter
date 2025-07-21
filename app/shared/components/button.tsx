"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { cn } from "~/shared/utils";
import { Spinner } from "./spinner";

export const button = tv({
  base: [
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold",
    "cursor-pointer border-0 border-transparent outline-none ring ring-transparent transition-all",
    "h-[var(--button-size)] min-h-[var(--button-size)] min-w-[var(--button-size)] px-2 text-xs",
    "[&:not(:disabled)]:active:brightness-105",
    "disabled:cursor-not-allowed disabled:opacity-75 disabled:saturate-0 disabled:data-[loading]:saturate-50",
  ],
  variants: {
    size: {
      xs: "px-2 text-xs [--button-size:1.25rem]",
      sm: "px-2 text-sm [--button-size:1.5rem]",
      md: "px-4 text-sm [--button-size:2.25rem]",
      lg: "px-4 [--button-size:2.75rem]",
    },
    variant: {
      default: "border-0",
      outlined: "border-2",
      ghost: "border-0 bg-transparent",
      light: "border-0",
    },
    color: {
      default: "",
      primary: "",
      accent: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    shape: {
      normal: "rounded",
      pill: "rounded-full",
      circle: "aspect-square rounded-full p-0",
      square: "aspect-square rounded p-0",
    },
  },
  compoundVariants: [
    // default variant
    {
      variant: "default",
      color: "default",
      class: ["bg-secondary"],
    },
    {
      variant: "default",
      color: "primary",
      class: [
        "bg-primary",
        "text-primary-foreground",
        "[&:not(:disabled)]:hover:bg-primary-focus",
      ],
    },
    {
      variant: "default",
      color: "info",
      class: [
        "bg-info",
        "text-info-foreground",
        "[&:not(:disabled)]:hover:bg-info-focus",
      ],
    },
    {
      variant: "default",
      color: "success",
      class: [
        "bg-success",
        "text-success-foreground",
        "[&:not(:disabled)]:hover:bg-success-focus",
      ],
    },
    {
      variant: "default",
      color: "warning",
      class: [
        "bg-warning",
        "text-warning-foreground",
        "[&:not(:disabled)]:hover:bg-warning-focus",
      ],
    },
    {
      variant: "default",
      color: "error",
      class: [
        "bg-error",
        "text-error-foreground",
        "[&:not(:disabled)]:hover:bg-error-focus",
      ],
    },
    {
      variant: "default",
      color: "accent",
      class: [
        "bg-accent",
        "text-accent-foreground",
        "[&:not(:disabled)]:hover:bg-accent-focus",
      ],
    },
    // light variant
    {
      variant: "light",
      color: "default",
      class: [
        "bg-secondary-muted",
        "text-foreground",
        "[&:not(:disabled)]:hover:bg-secondary",
      ],
    },
    {
      variant: "light",
      color: "primary",
      class: [
        "bg-primary-muted",
        "text-primary",
        "[&:not(:disabled)]:hover:bg-primary-subtle",
      ],
    },
    {
      variant: "light",
      color: "info",
      class: [
        "bg-info-muted",
        "text-info",
        "[&:not(:disabled)]:hover:bg-info-subtle",
      ],
    },
    {
      variant: "light",
      color: "success",
      class: [
        "bg-success-muted",
        "text-success",
        "[&:not(:disabled)]:hover:bg-success-subtle",
      ],
    },
    {
      variant: "light",
      color: "warning",
      class: [
        "bg-warning-muted",
        "text-warning",
        "[&:not(:disabled)]:hover:bg-warning-subtle",
      ],
    },
    {
      variant: "light",
      color: "error",
      class: [
        "bg-error-muted",
        "text-error",
        "[&:not(:disabled)]:hover:bg-error-subtle",
      ],
    },
    {
      variant: "light",
      color: "accent",
      class: [
        "bg-accent-muted",
        "text-accent",
        "[&:not(:disabled)]:hover:bg-accent-subtle",
      ],
    },
    // outlined variant
    {
      variant: "outlined",
      color: "default",
      class: [
        "border-border text-foreground",
        "[&:not(:disabled)]:hover:border-border [&:not(:disabled)]:hover:bg-secondary",
      ],
    },
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border-primary text-primary",
        "[&:not(:disabled)]:hover:border-primary-focus [&:not(:disabled)]:hover:bg-primary-subtle",
      ],
    },
    {
      variant: "outlined",
      color: "info",
      class: [
        "border-info text-info",
        "[&:not(:disabled)]:hover:border-info-focus [&:not(:disabled)]:hover:bg-info-subtle",
      ],
    },
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-success text-success",
        "[&:not(:disabled)]:hover:border-success-focus [&:not(:disabled)]:hover:bg-success-subtle",
      ],
    },
    {
      variant: "outlined",
      color: "warning",
      class: [
        "border-warning text-warning",
        "[&:not(:disabled)]:hover:border-warning-focus [&:not(:disabled)]:hover:bg-warning-subtle",
      ],
    },
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-error text-error",
        "[&:not(:disabled)]:hover:border-error-focus [&:not(:disabled)]:hover:bg-error-subtle",
      ],
    },
    {
      variant: "outlined",
      color: "accent",
      class: [
        "border-accent text-accent",
        "[&:not(:disabled)]:hover:border-accent-focus [&:not(:disabled)]:hover:bg-accent-subtle",
      ],
    },
    // ghost variant
    {
      variant: "ghost",
      color: "default",
      class: ["text-foreground", "[&:not(:disabled)]:hover:bg-secondary"],
    },
    {
      variant: "ghost",
      color: "primary",
      class: ["text-primary", "[&:not(:disabled)]:hover:bg-primary-subtle"],
    },
    {
      variant: "ghost",
      color: "info",
      class: ["text-info", "[&:not(:disabled)]:hover:bg-info-subtle"],
    },
    {
      variant: "ghost",
      color: "success",
      class: ["text-success", "[&:not(:disabled)]:hover:bg-success-subtle"],
    },
    {
      variant: "ghost",
      color: "warning",
      class: ["text-warning", "[&:not(:disabled)]:hover:bg-warning-subtle"],
    },
    {
      variant: "ghost",
      color: "error",
      class: ["text-error", "[&:not(:disabled)]:hover:bg-error-subtle"],
    },
    {
      variant: "ghost",
      color: "accent",
      class: ["text-accent", "[&:not(:disabled)]:hover:bg-accent-subtle"],
    },
  ],
  defaultVariants: {
    size: "md",
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

  const className = button({ size, variant, color, shape });

  return {
    ...props,
    onClick: handleClick,
    disabled: disabled || isLoading,
    loading: isLoading,
    className,
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
    >
      {buttonProps.loading && (
        <Spinner
          className={loadingVariant === "default" ? "relative" : "absolute"}
        />
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
            className={cn({ "opacity-0": loadingVariant === "transparent" })}
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
