// Environment configuration with type safety and validation
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",

  // App Environment
  NODE_ENV: import.meta.env.NODE_ENV || "development",

  // Feature Flags
  FEATURE_FLAGS: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    enableDevTools: import.meta.env.VITE_ENABLE_DEV_TOOLS === "true",
    enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE === "true",
  },

  // Build Information
  BUILD_INFO: {
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
    buildDate: import.meta.env.VITE_BUILD_DATE || new Date().toISOString(),
    gitCommit: import.meta.env.VITE_GIT_COMMIT || "unknown",
  },
} as const;

// Environment helpers
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

// Validation - throws error if required env vars are missing
function validateEnvironment() {
  const required = ["VITE_API_URL"];
  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0 && isProduction) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

// Run validation
if (isProduction) {
  validateEnvironment();
}
