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
| `[page].tsx` | `/[page]` | Static route |

### 2. Nested Routes (Dot Delimiter)

Use **dot notation** (`.`) to create nested URL paths:

| File | URL | Description |
|------|-----|-------------|
| `[page]._index.tsx` | `/[page]` | Nested index route |
| `[page].[subpage].tsx` | `/[page]/[subpage]` | Nested static route |

### 3. Dynamic Segments

Use **dollar sign** (`$`) prefix for dynamic parameters:

| File | URL | Params |
|------|-----|--------|
| `[page].$id.tsx` | `/[page]/123` | `{ id: "123" }` |
| `[page].$slug.tsx` | `/[page]/item-name` | `{ slug: "item-name" }` |
| `[page].$id.[sub].$subId.tsx` | `/[page]/1/[sub]/5` | Multiple params |

**Accessing params in component**:
```tsx
import { useParams } from "react-router"

export default function DetailPage() {
  const { id } = useParams()
  return <div>Item ID: {id}</div>
}
```

### 4. Layout Routes

Parent layouts wrap child routes using `<Outlet />`:

**File structure**:
```
routes/
├── [layout].tsx           # Layout for /[layout]/*
├── [layout].[page].tsx    # /[layout]/[page]
└── [layout].[other].tsx   # /[layout]/[other]
```

**Layout implementation**:
```tsx
// app/routes/[layout].tsx
import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="min-h-screen">
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
```

**Child route**:
```tsx
// app/routes/[layout].[page].tsx
export default function Page() {
  return <div>Page content</div>
}
// Renders inside Layout's <Outlet />
```

### 5. Special Conventions

| Pattern | Purpose | Description |
|---------|---------|-------------|
| `_layout.tsx` | Pathless layout | Wraps children without URL change |
| `$.tsx` | Catch-all route | 404 handler for unmatched routes |
| `($optional).tsx` | Optional segment | Multiple URL patterns valid |
| `[bracket].tsx` | Escape special chars | Literal bracket in route name |

## Example Route Structure

```
app/routes/
├── _index.tsx              # /
├── [page]._index.tsx       # /[page]
├── [page].$id.tsx          # /[page]/:id
├── [layout].tsx            # Layout for /[layout]/*
└── [layout].[page].tsx     # /[layout]/[page]
```

## Rules and Best Practices

### ✅ DO

- Use flat file structure with dot notation
- Use `_index.tsx` for index routes
- Use `$param` for dynamic segments
- Name files in `kebab-case`
- Keep routes thin - delegate to modules

### ❌ DON'T

- Use nested folders (won't work with flatRoutes)
- Add `_index` to parent layout names
- Put business logic in route files
- Mix concerns - routes compose from modules only

## Common Patterns

### Loading Data

```tsx
// app/routes/[page].$id.tsx
import { useParams } from "react-router"
import { useData } from "~/modules/[feature]"

export default function DetailPage() {
  const { id } = useParams()
  const { data, isLoading } = useData(id)

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Not found</div>

  return <DataView data={data} />
}
```

### Protected Routes

```tsx
// app/routes/[protected]._index.tsx
import { Navigate } from "react-router"
import { useFeature } from "~/modules/[feature]"

export default function ProtectedPage() {
  const { user, isLoading } = useFeature()

  if (isLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/[login]" replace />

  return <PageView user={user} />
}
```

### Nested Layouts

```tsx
// Multiple layout levels
routes/
├── [layout].tsx                    # Layout
├── [layout]._index.tsx             # Index
├── [layout].[sub].tsx              # Sub layout
├── [layout].[sub]._index.tsx       # Sub index
└── [layout].[sub].$id.tsx          # Detail
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

## References

- [React Router v7 Docs](https://reactrouter.com/how-to/file-route-conventions)
- [File Route Conventions](https://reactrouter.com/how-to/file-route-conventions)
