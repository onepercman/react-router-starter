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

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <div className="text-center space-y-4">
          <div className="text-4xl">😕</div>
          <h2 className="text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground">
            We're sorry, but something unexpected happened. Please try again.
          </p>

          {isDevelopment && error && (
            <details className="text-left text-sm">
              <summary className="cursor-pointer font-medium text-error mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="bg-error-muted p-3 rounded text-error overflow-auto max-h-40">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}

          <div className="flex gap-3 justify-center">
            <Button color="primary" onClick={resetErrorBoundary}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
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
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    logError(error, errorInfo)
    onError?.(error, errorInfo)
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
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-muted-foreground mb-4">
          Error in {moduleName} module. Please try refreshing.
        </p>
        <Button color="primary" onClick={resetErrorBoundary}>
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
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center space-y-4">
          <div className="text-4xl">{error.status === 404 ? "🔍" : "⚠️"}</div>
          <h2 className="text-xl font-semibold text-foreground">
            {error.status === 404 ? "Page Not Found" : `Error ${error.status}`}
          </h2>
          <p className="text-muted-foreground">
            {error.status === 404
              ? "The page you're looking for doesn't exist."
              : error.statusText || "Something went wrong."}
          </p>
          <Button color="primary" onClick={() => window.history.back()}>
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
