# React Router v7

File-based routing with CSR/SSR/SSG support.

## Rendering Modes

**Check `react-router.config.ts`** for current mode:
```bash
cat react-router.config.ts | grep "ssr"
```

### CSR (Client-Side Rendering)
**Default** - JavaScript runs in browser only

```ts
// react-router.config.ts
export default { ssr: false } satisfies Config
```

**When to use:** SPA, no SEO requirements, auth-heavy apps, dashboards

**Patterns:**
```tsx
// Direct browser API usage
const theme = localStorage.getItem("theme")

// React Query for data
import { useQuery } from "@tanstack/react-query"
const { data } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then(r => r.json()),
})
```

### SSR (Server-Side Rendering)
Server renders initial HTML, hydrates in browser

```ts
// react-router.config.ts
export default { ssr: true } satisfies Config
```

**When to use:** SEO-critical pages, content-heavy sites, social sharing

**Patterns:**
```tsx
// Conditional browser APIs
const theme = typeof window !== "undefined"
  ? localStorage.getItem("theme")
  : "light"

// Loaders for data
export async function loader() {
  return fetch("/api/users").then(r => r.json())
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return <div>{loaderData.map(...)}</div>
}
```

### SSG (Static Site Generation)
Pre-renders at build time

```ts
// react-router.config.ts
export default {
  ssr: true,
  async prerender() {
    return ["/", "/about", "/blog"]
  },
} satisfies Config
```

**When to use:** Static content, marketing sites, docs, blogs

## File Conventions

### Basic Routes

| File | URL | Description |
|------|-----|-------------|
| `_index.tsx` | `/` | Root index |
| `about.tsx` | `/about` | Static route |

### Nested Routes (Dot Notation)

| File | URL | Description |
|------|-----|-------------|
| `products._index.tsx` | `/products` | Nested index |
| `products.new.tsx` | `/products/new` | Nested static |

### Dynamic Segments

| File | URL | Params |
|------|-----|--------|
| `products.$id.tsx` | `/products/123` | `{ id: "123" }` |
| `products.$id.edit.tsx` | `/products/123/edit` | Nested dynamic |

**Access params:**
```tsx
import { useParams } from "react-router"

export default function DetailPage() {
  const { id } = useParams()
  return <div>Item: {id}</div>
}
```

### Layout Routes

Parent layouts wrap children with `<Outlet />`:

```
routes/
├── auth.tsx           # Layout for /auth/*
├── auth.login.tsx     # /auth/login
└── auth.signup.tsx    # /auth/signup
```

**Implementation:**
```tsx
// auth.tsx
import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
```

### Special Conventions

| Pattern | Purpose |
|---------|---------|
| `_layout.tsx` | Pathless layout (no URL) |
| `$.tsx` | Catch-all/404 route |
| `($optional).tsx` | Optional segment |

## Common Patterns

### Loading Data

**CSR approach:**
```tsx
// products.$id.tsx
import { useParams } from "react-router"
import { useProductData } from "~/modules/products"

export default function ProductDetail() {
  const { id } = useParams()
  const { data, isLoading } = useProductData(id)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Not found</div>

  return <ProductView data={data} />
}
```

**SSR approach:**
```tsx
import type { Route } from "./+types/product"

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProduct(params.id)
  return product
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  return <ProductView data={loaderData} />
}
```

### Protected Routes

```tsx
// dashboard._index.tsx
import { Navigate } from "react-router"
import { useAuth } from "~/modules/auth"

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return <DashboardView user={user} />
}
```

### 404 Pages

```tsx
// $.tsx
import { Link } from "react-router"

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  )
}
```

## Migration Between Modes

### CSR → SSR

1. **Wrap browser APIs:**
```tsx
// Before
const value = localStorage.getItem("key")

// After
const value = typeof window !== "undefined"
  ? localStorage.getItem("key")
  : null
```

2. **Move data to loaders:**
```tsx
// Before
const { data } = useQuery(...)

// After
export async function loader() { return fetchData() }
```

3. **Update config:** `ssr: true`

### SSR → CSR

1. **Remove loaders** → Use React Query
2. **Remove `typeof window` checks** → Direct usage
3. **Update config:** `ssr: false`

## Rules

### ✅ DO

- Use flat files with dots (not folders)
- Use `_index.tsx` for index routes
- Use `$param` for dynamic segments
- Name files in `kebab-case`
- Keep routes thin - delegate to modules
- Check rendering mode before implementation

### ❌ DON'T

- Use nested folders (won't work)
- Put business logic in routes
- Use browser APIs in SSR without checks
- Use `_index` in parent layout names

## References

- [React Router v7 Docs](https://reactrouter.com/how-to/file-route-conventions)
