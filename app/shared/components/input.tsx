"use client";

import { Eye, EyeOff, X as LuX } from "lucide-react";
import React from "react";
import { cn, type ComposedTVProps, forwardRef } from "react-tvcx";
import { tv } from "tailwind-variants";
import { useComposedRefs } from "use-composed-refs";

export const input = tv({
  base: [
    "inline-flex cursor-text items-center gap-2 overflow-hidden text-ellipsis rounded-xl border-2 border-transparent px-3 transition-all transition-colors transition-bg transition-border duration-150 focus-within:border-primary",
    "h-[var(--input-size)] min-h-[var(--input-size)] min-w-[var(--input-size)] px-3 text-xs",
  ],
  slots: {
    input: [
      "h-full grow self-stretch overflow-hidden text-ellipsis border-transparent bg-transparent p-0",
      "placeholder:text-muted-foreground autofill:[-webkit-background-clip:text] focus:outline-none focus:ring-transparent",
    ],
    addonBefore: "rounded-r-none",
    addonAfter: "rounded-l-none",
  },
  variants: {
    size: {
      xs: "px-2 text-xs [--input-size:1.75rem]",
      sm: "px-3 text-sm [--input-size:2rem]",
      md: "px-4 text-base [--input-size:2.5rem]",
      lg: "px-5 text-lg [--input-size:3rem]",
    },
    variant: {
      filled: "bg-muted",
      outlined: "border-border",
      blur: "bg-muted/20 backdrop-blur",
    },
    invalid: {
      true: {
        base: "border-2 border-error bg-error-muted text-error focus-within:border-error-focus",
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "outlined",
  },
});

export interface InputFieldProps {
  prefix?: React.ReactNode | React.ReactElement;
  suffix?: React.ReactNode | React.ReactElement;
  addonBefore?: React.ReactNode | React.ReactElement;
  addonAfter?: React.ReactNode | React.ReactElement;
  clearable?: boolean;
  transform?: (value: string) => string;
}

export interface InputProps
  extends InputFieldProps,
    ComposedTVProps<typeof input> {}

export const Input = forwardRef<"input", InputProps>(
  (
    {
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
    },
    ref
  ) => {
    const styles = input({ size, variant, invalid });

    const internalRef = React.useRef<HTMLInputElement>(null);
    const composedRef = useComposedRefs(ref, internalRef);

    const [showClear, setShowClear] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    function getTogglePassword() {
      if (props.type === "password") {
        if (showPassword) {
          return (
            <Eye
              className="ml-2"
              onClick={() => {
                if (internalRef.current) {
                  internalRef.current.type = "password";
                  setShowPassword(false);
                }
              }}
            />
          );
        }
        return (
          <EyeOff
            className="ml-2 text-secondary"
            onClick={() => {
              if (internalRef.current) {
                internalRef.current.type = "text";
                setShowPassword(true);
              }
            }}
          />
        );
      }
    }

    function getClear() {
      if (showClear && clearable) {
        return (
          <LuX
            className="cursor-pointer text-secondary"
            onClick={function () {
              if (internalRef.current) {
                setShowClear(false);
                internalRef.current.value = "";
                const currentTarget = internalRef.current.cloneNode(true);
                const event = Object.create(new Event("change"), {
                  target: { value: currentTarget },
                  currentTarget: { value: currentTarget },
                });
                if (onChange) onChange(event);
              }
            }}
          />
        );
      }
    }

    function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
      if (transform && internalRef.current) {
        internalRef.current.value = transform(internalRef.current.value);
      }
      if (onChange) onChange(ev);
      setShowClear(!!ev.target.value);
    }

    function _renderPrefix() {
      const element = prefix as React.ReactElement;
      if (!element) return null;

      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element);
      return <span>{element}</span>;
    }

    function _renderSuffix() {
      const element = suffix as React.ReactElement;
      if (!element) return null;
      if (typeof element === "object" && "type" in element)
        return React.cloneElement(element);
      return <span>{element}</span>;
    }

    function _renderAddonBefore() {
      const element = addonBefore as React.ReactElement;
      if (!element) return null;
      if (React.isValidElement<{ className?: string }>(element))
        return React.cloneElement(element, {
          className: styles.addonBefore({
            class: cn(
              (element.props as any).className,
              classNames?.addonBefore
            ),
          }),
        });
      return (
        <span
          className={styles.addonBefore({ class: classNames?.addonBefore })}
        >
          {element}
        </span>
      );
    }

    function _renderAddonAfter() {
      const element = addonAfter as React.ReactElement;
      if (!element) return null;
      if (React.isValidElement<{ className?: string }>(element))
        return React.cloneElement(element, {
          className: styles.addonAfter({
            class: cn((element.props as any).className, classNames?.addonAfter),
          }),
        });
      return (
        <span className={styles.addonAfter({ class: classNames?.addonAfter })}>
          {element}
        </span>
      );
    }

    return (
      <label
        role="input"
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
          className={styles.input({ class: classNames?.input })}
          {...props}
        />
        {getClear()}
        {getTogglePassword()}
        {_renderSuffix()}
        {_renderAddonAfter()}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
