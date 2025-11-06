/**
 * Formats a number as currency with locale-specific formatting
 * @param amount - The numeric value to format
 * @param currency - ISO 4217 currency code (default: "USD")
 * @returns Formatted currency string (e.g., "$99.99")
 */
export function formatCurrency(amount: number, currency = "USD"): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount)
}

/**
 * Formats a date with customizable options
 * @param date - Date object or ISO string
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string (default: "Jan 1, 2025")
 */
export function formatDate(
	date: Date | string,
	options?: Intl.DateTimeFormatOptions,
): string {
	const dateObj = typeof date === "string" ? new Date(date) : date

	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	}

	return new Intl.DateTimeFormat("en-US", {
		...defaultOptions,
		...options,
	}).format(dateObj)
}

/**
 * Formats a date as relative time from now
 * @param date - Date object or ISO string
 * @returns Human-readable relative time (e.g., "2 hours ago", "just now")
 */
export function formatRelativeTime(date: Date | string): string {
	const now = new Date()
	const dateObj = typeof date === "string" ? new Date(date) : date
	const diffInMs = now.getTime() - dateObj.getTime()

	const units = [
		{ unit: "year", ms: 365 * 24 * 60 * 60 * 1000 },
		{ unit: "month", ms: 30 * 24 * 60 * 60 * 1000 },
		{ unit: "day", ms: 24 * 60 * 60 * 1000 },
		{ unit: "hour", ms: 60 * 60 * 1000 },
		{ unit: "minute", ms: 60 * 1000 },
		{ unit: "second", ms: 1000 },
	]

	for (const { unit, ms } of units) {
		const value = Math.floor(diffInMs / ms)
		if (value > 0) {
			return `${value} ${unit}${value > 1 ? "s" : ""} ago`
		}
	}

	return "just now"
}

/**
 * Formats a number with locale-specific thousands separators
 * @param num - Number to format
 * @returns Formatted number string (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
	return new Intl.NumberFormat("en-US").format(num)
}

/**
 * Formats a decimal value as percentage
 * @param value - Decimal value (0.5 = 50%)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string (e.g., "50.0%")
 */
export function formatPercentage(value: number, decimals = 1): string {
	return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Formats bytes as human-readable file size
 * @param bytes - Size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB", "500 KB")
 */
export function formatFileSize(bytes: number): string {
	const units = ["B", "KB", "MB", "GB", "TB"]
	let size = bytes
	let unitIndex = 0

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024
		unitIndex++
	}

	return `${size.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Formats US phone number to standard format
 * @param phone - Phone number string (digits only or any format)
 * @returns Formatted phone number (e.g., "(123) 456-7890") or original if invalid
 */
export function formatPhoneNumber(phone: string): string {
	const cleaned = phone.replace(/\D/g, "")
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`
	}

	return phone
}

/**
 * Truncates text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with "..." or original if within limit
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text
	return `${text.slice(0, maxLength)}...`
}

/**
 * Capitalizes first letter and lowercases the rest
 * @param str - String to capitalize
 * @returns Capitalized string (e.g., "Hello")
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Converts text to URL-friendly slug
 * @param text - Text to convert
 * @returns URL-safe slug (e.g., "hello-world")
 */
export function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim()
}
