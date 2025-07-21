// UI Components
export * from "./button";
export { ErrorBoundary } from "./error-boundary";
export * from "./input";
export { PageHeader } from "./page-header";
export * from "./spinner";
export { ThemeToggle } from "./theme-toggle";
export { UiCard, UiCardContent, UiCardHeader, UiCardTitle } from "./ui-card";

// Error Handling (Modern functional approach)
export {
  ModuleErrorBoundary,
  RouteErrorBoundary,
  useAsyncError,
  useErrorHandler,
} from "./error-boundary";

// Layout Components
export { MainLayout } from "~/shared/layouts/main-layout";
