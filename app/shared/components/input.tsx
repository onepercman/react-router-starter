import { Eye, EyeOff, X } from "lucide-react";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "~/shared/utils";

export const input = tv({
  base: [
    "inline-flex cursor-text items-center gap-2 overflow-hidden rounded-lg border transition-all duration-200",
    "bg-background text-foreground",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
    "h-[var(--input-size)] min-h-[var(--input-size)] w-full px-4 text-base",
    "hover:border-border",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-background",
  ],
  slots: {
    input: [
      "h-full w-full bg-transparent outline-none ring-0 focus:outline-none focus:ring-0",
      "placeholder:text-secondary",
      "disabled:cursor-not-allowed",
      "[&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(var(--color-background))]",
    ],
    addonBefore: "rounded-r-none border-r-0",
    addonAfter: "rounded-l-none border-l-0",
  },
  variants: {
    size: {
      xs: "px-3 text-xs [--input-size:1.75rem]",
      sm: "px-3 text-sm [--input-size:2rem]",
      md: "px-4 text-sm [--input-size:2.5rem]",
      lg: "px-4 text-base [--input-size:3rem]",
    },
    variant: {
      outlined: "border-input",
      filled: "bg-background border-transparent",
      ghost: "border-transparent bg-transparent hover:bg-background",
    },
    invalid: {
      true: {
        base: "border-error bg-error-subtle text-error-foreground focus-within:border-error focus-within:ring-error/20",
        input: "placeholder:text-error/60",
      },
    },
  },
  defaultVariants: {
    size: "lg",
    variant: "outlined",
  },
});

export interface InputFieldProps {
  prefix?: React.ReactNode | React.ReactElement;
  suffix?: React.ReactNode | React.ReactElement;
  addonBefore?: React.ReactNode | React.ReactElement;
  addonAfter?: React.ReactNode | React.ReactElement;
  clearable?: boolean;
  transform?(value: string): string;
}

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "variant" | "invalid"
    >,
    InputFieldProps,
    VariantProps<typeof input> {
  ref?: React.Ref<HTMLInputElement>;
  as?: React.ElementType;
  classNames?: {
    base?: string;
    input?: string;
    addonBefore?: string;
    addonAfter?: string;
  };
}

// Simple ref composition helper
function setRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object") {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function Input({
  ref,
  as: Component = "input",
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  size,
  variant,
  invalid,
  clearable,
  onChange,
  transform,
  className,
  classNames,
  ...props
}: InputProps) {
  const styles = input({ size, variant, invalid });

  const internalRef = React.useRef<HTMLInputElement>(null);
  const [showClear, setShowClear] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Determine the actual input type based on showPassword state
  const inputType =
    props.type === "password" && showPassword ? "text" : props.type;

  // Compose refs manually
  const composedRef = React.useCallback(
    (element: HTMLInputElement | null) => {
      internalRef.current = element;
      setRef(ref, element);
    },
    [ref]
  );

  function getTogglePassword() {
    if (props.type === "password") {
      const IconComponent = showPassword ? EyeOff : Eye;
      return (
        <IconComponent
          className="h-4 w-4 cursor-pointer text-secondary hover:text-foreground transition-colors shrink-0"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    }
  }

  function getClear() {
    if (showClear && clearable) {
      return (
        <X
          className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground transition-colors shrink-0"
          onClick={() => {
            if (internalRef.current) {
              internalRef.current.value = "";
              setShowClear(false);
              if (onChange) {
                const syntheticEvent = {
                  target: internalRef.current,
                  currentTarget: internalRef.current,
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(syntheticEvent);
              }
            }
          }}
        />
      );
    }
    return null;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    if (transform) {
      value = transform(value);
      event.target.value = value;
    }

    setShowClear(Boolean(value && clearable));

    if (onChange) {
      onChange(event);
    }
  }

  function _renderPrefix() {
    const element = prefix as React.ReactElement;
    if (!element) return null;
    return <span className="text-secondary shrink-0">{element}</span>;
  }

  function _renderSuffix() {
    const element = suffix as React.ReactElement;
    if (!element) return null;
    return <span className="text-muted-foreground shrink-0">{element}</span>;
  }

  function _renderAddonBefore() {
    const element = addonBefore as React.ReactElement;
    if (!element) return null;
    if (React.isValidElement(element))
      return React.cloneElement(element as React.ReactElement<any>, {
        className: cn(
          styles.addonBefore({ class: classNames?.addonBefore }),
          (element.props as any)?.className
        ),
      });
    return (
      <span className={styles.addonBefore({ class: classNames?.addonBefore })}>
        {element}
      </span>
    );
  }

  function _renderAddonAfter() {
    const element = addonAfter as React.ReactElement;
    if (!element) return null;
    if (React.isValidElement(element))
      return React.cloneElement(element as React.ReactElement<any>, {
        className: cn(
          styles.addonAfter({ class: classNames?.addonAfter }),
          (element.props as any)?.className
        ),
      });
    return (
      <span className={styles.addonAfter({ class: classNames?.addonAfter })}>
        {element}
      </span>
    );
  }

  return (
    <label
      className={styles.base({
        className: cn(className, classNames?.base, {
          "pl-0": !!addonBefore,
          "pr-0": !!addonAfter,
        }),
      })}
    >
      {_renderAddonBefore()}
      {_renderPrefix()}
      <Component
        ref={composedRef}
        onChange={handleChange}
        className={styles.input({
          className: cn(className, classNames?.input),
        })}
        {...props}
        type={inputType}
      />
      {getClear()}
      {getTogglePassword()}
      {_renderSuffix()}
      {_renderAddonAfter()}
    </label>
  );
}

Input.displayName = "Input";

export default Input;
