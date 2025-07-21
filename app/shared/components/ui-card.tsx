import type { HTMLAttributes } from "react";

interface UiCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "none";
}

export function UiCard({
  children,
  padding = "md",
  shadow = "md",
  className = "",
  ...props
}: UiCardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const classes = `bg-card text-card-foreground rounded-lg border border-border ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

interface UiCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function UiCardHeader({
  children,
  className = "",
  ...props
}: UiCardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

interface UiCardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function UiCardTitle({
  children,
  className = "",
  ...props
}: UiCardTitleProps) {
  return (
    <h3
      className={`text-lg font-semibold text-card-foreground ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

interface UiCardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function UiCardContent({
  children,
  className = "",
  ...props
}: UiCardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
