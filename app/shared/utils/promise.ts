/**
 * Creates a promise that resolves after specified milliseconds
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after delay
 * @example
 * await sleep(1000) // Wait 1 second
 */
export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
