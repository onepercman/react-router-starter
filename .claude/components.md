# Components

## Component Priority

**CRITICAL**: Always prioritize UI library components over HTML elements.

### Decision Flow

1. **First**: Check existing UI components in `~/shared/components/ui`
2. **Second**: Add from IntentUI registry if missing:
   ```bash
   npx shadcn@latest add @intentui/[component]
   ```
3. **Third**: Use React Aria Components directly if not in registry
4. **Last resort**: Create custom wrapper around React Aria primitives
5. **Never**: Use raw HTML elements when UI component exists

### HTML Element Replacements

```tsx
// ❌ Wrong              // ✅ Correct
<button>              → <Button>
<input>               → <TextField> or <Input>
<form>                → <Form>
<select>              → <Select>
<textarea>            → <TextField multiline>
<label>               → <Label>
<a>                   → <Link> or <RouterLink>
<dialog>              → <Modal> or <Dialog>
```

### Import Pattern

Always use barrel exports:

```tsx
import { Button, TextField, Form, Label } from "~/shared/components/ui"
```

## Component Styling Rules

**CRITICAL**: When using `/ui` components, use `className` ONLY for positioning and layout - NEVER override design system properties.

### ✅ Correct Usage

```tsx
// Position and layout only
<Button className="w-full mt-4">Submit</Button>
<TextField className="mb-2" label="Email" />
<Card className="max-w-md mx-auto">Content</Card>

// Use component props for design system properties
<Button intent="primary" size="lg">Action</Button>
<Button intent="outline" size="sm">Cancel</Button>
<TextField isRequired isInvalid={hasError} />

// Prefer UI components over HTML
<Button intent="outline">Click</Button>   // Not <button>
<TextField label="Name" />                 // Not <input>
<Form onSubmit={handleSubmit}>            // Not <form>
```

### ❌ Wrong Usage

```tsx
// Don't override design system properties
<Button className="bg-blue-500 px-8 py-4 text-white">Submit</Button>
<TextField className="h-12 border-gray-300 bg-white" />

// Don't use HTML when UI component exists
<button className="...">Click</button>     // Use <Button>
<input className="..." />                  // Use <TextField>
<form>...</form>                          // Use <Form>
```

### Allowed className Properties

Layout and positioning only:
- Width/Height: `w-*`, `h-*`, `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*`
- Margin: `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `mx-*`, `my-*`
- Padding: Only for custom components (UI components handle padding via size prop)
- Flexbox/Grid: `flex`, `grid`, `gap-*`, `items-*`, `justify-*`
- Position: `absolute`, `relative`, `fixed`, `sticky`, `top-*`, `left-*`, etc.
- Display: `block`, `inline-block`, `hidden`, `visible`

## Component Variants with tailwind-variants

### Basic Pattern

```tsx
import { tv, type VariantProps } from "tailwind-variants"
import { cx } from "~/shared/lib/primitive"

const variants = tv({
  base: "base-styles-here",
  variants: {
    variant: {
      default: "bg-primary text-primary-fg",
      outline: "border border-border bg-bg hover:bg-accent",
      ghost: "hover:bg-accent hover:text-accent-fg",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

interface Props extends VariantProps<typeof variants> {
  className?: string
  // other props
}

export function Component({ variant, size, className, ...props }: Props) {
  return (
    <div className={variants({ variant, size, className })} {...props} />
  )
}
```

### With Compound Variants

```tsx
const variants = tv({
  base: "rounded transition-colors",
  variants: {
    variant: {
      primary: "bg-primary text-primary-fg",
      danger: "bg-danger text-danger-fg",
    },
    size: {
      sm: "px-3 py-1.5",
      lg: "px-6 py-3",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "lg",
      class: "font-bold",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
})
```

## React Aria Components

### IntentUI Components

IntentUI provides pre-styled React Aria components. Always check these first:

```tsx
import {
  Button,
  TextField,
  Form,
  Select,
  ComboBox,
  Dialog,
  Modal,
  Popover,
  Menu,
  Table,
  Tabs,
  // ... and more
} from "~/shared/components/ui"
```

### Adding New Components

```bash
# List available components
npx shadcn@latest add

# Add specific component
npx shadcn@latest add @intentui/button
npx shadcn@latest add @intentui/text-field

# Or use project script
pnpm add-ui button
pnpm add-ui text-field
```

### Accessibility Features

React Aria Components provide built-in accessibility:

- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Touch/mouse/keyboard support

**Never** try to replicate these with raw HTML.

## Component Composition

### Feature Components

Create in module `components/` directory:

```tsx
// app/modules/auth/components/login-form.tsx
import { Form, TextField, Button } from "~/shared/components/ui"
import { useAuthStore } from "../auth-store"

export function LoginForm() {
  const login = useAuthStore((s) => s.login)

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      login(data.get("email"), data.get("password"))
    }}>
      <TextField name="email" label="Email" isRequired />
      <TextField name="password" label="Password" type="password" isRequired />
      <Button type="submit" className="w-full">Login</Button>
    </Form>
  )
}
```

### Shared Components

Only create in `app/shared/components/` if used by 2+ features:

```tsx
// app/shared/components/page-header.tsx
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

### Priority

1. **@intentui/icons** (primary)
2. **lucide-react** (fallback)

```tsx
import { IconUser } from "@intentui/icons"
import { User } from "lucide-react"

// Use IconUser from @intentui/icons when available
<IconUser className="w-5 h-5" />

// Use lucide-react as fallback
<User className="w-5 h-5" />
```

## Component Checklist

Before creating/using a component:

- [ ] Check if UI component exists in `~/shared/components/ui`
- [ ] Add from IntentUI if missing
- [ ] Use React Aria Components, not raw HTML
- [ ] Use `className` only for layout/positioning
- [ ] Use component props for design system properties
- [ ] Use design system tokens for colors
- [ ] Add TypeScript types
- [ ] Use `tailwind-variants` for custom variants
- [ ] Export from barrel file if in module
