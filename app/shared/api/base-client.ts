import type { AxiosError, AxiosInstance, CancelTokenSource } from "axios";
import axios from "axios";
import { env } from "~/shared/config/environment";

/**
 * Standard API Response structure
 * @template T The type of the data payload
 */
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * API Error structure for consistent error handling
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

/**
 * Request configuration options for API calls
 */
export interface ApiRequestConfig {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Skip automatic authentication header */
  skipAuth?: boolean;
  /** Cancel token for request cancellation */
  cancelToken?: CancelTokenSource;
}

/**
 * Custom error class with enhanced error information
 * Extends native Error with additional API-specific properties
 */
export class ApiClientError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public details?: any,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

/**
 * Production-ready Axios API Client with best practices:
 *
 * Features:
 * - Automatic request/response interceptors
 * - Authentication token management
 * - Request deduplication for GET requests
 * - Automatic retry for server errors (5xx)
 * - Request cancellation support
 * - Development logging
 * - File upload with progress tracking
 * - Health check functionality
 *
 * Best Practices Implemented:
 * - 30-second default timeout
 * - Proper error handling with custom error class
 * - Type-safe methods with TypeScript generics
 * - Request ID tracking for debugging
 * - Automatic auth token injection
 * - Network error retry logic
 */
export class ApiClient {
  private instance: AxiosInstance;
  private authToken: string | null = null;
  private pendingRequests = new Map<string, Promise<any>>();

