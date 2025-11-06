import { composeRenderProps } from "react-aria-components"
import { type ClassNameValue, twMerge } from "tailwind-merge"

/**
 * @deprecated Use cx instead
 */
export function composeTailwindRenderProps<T>(
	className: string | ((v: T) => string) | undefined,
	tailwind: ClassNameValue,
): string | ((v: T) => string) {
	return composeRenderProps(className, (className) =>
		twMerge(tailwind, className),
	)
}

type Render<T> = string | ((v: T) => string) | undefined

type CxArgs<T> =
	| [...ClassNameValue[], Render<T>]
	| [[...ClassNameValue[], Render<T>]]

/**
 * Merges Tailwind classes with React Aria Components render props
 * Handles both static className strings and dynamic render functions
 * @param args - Array of className values and optional render function
 * @returns Merged className string or render function
 * @example
 * cx("base-class", "extra-class", className)
 * cx("p-4", isHovered => isHovered ? "bg-blue-500" : "bg-gray-500")
 */
export function cx<T = unknown>(
	...args: CxArgs<T>
): string | ((v: T) => string) {
	let resolvedArgs = args
	if (args.length === 1 && Array.isArray(args[0])) {
		resolvedArgs = args[0] as [...ClassNameValue[], Render<T>]
	}

	const className = resolvedArgs.pop() as Render<T>
	const tailwinds = resolvedArgs as ClassNameValue[]

	const fixed = twMerge(...tailwinds)

	return composeRenderProps(className, (cn) => twMerge(fixed, cn))
}
