import { Search, X } from "lucide-react"
import type { ErrorInfo, ReactNode } from "react"
import type { FallbackProps } from "react-error-boundary"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { isRouteErrorResponse } from "react-router"
import { Button, Card } from "./ui"

// Error logging function
function logError(error: Error, errorInfo: ErrorInfo & { module?: string }) {
	console.error("ErrorBoundary caught an error:", error, errorInfo)

	// In production, send to error tracking service
	if (import.meta.env.PROD) {
		// Example: Sentry, LogRocket, etc.
		// sendErrorToService({ error, errorInfo });
	}
}

// Default error fallback component
function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const isDevelopment = import.meta.env.NODE_ENV === "development"

	// Type guard to ensure error is an Error object
	const errorObj = error instanceof Error ? error : new Error(String(error))

	return (
		<div className="flex min-h-100 items-center justify-center p-4">
			<Card className="w-full max-w-lg">
				<div className="space-y-4 text-center">
					<X className="mx-auto size-12 text-muted-fg" />
					<h2 className="font-semibold text-fg text-xl">
						Something went wrong
					</h2>
					<p className="text-muted-fg">
						We're sorry, but something unexpected happened. Please try again.
					</p>

					{isDevelopment && (
						<details className="text-left text-sm">
							<summary className="mb-2 cursor-pointer font-medium text-danger">
								Error Details (Development Only)
							</summary>
							<pre className="max-h-40 overflow-auto rounded bg-danger-subtle p-3 text-danger">
								{errorObj.message}
								{"\n"}
								{errorObj.stack}
							</pre>
						</details>
					)}

					<div className="flex justify-center gap-3">
						<Button intent="primary" onClick={resetErrorBoundary}>
							Try Again
						</Button>
						<Button intent="outline" onClick={() => window.location.reload()}>
							Reload Page
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}

// Modern Error Boundary wrapper
interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: React.ComponentType<FallbackProps>
	onError?: (error: Error, errorInfo: ErrorInfo) => void
	resetKeys?: Array<string | number>
}

export function ErrorBoundary({
	children,
	fallback = DefaultErrorFallback,
	onError,
	resetKeys,
}: ErrorBoundaryProps) {
	const handleError = (error: unknown, errorInfo: ErrorInfo) => {
		const errorObj = error instanceof Error ? error : new Error(String(error))
		logError(errorObj, errorInfo)
		onError?.(errorObj, errorInfo)
	}

	return (
		<ReactErrorBoundary
			FallbackComponent={fallback}
			onError={handleError}
			resetKeys={resetKeys}
		>
			{children}
		</ReactErrorBoundary>
	)
}

// Module-specific error boundary
interface ModuleErrorBoundaryProps {
	children: ReactNode
	moduleName: string
	fallback?: React.ComponentType<FallbackProps>
	onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export function ModuleErrorBoundary({
	children,
	moduleName,
	fallback,
	onError,
}: ModuleErrorBoundaryProps) {
	const handleError = (error: Error, errorInfo: ErrorInfo) => {
		// Log module-specific error
		console.error(`[${moduleName}] Module error:`, error, errorInfo)

		// Call custom handler
		onError?.(error, errorInfo)

		// Log error with module context
		logError(error, { ...errorInfo, module: moduleName })
	}

	const ModuleFallback =
		fallback ||
		(({ resetErrorBoundary }: FallbackProps) => (
			<div className="p-4 text-center">
				<X className="mx-auto mb-2 size-12 text-warning" />
				<p className="mb-4 text-muted-fg">
					Error in {moduleName} module. Please try refreshing.
				</p>
				<Button intent="primary" onClick={resetErrorBoundary}>
					Retry
				</Button>
			</div>
		))

	return (
		<ErrorBoundary fallback={ModuleFallback} onError={handleError}>
			{children}
		</ErrorBoundary>
	)
}

// Route error boundary for React Router v7
export function RouteErrorBoundary({ error }: { error: unknown }) {
	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex min-h-100 items-center justify-center p-4">
				<Card className="w-full max-w-lg space-y-4 text-center">
					{error.status === 404 ? (
						<Search className="mx-auto size-12 text-muted-fg" />
					) : (
						<X className="mx-auto size-12 text-warning" />
					)}
					<h2 className="font-semibold text-fg text-xl">
						{error.status === 404 ? "Page Not Found" : `Error ${error.status}`}
					</h2>
					<p className="text-muted-fg">
						{error.status === 404
							? "The page you're looking for doesn't exist."
							: error.statusText || "Something went wrong."}
					</p>
					<Button intent="primary" onClick={() => window.history.back()}>
						Go Back
					</Button>
				</Card>
			</div>
		)
	}

	return (
		<DefaultErrorFallback
			error={error instanceof Error ? error : new Error("Unknown error")}
			resetErrorBoundary={() => window.location.reload()}
		/>
	)
}

// Custom hook for error handling in components
export function useErrorHandler() {
	return (error: Error, errorInfo?: ErrorInfo) => {
		logError(error, errorInfo || { componentStack: null })
		throw error // Re-throw to be caught by error boundary
	}
}

// Async error handler hook
export function useAsyncError() {
	return (error: Error) => {
		logError(error, { componentStack: null })
		throw error
	}
}
