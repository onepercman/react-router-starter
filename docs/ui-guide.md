# UI Guide

Components and design system for consistent UI development.

## Design System

**CRITICAL**: Always use tokens from `app/shared/styles/app.css` - No hardcoded colors.

**Why?** Theme consistency, dark mode support, maintainability.

### Color Tokens

**Base:**
```
bg, fg, muted, muted-fg, border, input, ring
```

**Brand:**
```
primary, primary-fg, secondary, secondary-fg, accent, accent-fg
```

**Status:**
```
success, success-fg, danger, danger-fg, warning, warning-fg
```

**Subtle variants:**
```
primary-subtle, primary-subtle-fg, success-subtle, danger-subtle
```

**Layout:**
```
sidebar, sidebar-fg, navbar, navbar-fg, overlay, overlay-fg
```

### Token Usage Rules

```tsx
// ✅ Correct - Always use tokens
className="bg-primary text-primary-fg"
className="text-muted-fg"  // Secondary text
className="text-danger"    // Errors

// ❌ Wrong - Never hardcode
className="bg-blue-500 text-white"
className="text-gray-600"
className="text-red-500"
```

**Key rules:**
- Pair bg/fg: `bg-primary` + `text-primary-fg`
- Secondary text: `text-muted-fg` (not `text-secondary`)
- Errors: `danger` tokens (not `destructive` or `red-500`)
- Opacity: `bg-primary/90` for hover states
- Dark mode: Tokens auto-adapt (never use `dark:` variants)

### Common Patterns

```tsx
// Main content
className="bg-bg text-fg"

// Muted sections
className="bg-muted text-muted-fg"

// Primary action
className="bg-primary text-primary-fg hover:bg-primary/90"

// Error state
className="bg-danger-subtle border-danger text-danger-subtle-fg"

// Cards
className="bg-bg border border-border rounded-lg"
```

## Component System

### Registry Configuration

**Check `components.json`** for:
- `registries`: Available UI registries
- `iconLibrary`: Icon library
- `aliases`: Import paths

### Component Priority

**CRITICAL**: Check existing before adding!

