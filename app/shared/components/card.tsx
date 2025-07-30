import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const card = tv({
  slots: {
    base: "rounded-xl bg-background text-foreground",
    header: "mb-4",
    title: "text-lg font-semibold text-foreground",
    content: "",
  },
  variants: {
    padding: {
      none: "p-0",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      default: "shadow",
    },
    border: {
      none: "border-0",
      default: "border border-border",
      strong: "border-2 border-border",
      info: "border-2 border-info-muted",
      success: "border-2 border-success-muted",
      warning: "border-2 border-warning-muted",
      accent: "border-2 border-accent-muted",
      primary: "border-2 border-primary-muted",
    },
    bg: {
      default: "bg-background",
      gradient: "bg-gradient-to-r from-primary-subtle to-accent-subtle",
    },
  },
  defaultVariants: {
    padding: "md",
    shadow: "default",
    border: "default",
    bg: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

export function Card({
  className,
  padding,
  shadow,
  border,
  bg,
  ...props
}: CardProps) {
  const classes = card({ padding, shadow, border, bg });
  return <div className={classes.base({ class: className })} {...props} />;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  const classes = card();
  return <div className={classes.header({ class: className })} {...props} />;
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  const classes = card();
  return <h3 className={classes.title({ class: className })} {...props} />;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className, ...props }: CardContentProps) {
  const classes = card();
  return <div className={classes.content({ class: className })} {...props} />;
}
