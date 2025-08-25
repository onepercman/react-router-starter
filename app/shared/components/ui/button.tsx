import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/shared/utils"
import { Spinner } from "./spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonBaseProps {
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactElement | React.ReactNode
  rightIcon?: React.ReactElement | React.ReactNode
  loadingVariant?: "default" | "transparent"
}

export interface ButtonProps
  extends ButtonBaseProps,
    React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function useButton({
  onClick,
  loading,
  disabled,
  variant,
  size,
  className,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonClassName = buttonVariants({ variant, size, className })

  const [asyncLoading, setAsyncLoading] = React.useState(false)

  async function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (!onClick) return

    if (onClick.constructor.name === "AsyncFunction") {
      try {
        setAsyncLoading(true)
        await onClick(ev)
      } catch (err) {
        throw new Error(err as any)
      } finally {
        setAsyncLoading(false)
      }
    } else {
      onClick(ev)
    }
  }

  const _loading = Boolean(asyncLoading || loading)

  return {
    ...props,
    className: buttonClassName,
    onClick: handleClick,
    loading: _loading,
    disabled: _loading || disabled,
  }
}

function Button({
  children,
  loadingText,
  loadingVariant = "transparent",
  leftIcon,
  rightIcon,
  asChild = false,
  ...props
}: ButtonProps) {
  const buttonProps = useButton(props)

  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
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
    </Comp>
  )
}

export { Button, buttonVariants }
