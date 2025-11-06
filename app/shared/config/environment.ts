export const env = {
	API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
	NODE_ENV: import.meta.env.NODE_ENV || "development",
} as const

export const isDevelopment = env.NODE_ENV === "development"
export const isProduction = env.NODE_ENV === "production"
export const isTest = env.NODE_ENV === "test"

function validateEnvironment() {
	const required = ["VITE_API_URL"]
	const missing = required.filter((key) => !import.meta.env[key])

	if (missing.length > 0 && isProduction) {
		throw new Error(
			`Missing required environment variables: ${missing.join(", ")}`,
		)
	}
}

if (isProduction) {
	validateEnvironment()
}
