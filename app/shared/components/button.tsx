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
      class: ["bg-[var(--color-default)] text-[var(--color-foreground)]"],
    },
    {
      variant: "default",
      color: "primary",
      class: [
        "bg-[var(--color-primary)]",
        "text-[var(--color-primary-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-primary-hover)]",
      ],
    },
    {
      variant: "default",
      color: "info",
      class: [
        "bg-[var(--color-info)]",
        "text-[var(--color-info-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-info-hover)]",
      ],
    },
    {
      variant: "default",
      color: "success",
      class: [
        "bg-[var(--color-success)]",
        "text-[var(--color-success-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-success-hover)]",
      ],
    },
    {
      variant: "default",
      color: "warning",
      class: [
        "bg-[var(--color-warning)]",
        "text-[var(--color-warning-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-warning-hover)]",
      ],
    },
    {
      variant: "default",
      color: "error",
      class: [
        "bg-[var(--color-error)]",
        "text-[var(--color-error-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-error-hover)]",
      ],
    },
    {
      variant: "default",
      color: "accent",
      class: [
        "bg-[var(--color-accent)]",
        "text-[var(--color-accent-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-accent-hover)]",
      ],
    },
    // light
    {
      variant: "light",
      color: "default",
      class: [
        "bg-[var(--color-default)]/20",
        "text-[var(--color-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-default)]/50",
      ],
    },
    {
      variant: "light",
      color: "primary",
      class: [
        "bg-[var(--color-primary)]/20",
        "text-[var(--color-primary)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-primary)]/50",
      ],
    },
    {
      variant: "light",
      color: "info",
      class: [
        "bg-[var(--color-info)]/20",
        "text-[var(--color-info)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-info)]/50",
      ],
    },
    {
      variant: "light",
      color: "success",
      class: [
        "bg-[var(--color-success)]/20",
        "text-[var(--color-success)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-success)]/50",
      ],
    },
    {
      variant: "light",
      color: "warning",
      class: [
        "bg-[var(--color-warning)]/20",
        "text-[var(--color-warning)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-warning)]/50",
      ],
    },
    {
      variant: "light",
      color: "error",
      class: [
        "bg-[var(--color-error)]/20",
        "text-[var(--color-error)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-error)]/50",
      ],
    },
    {
      variant: "light",
      color: "accent",
      class: [
        "bg-[var(--color-accent)]/20",
        "text-[var(--color-accent)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-accent)]/50",
      ],
    },
    // outlined
    {
      variant: "outlined",
      color: "default",
      class: [
        "border-[var(--color-line)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-default)]/10",
      ],
    },
    {
      variant: "outlined",
      color: "primary",
      class: [
        "border-[var(--color-primary)] text-[var(--color-primary)]",
        "[&:not(:disabled)]:hover:border-[var(--color-primary-hover)] [&:not(:disabled)]:hover:text-[var(--color-primary-hover)]",
      ],
    },
    {
      variant: "outlined",
      color: "info",
      class: [
        "border-[var(--color-info)] text-[var(--color-info)]",
        "[&:not(:disabled)]:hover:border-[var(--color-info-hover)] [&:not(:disabled)]:hover:text-[var(--color-info-hover)]",
      ],
    },
    {
      variant: "outlined",
      color: "success",
      class: [
        "border-[var(--color-success)] text-[var(--color-success)]",
        "[&:not(:disabled)]:hover:border-[var(--color-success-hover)] [&:not(:disabled)]:hover:text-[var(--color-success-hover)]",
      ],
    },
    {
      variant: "outlined",
      color: "warning",
      class: [
        "border-[var(--color-warning)] text-[var(--color-warning)]",
        "[&:not(:disabled)]:hover:border-[var(--color-warning-hover)] [&:not(:disabled)]:hover:text-[var(--color-warning-hover)]",
      ],
    },
    {
      variant: "outlined",
      color: "error",
      class: [
        "border-[var(--color-error)] text-[var(--color-error)]",
        "[&:not(:disabled)]:hover:border-[var(--color-error-hover)] [&:not(:disabled)]:hover:text-[var(--color-error-hover)]",
      ],
    },
    {
      variant: "outlined",
      color: "accent",
      class: [
        "border-[var(--color-accent)] text-[var(--color-accent)]",
        "[&:not(:disabled)]:hover:border-[var(--color-accent-hover)] [&:not(:disabled)]:hover:text-[var(--color-accent-hover)]",
      ],
    },
    // ghost
    {
      variant: "ghost",
      color: "default",
      class: [
        "text-[var(--color-foreground)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-default)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "primary",
      class: [
        "text-[var(--color-primary)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-primary)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "info",
      class: [
        "text-[var(--color-info)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-info)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "success",
      class: [
        "text-[var(--color-success)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-success)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "warning",
      class: [
        "text-[var(--color-warning)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-warning)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "error",
      class: [
        "text-[var(--color-error)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-error)]/10",
      ],
    },
    {
      variant: "ghost",
      color: "accent",
      class: [
        "text-[var(--color-accent)]",
        "[&:not(:disabled)]:hover:bg-[var(--color-accent)]/10",
      ],
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
