import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges className strings with Tailwind CSS conflict resolution
 * Handles conditional classes, arrays, objects, and deduplicates conflicting Tailwind classes
 * @param inputs - Class values (strings, objects, arrays, booleans, undefined)
 * @returns Merged className string with conflicts resolved
 * @example
 * cn("px-2 py-1", "px-4") // "py-1 px-4" - later px-4 overrides px-2
 * cn("flex", isActive ? "bg-primary" : "bg-transparent")
 * cn("flex", { "bg-primary": isActive, "bg-transparent": !isActive })
 * cn("text-lg", ["font-bold", condition && "underline"])
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
