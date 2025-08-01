"use client";

import React from "react";
import { cn, type ComposedTVProps, forwardRef } from "react-tvcx";
import { tv } from "tailwind-variants";
import { Spinner } from "./spinner";

export const button = tv({
  base: [
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold",
    "cursor-pointer border-0 border-transparent outline-none ring ring-transparent transition-all transition-colors transition-bg transition-border duration-150",
    "h-[var(--button-size)] min-h-[var(--button-size)] min-w-[var(--button-size)] px-3 text-xs",
    "[&:not(:disabled)]:active:brightness-105",
    "disabled:cursor-not-allowed disabled:opacity-75 disabled:saturate-0 disabled:data-[loading]:saturate-50",
  ],
  variants: {
    size: {
      xs: "px-2 text-xs [--button-size:1.75rem]",
      sm: "px-3 text-sm [--button-size:2rem]",
      md: "px-4 text-base [--button-size:2.5rem]",
      lg: "px-5 text-lg [--button-size:3rem]",
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
      normal: "rounded-xl",
      pill: "rounded-full",
      circle: "aspect-square rounded-full p-0",
      square: "aspect-square rounded-xl p-0",
    },
  },
  compoundVariants: [
    // default
    {
      variant: "default",
      color: "default",
      class: ["bg-default text-default-foreground"],
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
    // light
    {
      variant: "light",
      color: "default",
      class: [
        "bg-default-muted",
        "text-foreground",
        "[&:not(:disabled)]:hover:bg-default-subtle",
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
    // outlined
    {
      variant: "outlined",
      color: "default",
      class: ["border-border", "[&:not(:disabled)]:hover:bg-default-muted"],
    },
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border-primary text-primary",
        "[&:not(:disabled)]:hover:border-primary-focus [&:not(:disabled)]:hover:text-primary-focus",
      ],
    },
    {
      variant: "outlined",
      color: "info",
      class: [
        "border-info text-info",
        "[&:not(:disabled)]:hover:border-info-focus [&:not(:disabled)]:hover:text-info-focus",
      ],
    },
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-success text-success",
        "[&:not(:disabled)]:hover:border-success-focus [&:not(:disabled)]:hover:text-success-focus",
      ],
    },
    {
      variant: "outlined",
      color: "warning",
      class: [
        "border-warning text-warning",
        "[&:not(:disabled)]:hover:border-warning-focus [&:not(:disabled)]:hover:text-warning-focus",
      ],
    },
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-error text-error",
        "[&:not(:disabled)]:hover:border-error-focus [&:not(:disabled)]:hover:text-error-focus",
      ],
    },
    {
      variant: "outlined",
      color: "accent",
      class: [
        "border-accent text-accent",
        "[&:not(:disabled)]:hover:border-accent-focus [&:not(:disabled)]:hover:text-accent-focus",
      ],
    },
    // ghost
    {
      variant: "ghost",
      color: "default",
      class: ["text-foreground", "[&:not(:disabled)]:hover:bg-default-muted"],
    },
    {
      variant: "ghost",
      color: "primary",
      class: ["text-primary", "[&:not(:disabled)]:hover:bg-primary-muted"],
    },
    {
      variant: "ghost",
      color: "info",
      class: ["text-info", "[&:not(:disabled)]:hover:bg-info-muted"],
    },
    {
      variant: "ghost",
      color: "success",
      class: ["text-success", "[&:not(:disabled)]:hover:bg-success-muted"],
    },
    {
      variant: "ghost",
      color: "warning",
      class: ["text-warning", "[&:not(:disabled)]:hover:bg-warning-muted"],
    },
    {
      variant: "ghost",
      color: "error",
      class: ["text-error", "[&:not(:disabled)]:hover:bg-error-muted"],
    },
    {
      variant: "ghost",
      color: "accent",
      class: ["text-accent", "[&:not(:disabled)]:hover:bg-accent-muted"],
    },
  ],
  defaultVariants: {
    size: "md",
    variant: "default",
    color: "default",
    shape: "normal",
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
    ComposedTVProps<typeof button> {}

function useButton({
  onClick,
  loading,
  disabled,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = button(props);

  const [asyncLoading, setAsyncLoading] = React.useState(false);

  async function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (!onClick) return;

    if (onClick.constructor.name === "AsyncFunction") {
      try {
        setAsyncLoading(true);
        await onClick(ev);
      } catch (err) {
        throw new Error(err as any);
      } finally {
        setAsyncLoading(false);
      }
    } else {
      onClick(ev);
    }
  }

  const _loading = Boolean(asyncLoading || loading);

  return {
    ...props,
    className,
    onClick: handleClick,
    loading: _loading,
    disabled: _loading || disabled,
  };
}

export const Button = forwardRef<"button", ButtonProps>(
  (
    {
      as: Component = "button",
      children,
      loadingText,
      loadingVariant = "transparent",
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
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
);

Button.displayName = "Button";
