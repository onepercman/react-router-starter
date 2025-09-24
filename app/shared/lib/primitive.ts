import { composeRenderProps } from "react-aria-components"
import { type ClassNameValue, twMerge } from "tailwind-merge"

/** @deprecated Use cx */
export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: ClassNameValue
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) =>
    twMerge(tailwind, className)
  )
}

type Render<T> = string | ((v: T) => string) | undefined

// Overload for static className usage (returns string)
export function cx(...classes: ClassNameValue[]): string
// Overload for React Aria render props (returns string | function)
// eslint-disable-next-line no-redeclare
export function cx<T = unknown>(
  ...args: [...ClassNameValue[], Render<T>]
): string | ((v: T) => string)

// eslint-disable-next-line no-redeclare
export function cx<T = unknown>(
  ...args: ClassNameValue[] | [...ClassNameValue[], Render<T>]
): string | ((v: T) => string) {
  // Handle array input (legacy support)
  let resolvedArgs = args
  if (args.length === 1 && Array.isArray(args[0])) {
    resolvedArgs = args[0] as [...ClassNameValue[], Render<T>]
  }

  // Check if last argument is a render function
  const lastArg = resolvedArgs[resolvedArgs.length - 1]
  const hasRenderProp = typeof lastArg === "function" || typeof lastArg === "undefined"

  if (!hasRenderProp) {
    // Static className usage - merge all classes and return string
    return twMerge(...(resolvedArgs as ClassNameValue[]))
  }

  // React Aria render props usage
  const className = resolvedArgs.pop() as Render<T>
  const tailwinds = resolvedArgs as ClassNameValue[]
  const fixed = twMerge(...tailwinds)

  return composeRenderProps(className, (cn) => twMerge(fixed, cn))
}