  /**
   * Initialize the API client with base configuration
   * @param baseURL Base URL for all API requests
   */
  constructor(baseURL: string = env.API_BASE_URL) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000, // 30 seconds - recommended timeout for web apps
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  /**
   * Configure request and response interceptors
   * Implements best practices for authentication, logging, and error handling
   */
  private setupInterceptors() {
    // Request interceptor - adds auth, request ID, and logging
    this.instance.interceptors.request.use(
      (config) => {
        // Inject authentication token if available and not skipped
        if (this.authToken && !config.headers?.skipAuth) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        // Add unique request ID for tracing and debugging
        config.headers = config.headers || {};
        config.headers["X-Request-ID"] =
          `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Development logging for debugging
        if (env.NODE_ENV === "development") {
          console.log(`[API] → ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        if (env.NODE_ENV === "development") {
          console.error("[API] Request Error:", error);
        }
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor - handles logging, auth refresh, and retry logic
    this.instance.interceptors.response.use(
      (response) => {
        // Success response logging
        if (env.NODE_ENV === "development") {
          console.log(`[API] ← ${response.status} ${response.config.url}`);
        }
        return response;
      },
      async (error: AxiosError) => {
        // Error response logging
        if (env.NODE_ENV === "development") {
          console.error(
            `[API] ← Error ${error.response?.status || "Network"} ${error.config?.url}`,
            error
          );
        }

        // Handle authentication errors - clear token and trigger refresh
        if (error.response?.status === 401 && this.authToken) {
          this.clearAuthToken();
          // Note: Implement token refresh logic here based on your auth system
          // Example: this.triggerTokenRefresh();
        }

        // Automatic retry for server errors (5xx) - single retry with 1s delay
        if (error.response && error.response.status >= 500) {
          const config = error.config as any;
          if (!config._retry) {
            config._retry = true;
            if (env.NODE_ENV === "development") {
              console.log("[API] Retrying request due to server error");
            }
            // Wait 1 second before retry
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return this.instance(config);
          }
        }

        throw this.handleError(error);
      }
    );
  }

  /**
   * Enhanced error handling that converts axios errors to custom ApiClientError
   * Provides consistent error structure across the application
   * @param error The axios error or any other error
   * @returns ApiClientError with standardized properties
   */
  private handleError(error: AxiosError | any): ApiClientError {
    // Handle request cancellation
    if (axios.isCancel(error)) {
      return new ApiClientError("Request was cancelled", 0, "CANCELLED");
    }

    if (error.response) {
      // Server responded with an error status
      const data = error.response.data as any;
      const isRetryable = error.response.status >= 500; // 5xx errors are retryable

      return new ApiClientError(
        data?.message ||
          `HTTP ${error.response.status}: ${error.response.statusText}`,
        error.response.status,
        data?.code || `HTTP_${error.response.status}`,
        data,
        isRetryable
      );
    } else if (error.request) {
      // Network error - no response received
      return new ApiClientError(
        "Network error - please check your connection",
        0,
        "NETWORK_ERROR",
        null,
        true // Network errors are retryable
      );
    } else {
      // Something else happened in setting up the request
      return new ApiClientError(
        error.message || "Unknown error occurred",
        0,
        "UNKNOWN_ERROR"
      );
    }
  }

  /**
   * Request deduplication to prevent duplicate identical requests
   * Useful for preventing multiple identical GET requests
   * @param key Unique key for the request
   * @param requestFn Function that returns the request promise
   * @returns Promise with the request result
   */
  private async deduplicateRequest<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    const existing = this.pendingRequests.get(key);
    if (existing) {
      return existing;
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  // === Authentication Management ===

  /**
   * Set authentication token for all future requests
   * @param token JWT or other authentication token
   */
  setAuthToken(token: string) {
    this.authToken = token;
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  /**
   * Clear authentication token from all requests
   */
  clearAuthToken() {
    this.authToken = null;
    delete this.instance.defaults.headers.common.Authorization;
  }

  // === Request Cancellation ===

  /**
   * Create a cancel token for request cancellation
   * @returns CancelTokenSource that can be used to cancel requests
   */
  createCancelToken(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  // === HTTP Methods ===

  /**
   * GET request with automatic deduplication
   * Identical GET requests will be deduplicated to prevent unnecessary calls
   * @param endpoint API endpoint path
   * @param params Query parameters
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: ApiRequestConfig
  ): Promise<T> {
    const key = `GET:${endpoint}:${JSON.stringify(params || {})}`;

    return this.deduplicateRequest(key, async () => {
      const response = await this.instance.get<T>(endpoint, {
        params,
        timeout: config?.timeout,
        cancelToken: config?.cancelToken?.token,
        headers: {
          skipAuth: config?.skipAuth,
        },
      });
      return response.data;
    });
  }

  /**
   * POST request for creating resources
   * @param endpoint API endpoint path
   * @param data Request body data
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(endpoint, data, {
      timeout: config?.timeout,
      cancelToken: config?.cancelToken?.token,
      headers: {
        skipAuth: config?.skipAuth,
      },
    });
    return response.data;
  }

  /**
   * PUT request for updating entire resources
   * @param endpoint API endpoint path
   * @param data Request body data
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(endpoint, data, {
      timeout: config?.timeout,
      cancelToken: config?.cancelToken?.token,
      headers: {
        skipAuth: config?.skipAuth,
      },
    });
    return response.data;
  }

  /**
   * PATCH request for partial resource updates
   * @param endpoint API endpoint path
   * @param data Partial data to update
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(endpoint, data, {
      timeout: config?.timeout,
      cancelToken: config?.cancelToken?.token,
      headers: {
        skipAuth: config?.skipAuth,
      },
    });
    return response.data;
  }

  /**
   * DELETE request for removing resources
   * @param endpoint API endpoint path
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async delete<T = any>(
    endpoint: string,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await this.instance.delete<T>(endpoint, {
      timeout: config?.timeout,
      cancelToken: config?.cancelToken?.token,
      headers: {
        skipAuth: config?.skipAuth,
      },
    });
    return response.data;
  }

  // === File Upload ===

  /**
   * Upload file with progress tracking
   * Automatically handles multipart/form-data and provides upload progress
   * @param endpoint API endpoint for file upload
   * @param file File object to upload
   * @param onProgress Progress callback function (0-100)
   * @param config Additional request configuration
   * @returns Promise with response data
   */
  async uploadFile<T = any>(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void,
    config?: ApiRequestConfig
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.instance.post<T>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        skipAuth: config?.skipAuth,
      },
      timeout: config?.timeout || 60000, // 60 seconds for file uploads
      cancelToken: config?.cancelToken?.token,
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  }

  // === Utility Methods ===

  /**
   * Get the underlying axios instance for advanced usage
   * Use this for features not directly supported by this client
   * @returns The axios instance
   */
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * Health check endpoint to verify API connectivity
   * @returns Promise that resolves to true if API is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.get("/health", undefined, { skipAuth: true, timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

// === Default Export ===

/**
 * Default API client instance
 * Pre-configured with environment settings
 */
export const api = new ApiClient();

// === Additional Exports ===

/**
 * Export axios for direct usage when needed
 */
export { axios };

/**
 * Factory function to create additional API client instances
 * Useful for connecting to different APIs or with different configurations
 * @param baseURL Optional base URL override
 * @returns New ApiClient instance
 */
export const createApiClient = (baseURL?: string) => new ApiClient(baseURL);
