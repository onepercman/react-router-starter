# Components

## Component Priority

**CRITICAL**: Always check `~/shared/components/ui` before adding components.

### Decision Flow

1. **First**: Check existing in `~/shared/components/ui`
   - If exists, use directly - DON'T add again
2. **Second**: Add from IntentUI **ONLY if missing**:
   ```bash
   npx shadcn@latest add @intentui/[component]
   # or
   pnpm add-ui [component]
   ```
3. **Third**: Use React Aria directly
4. **Last**: Create custom wrapper
5. **Never**: Use raw HTML when UI component exists

### HTML Replacements

```tsx
// ❌ Wrong              // ✅ Correct
<button>              → <Button>
<input>               → <TextField> or <Input>
<form>                → <Form>
<select>              → <Select>
<textarea>            → <TextField multiline>
<label>               → <Label>
<a>                   → <Link>
<dialog>              → <Modal> or <Dialog>
```

### Import Pattern

```tsx
import { Button, TextField, Form, Label } from "~/shared/components/ui"
```

## Styling Rules

**CRITICAL**: Use `className` ONLY for layout/positioning - NEVER override design system properties.

### ✅ Correct

```tsx
// Layout only
<Button className="w-full mt-4">Submit</Button>
<TextField className="mb-2" label="Email" />
<Card className="max-w-md mx-auto">Content</Card>

// Use props for design
<Button intent="primary" size="lg">Action</Button>
<Button intent="outline" size="sm">Cancel</Button>
<TextField isRequired isInvalid={hasError} />
```

### ❌ Wrong

```tsx
// Don't override design system
<Button className="bg-blue-500 px-8 py-4 text-white">Submit</Button>
<TextField className="h-12 border-gray-300 bg-white" />

// Don't use HTML when UI component exists
<button className="...">Click</button>     // Use <Button>
<input className="..." />                  // Use <TextField>
```

### Allowed className Properties

Layout/positioning only:
- Width/Height: `w-*`, `h-*`, `min-w-*`, `max-w-*`
- Margin: `m-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`, `mx-*`, `my-*`
- Flexbox/Grid: `flex`, `grid`, `gap-*`, `items-*`, `justify-*`
- Position: `absolute`, `relative`, `fixed`, `sticky`, `top-*`, `left-*`
- Display: `block`, `inline-block`, `hidden`, `visible`

## Component Variants

### Basic Pattern

```tsx
import { tv, type VariantProps } from "tailwind-variants"

const variants = tv({
  base: "base-styles",
  variants: {
    intent: {
      primary: "bg-primary text-primary-fg",
      outline: "border border-border hover:bg-accent",
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

## IntentUI Components

Check these first:

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
} from "~/shared/components/ui"
```

## Adding Components

**IMPORTANT**: Only add if missing!

**Step 1: Check if exists**
```bash
ls app/shared/components/ui/[component].tsx
```

**Step 2: Add ONLY if missing**
```bash
npx shadcn@latest add @intentui/button
# or
pnpm add-ui button
```

**❌ DON'T**:
- Add components that already exist
- Re-add same component (overwrites customizations)

**✅ DO**:
- Check directory first
- Add only if doesn't exist
- Import existing directly

## State Management

### Prefer Uncontrolled

**Default to uncontrolled** (component manages state):

```tsx
// ✅ Uncontrolled (recommended)
<TextField name="email" defaultValue="user@example.com" />
<Switch defaultSelected />
<Modal defaultOpen />
<Popover>
  <Button>Toggle</Button>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

### When to Use Controlled

Use controlled **only** when you need:

1. **Complex validation/transformation**
2. **Sync with external data** (API, store)
3. **Dependent components** with shared state
4. **Business logic** depending on state

```tsx
// ✅ Controlled - Complex validation
const [password, setPassword] = useState("")
const [strength, setStrength] = useState("weak")

function handleChange(value: string) {
  setPassword(value)
  setStrength(calculateStrength(value))
}

<TextField value={password} onChange={handleChange} />

// ✅ Controlled - Dependent components
const [country, setCountry] = useState("")
const [cities, setCities] = useState([])

<Select value={country} onSelectionChange={setCountry}>
  {countries.map(c => <SelectItem key={c}>{c}</SelectItem>)}
</Select>
<Select value={city} onSelectionChange={setCity}>
  {cities.map(c => <SelectItem key={c}>{c}</SelectItem>)}
</Select>

// ✅ Controlled - Store integration
const isOpen = useStore((s) => s.modalOpen)
const setIsOpen = useStore((s) => s.setModalOpen)

<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  {/* Business logic requires store */}
</Modal>
```

### Decision Flow

```
Need state?
├─ Static display? → Use `value` + `isReadOnly` ✅
├─ Toggle without logic? → Use `defaultValue`/`defaultOpen` ✅
├─ Complex validation? → Use controlled with `value` + `onChange` ✅
├─ External sync (store/API)? → Use controlled ✅
└─ Simple form? → Use uncontrolled with `name` ✅
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

Only if used by 2+ features:

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

**Check `components.json`** for icon library:

```json
{
  "iconLibrary": "lucide-react"
}
```

Import from configured library:

```tsx
// If iconLibrary is "lucide-react":
import { User, Settings, Home } from "lucide-react"

<User className="size-5" />
<Settings className="size-4" />
```

## Checklist

- [ ] **FIRST**: Check if exists in `~/shared/components/ui`
- [ ] **If exists**: Use directly, import from barrel
- [ ] **If NOT exists**: Add from IntentUI
- [ ] **NEVER**: Re-add existing components
- [ ] Use React Aria, not raw HTML
- [ ] `className` only for layout/positioning
- [ ] Component props for design system
- [ ] Design system tokens for colors
- [ ] Prefer uncontrolled state
- [ ] Use `tailwind-variants` for variants
