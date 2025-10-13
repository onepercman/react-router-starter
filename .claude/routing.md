# Routing

React Router v7 with automatic file-based routing using `flatRoutes`.

## Configuration

```tsx
// app/routes.ts
import { type RouteConfig } from "@react-router/dev/routes"
import { flatRoutes } from "@react-router/fs-routes"

export default flatRoutes() satisfies RouteConfig
```

## File-Based Routing Conventions

### 1. Basic Routes

| File | URL | Description |
|------|-----|-------------|
| `_index.tsx` | `/` | Root index route |
| `about.tsx` | `/about` | Static route |

### 2. Nested Routes (Dot Delimiter)

Use **dot notation** (`.`) to create nested URL paths:

| File | URL | Description |
|------|-----|-------------|
| `products._index.tsx` | `/products` | Nested index route |
| `products.new.tsx` | `/products/new` | Nested static route |
| `auth.login.tsx` | `/auth/login` | Nested route |
| `auth.register.tsx` | `/auth/register` | Nested route |

### 3. Dynamic Segments

Use **dollar sign** (`$`) prefix for dynamic parameters:

| File | URL | Params |
|------|-----|--------|
| `products.$id.tsx` | `/products/123` | `{ id: "123" }` |
| `blog.$slug.tsx` | `/blog/hello-world` | `{ slug: "hello-world" }` |
| `users.$userId.posts.$postId.tsx` | `/users/1/posts/5` | `{ userId: "1", postId: "5" }` |

**Accessing params in component**:
```tsx
import { useParams } from "react-router"

export default function ProductDetail() {
  const { id } = useParams()
  // id is available as string
  return <div>Product ID: {id}</div>
}
```

### 4. Layout Routes

Parent layouts wrap child routes using `<Outlet />`:

**File structure**:
```
routes/
├── auth.tsx           # Layout for /auth/*
├── auth.login.tsx     # /auth/login
└── auth.register.tsx  # /auth/register
```

**Layout implementation**:
```tsx
// app/routes/auth.tsx
import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container">
        {/* All child routes render here */}
        <Outlet />
      </div>
    </div>
  )
}
```

**Child route**:
```tsx
// app/routes/auth.login.tsx
export default function LoginPage() {
  return <div>Login form here</div>
}
// This renders INSIDE the AuthLayout's <Outlet />
```

### 5. Special Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `_layout.tsx` | Pathless layout (wraps children without URL change) | Shared UI without affecting URL |
| `$.tsx` | Catch-all route (404 handler) | Matches any unmatched routes |
| `($optional).tsx` | Optional route segment | `/products` and `/products/featured` both valid |
| `[bracket].tsx` | Escape special characters | File named `[blog].tsx` → `/blog` route |

## Current Project Structure

```
app/routes/
├── _index.tsx              # /
├── dashboard._index.tsx    # /dashboard
├── products._index.tsx     # /products
├── products.$id.tsx        # /products/:id
├── auth.tsx                # Layout for /auth/*
└── auth.login.tsx          # /auth/login
```

## Rules and Best Practices

### ✅ DO

- Use **flat file structure** with dot notation for nested routes
- Use `_index.tsx` for index routes
- Use `$param` prefix for dynamic segments
- Create parent layout files without `_index` suffix (e.g., `auth.tsx`)
- Name files in `kebab-case` (e.g., `user-profile.tsx`)
- Keep route components thin - delegate to modules for business logic

### ❌ DON'T

- Use nested folders like `auth/login/index.tsx` - **it won't work!**
- Add `_index` to parent layout names (use `auth.tsx`, not `auth._index.tsx`)
- Put business logic directly in route files
- Mix concerns - routes should only compose from modules

## Common Patterns

### Loading Data

```tsx
// app/routes/products.$id.tsx
import { useParams } from "react-router"
import { useProduct } from "~/modules/products"

export default function ProductDetail() {
  const { id } = useParams()
  const { data: product, isLoading } = useProduct(id)

  if (isLoading) return <div>Loading...</div>
  if (!product) return <div>Not found</div>

  return <ProductView product={product} />
}
```

### Protected Routes

```tsx
// app/routes/dashboard._index.tsx
import { Navigate } from "react-router"
import { useAuth } from "~/modules/auth"
import { DashboardView } from "~/modules/dashboard"

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/auth/login" replace />

  return <DashboardView user={user} />
}
```

### Nested Layouts

```tsx
// Multiple levels of layouts
routes/
├── admin.tsx                    # /admin layout
├── admin._index.tsx             # /admin
├── admin.users.tsx              # /admin/users layout
├── admin.users._index.tsx       # /admin/users
└── admin.users.$id.tsx          # /admin/users/:id
```

### Catch-All Route (404)

```tsx
// app/routes/$.tsx
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

## Migration from Old Pattern

If you have old nested folder structure:

**Before (doesn't work with flatRoutes)**:
```
routes/
└── auth/
    └── login/
        └── index.tsx
```

**After (correct)**:
```
routes/
├── auth.tsx         # Layout
└── auth.login.tsx   # Page
```

## References

- [React Router v7 Docs](https://reactrouter.com/how-to/file-route-conventions)
- [File Route Conventions](https://reactrouter.com/how-to/file-route-conventions)
