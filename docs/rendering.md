# Rendering Modes

## Configuration

**Check `react-router.config.ts`** for rendering mode:

```bash
cat react-router.config.ts | grep "ssr"
```

## Available Modes

### CSR (Client-Side Rendering)
**Default mode** - JavaScript runs in browser only

```ts
// react-router.config.ts
export default {
  ssr: false,
} satisfies Config
```

**When to use:**
- SPA (Single Page Applications)
- No SEO requirements
- Authentication-heavy apps
- Real-time dashboards

### SSR (Server-Side Rendering)
**Server renders initial HTML** - Hydrates in browser

```ts
// react-router.config.ts
export default {
  ssr: true,
} satisfies Config
```

**When to use:**
- SEO-critical pages
- Content-heavy sites
- Dynamic content per request
- Social media sharing

### SSG (Static Site Generation)
**Pre-renders at build time** - Serves static HTML

```ts
// react-router.config.ts
export default {
  ssr: true,
  async prerender() {
    return ["/", "/about", "/blog"]
  },
} satisfies Config
```

**When to use:**
- Static content
- Marketing sites
- Documentation
- Blogs

## Mode Detection

**Always check mode before implementing features:**

```bash
# Check rendering mode
cat react-router.config.ts
```

**CSR-only patterns:**
```tsx
// ✅ CSR - Browser APIs safe
import { useState, useEffect } from "react"

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Browser API safe in CSR
    localStorage.setItem("key", "value")
  }, [])
}
```

**SSR-safe patterns:**
```tsx
// ✅ SSR - Check window exists
import { useState, useEffect } from "react"

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("key", "value")
    }
  }, [])
}
```

## Common Patterns

### Data Fetching

**CSR:**
```tsx
// Use React Query
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
  })
}
```

**SSR:**
```tsx
// Use loader
import type { Route } from "./+types/page"

export async function loader() {
  const res = await fetch("/api/users")
  return res.json()
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.map(...)}</div>
}
```

### Browser APIs

**CSR:**
```tsx
// Direct usage
const theme = localStorage.getItem("theme")
document.title = "Page"
window.location.href = "/login"
```

**SSR:**
```tsx
// Conditional usage
const theme = typeof window !== "undefined"
  ? localStorage.getItem("theme")
  : "light"

useEffect(() => {
  document.title = "Page"
}, [])
```

## Migration Guide

### CSR → SSR

1. **Wrap browser APIs:**
   ```tsx
   // Before (CSR)
   const value = localStorage.getItem("key")

   // After (SSR)
   const value = typeof window !== "undefined"
     ? localStorage.getItem("key")
     : null
   ```

2. **Move data fetching to loaders:**
   ```tsx
   // Before (CSR)
   const { data } = useQuery(...)

   // After (SSR)
   export async function loader() {
     return fetchData()
   }
   ```

3. **Update config:**
   ```ts
   export default {
     ssr: true,
   } satisfies Config
   ```

### SSR → CSR

1. **Remove loaders:**
   ```tsx
   // Before (SSR)
   export async function loader() { ... }

   // After (CSR)
   const { data } = useQuery({ ... })
   ```

2. **Remove window checks:**
   ```tsx
   // Before (SSR)
   if (typeof window !== "undefined") { ... }

   // After (CSR)
   // Direct usage safe
   ```

3. **Update config:**
   ```ts
   export default {
     ssr: false,
   } satisfies Config
   ```

## Checklist

- [ ] Check `react-router.config.ts` for current mode
- [ ] CSR: Use React Query for data fetching
- [ ] CSR: Browser APIs safe without checks
- [ ] SSR: Use loaders for data fetching
- [ ] SSR: Wrap browser APIs in `typeof window` checks
- [ ] SSR: Test hydration (no mismatches)
- [ ] SSG: Define `prerender()` routes
