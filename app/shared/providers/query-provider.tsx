import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 phút
      // Thêm các config mặc định khác nếu cần
    },
    mutations: {
      // mutation options nếu cần
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig)

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