1. **First**: Check `~/shared/components/ui`
   - If exists → Use it (DON'T add again)
2. **Second**: Add from registry if missing:
   ```bash
   pnpm dlx shadcn@latest add @[registry]/[component]
   # Check components.json for configured registry
   ```
3. **Never**: Use raw HTML when UI component exists

### HTML → UI Component Mapping

```tsx
// ❌ Wrong              // ✅ Correct
<button>              → <Button>
<input>               → <TextField>
<form>                → <Form>
<select>              → <Select>
<textarea>            → <TextField multiline>
<label>               → <Label>
<a>                   → <Link>
<dialog>              → <Modal>
```

### Import Pattern

```tsx
import { Button, TextField, Form } from "~/shared/components/ui"
```

## Styling Rules

**CRITICAL**: Use `className` ONLY for layout - NEVER override design properties.

### ✅ Correct Usage

```tsx
// Layout only
<Button className="w-full mt-4">Submit</Button>
<Card className="max-w-md mx-auto">Content</Card>

// Design via props
<Button intent="primary" size="lg">Action</Button>
<TextField isRequired isInvalid={hasError} />
```

### ❌ Wrong Usage

```tsx
// Don't override design system
<Button className="bg-blue-500 px-8 py-4">Submit</Button>
<TextField className="h-12 border-gray-300" />
```

### Allowed className Properties

**Layout/positioning only:**
- Width/Height: `w-*`, `h-*`, `min-w-*`, `max-w-*`
- Margin: `m-*`, `mt-*`, `mx-*`, `my-*`
- Flexbox/Grid: `flex`, `grid`, `gap-*`, `items-*`, `justify-*`
- Position: `absolute`, `relative`, `fixed`, `top-*`, `left-*`
- Display: `block`, `hidden`, `visible`

## Component Variants

### Creating Variants

```tsx
import { tv, type VariantProps } from "tailwind-variants"

const variants = tv({
  base: "rounded-lg transition",
  variants: {
    intent: {
      primary: "bg-primary text-primary-fg",
      outline: "border border-border hover:bg-accent",
      danger: "bg-danger text-danger-fg",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "default",
  },
})

interface Props extends VariantProps<typeof variants> {
  className?: string
}

export function Component({ intent, size, className, ...props }: Props) {
  return <div className={variants({ intent, size, className })} {...props} />
}
```

## State Management

### Prefer Uncontrolled

**Default to uncontrolled** (component manages state):

```tsx
// ✅ Uncontrolled (recommended)
<TextField name="email" defaultValue="user@example.com" />
<Switch defaultSelected />
<Modal defaultOpen />
```

### When to Use Controlled

Use controlled **only** when needed:

1. **Complex validation/transformation**
2. **Sync with external data** (API, store)
3. **Dependent components**
4. **Business logic** depends on state

```tsx
// ✅ Controlled - Complex validation
const [password, setPassword] = useState("")
const [strength, setStrength] = useState("weak")

function handleChange(value: string) {
  setPassword(value)
  setStrength(calculateStrength(value))
}

<TextField value={password} onChange={handleChange} />

// ✅ Controlled - Store integration
const isOpen = useStore((s) => s.modalOpen)
const setIsOpen = useStore((s) => s.setModalOpen)

<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  {/* Business logic */}
</Modal>
```

### Decision Flow

```
Need state?
├─ Static display? → Use `value` + `isReadOnly`
├─ Toggle without logic? → Use `defaultValue`/`defaultOpen`
├─ Complex validation? → Use controlled
├─ External sync (store/API)? → Use controlled
└─ Simple form? → Use uncontrolled with `name`
```

## Component Composition

### Feature Components

```tsx
// modules/[feature]/[feature]-components.tsx
import { Form, TextField, Button } from "~/shared/components/ui"
import { useFeatureStore } from "./[feature]-store"

export function FeatureForm() {
  const action = useFeatureStore((s) => s.action)

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      action(data.get("field"))
    }}>
      <TextField name="field" label="Field" isRequired />
      <Button type="submit" className="w-full">Submit</Button>
    </Form>
  )
}
```

### Shared Components

**Only create if used by 2+ features:**

```tsx
// shared/components/page-header.tsx
import { tv, type VariantProps } from "tailwind-variants"

const variants = tv({
  base: "border-b border-border pb-4 mb-6",
  variants: {
    size: {
      sm: "pb-2 mb-4",
      default: "pb-4 mb-6",
      lg: "pb-6 mb-8",
    },
  },
  defaultVariants: { size: "default" },
})

interface Props extends VariantProps<typeof variants> {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, size, className }: Props) {
  return (
    <div className={variants({ size, className })}>
      <h1 className="text-2xl font-bold text-fg">{title}</h1>
      {description && <p className="text-muted-fg mt-1">{description}</p>}
    </div>
  )
}
```

## Icons

**Check configured icon library:**

```bash
cat components.json | grep "iconLibrary"
```

**Usage:**

```tsx
// Example: lucide-react
import { User, Settings, Home } from "lucide-react"

<User className="size-5" />
<Settings className="size-4 text-muted-fg" />
```

## Adding Components

**Workflow:**

1. **Check exists:**
   ```bash
   ls app/shared/components/ui/[component].tsx
   ```

2. **Check registry:**
   ```bash
   cat components.json | grep -A1 "registries"
   ```

3. **Add if missing:**
   ```bash
   pnpm dlx shadcn@latest add @[registry]/[component]
   ```

**❌ DON'T:**
- Re-add existing components (overwrites customizations)
- Guess registry without checking config
- Skip existence check

**✅ DO:**
- Always check directory first
- Verify registry in `components.json`
- Import existing directly

## Checklist

- [ ] Check `components.json` for registry config
- [ ] Verify component exists: `ls app/shared/components/ui/[name].tsx`
- [ ] If exists → Use directly
- [ ] If missing → Add from registry
- [ ] Use design tokens only (no hardcoded colors)
- [ ] `className` only for layout
- [ ] Component props for design system
- [ ] Prefer uncontrolled state
- [ ] Use `tailwind-variants` for custom variants
- [ ] Pair bg/fg colors correctly
- [ ] Use `text-muted-fg` for secondary text
- [ ] Use `danger` tokens for errors
