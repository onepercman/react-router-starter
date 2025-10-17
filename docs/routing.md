# Routing

React Router v7 file-based routing with `flatRoutes`.

## Configuration

```tsx
// app/routes.ts
import { type RouteConfig } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

export default flatRoutes() satisfies RouteConfig
```

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

**Access params**:
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

**Layout implementation**:
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

## Example Structure

```
app/routes/
├── _index.tsx              # /
├── about.tsx               # /about
├── products._index.tsx     # /products
├── products.$id.tsx        # /products/:id
├── auth.tsx                # Layout for /auth/*
├── auth.login.tsx          # /auth/login
└── $.tsx                   # 404
```

## Rules

### ✅ DO

- Use flat file structure with dots
- Use `_index.tsx` for index routes
- Use `$param` for dynamic segments
- Name files in `kebab-case`
- Keep routes thin - delegate to modules

### ❌ DON'T

- Use nested folders (won't work)
- Put business logic in routes
- Use `_index` in parent layout names

## Common Patterns

### Loading Data

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

### Catch-All (404)

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

## References

- [React Router v7 Docs](https://reactrouter.com/how-to/file-route-conventions)
