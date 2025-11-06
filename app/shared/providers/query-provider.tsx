import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60, // 1 minute
			// Add other default configs if needed
		},
		mutations: {
			// mutation options if needed
		},
	},
}

export const queryClient = new QueryClient(queryClientConfig)

export default function QueryProvider({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
