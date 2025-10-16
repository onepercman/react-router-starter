# Components

## Component Priority

**CRITICAL**: Always prioritize UI library components over HTML elements.

### Decision Flow

1. **First**: Check existing UI components in `~/shared/components/ui`
   - **CRITICAL**: If component already exists, use it directly - DO NOT run add command again
   - Check [app/shared/components/ui/](../app/shared/components/ui/) directory first
2. **Second**: Add from IntentUI registry **ONLY if missing**:
   ```bash
   npx shadcn@latest add @intentui/[component]
   ```
   - **WARNING**: Only run this command if the component file does NOT exist in `~/shared/components/ui`
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

**IMPORTANT**: Only add components that don't exist yet!

**Step 1: Check if component exists**
```bash
# Check if component file exists
ls app/shared/components/ui/[component].tsx
```

**Step 2: Add ONLY if missing**
```bash
# List available components in IntentUI registry
npx shadcn@latest add

# Add specific component (ONLY if not exists in ~/shared/components/ui)
npx shadcn@latest add @intentui/button
npx shadcn@latest add @intentui/text-field

# Or use project script
pnpm add-ui button
pnpm add-ui text-field
```

**❌ DO NOT**:
- Run add command for components that already exist in `~/shared/components/ui`
- Re-add the same component (it will overwrite your customizations)
- Add without checking existing components first

**✅ DO**:
- Check `~/shared/components/ui` directory first
- Only add if component file doesn't exist
- Import existing components directly from barrel exports

### Accessibility Features

React Aria Components provide built-in accessibility:

- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Touch/mouse/keyboard support

**Never** try to replicate these with raw HTML.

## Component State Management

### Uncontrolled vs Controlled Components

**Prefer uncontrolled components** (using built-in component logic) over controlled state unless absolutely necessary.

#### ✅ Use Uncontrolled (Recommended)

```tsx
// ✅ Let component manage its own state
<TextField name="email" defaultValue="user@example.com" />
<Switch defaultSelected />
<Modal defaultOpen />
<Popover>
  <Button>Toggle</Button>
  <PopoverContent>Content</PopoverContent>
</Popover>

// ✅ Use value props for display-only or simple demos
<TextField value="Read-only value" isReadOnly />
<Checkbox value="option1">Option 1</Checkbox>
```

#### ❌ Avoid Controlled State Unless Required

```tsx
// ❌ Unnecessary controlled state for simple UI
const [isOpen, setIsOpen] = useState(false)
<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  {/* No business logic requiring external control */}
</Modal>

// ❌ Controlled state for basic form field
const [email, setEmail] = useState("")
<TextField value={email} onChange={setEmail} />

// ✅ Better - uncontrolled
<TextField name="email" />
```

#### ✅ When to Use Controlled State

Use controlled state **only** when you need to:

1. **Implement complex business logic** that depends on the state
2. **Synchronize with external data sources** (API, database)
3. **Perform validation or transformation** before updating
4. **Control multiple dependent components** with shared state

```tsx
// ✅ Controlled - Complex validation logic
const [password, setPassword] = useState("")
const [strength, setStrength] = useState<"weak" | "medium" | "strong">("weak")

function handlePasswordChange(value: string) {
  setPassword(value)
  setStrength(calculatePasswordStrength(value))
}

<TextField
  value={password}
  onChange={handlePasswordChange}
  description={`Strength: ${strength}`}
/>

// ✅ Controlled - Dependent components
const [country, setCountry] = useState("")
const [cities, setCities] = useState<string[]>([])

useEffect(() => {
  if (country) {
    setCities(fetchCitiesByCountry(country))
  }
}, [country])

<Select value={country} onSelectionChange={setCountry}>
  {countries.map(c => <SelectItem key={c.code}>{c.name}</SelectItem>)}
</Select>
<Select value={city} onSelectionChange={setCity}>
  {cities.map(c => <SelectItem key={c}>{c}</SelectItem>)}
</Select>

// ✅ Controlled - External state management
const isOpen = useStore((s) => s.modalOpen)
const setIsOpen = useStore((s) => s.setModalOpen)

<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
  {/* Business logic requires modal state in global store */}
</Modal>
```

#### Mocking UI & Prototyping

For demos, prototypes, or mocking UI without real logic:

```tsx
// ✅ Use value props and built-in logic - no state needed
<TextField value="mock@example.com" isReadOnly />
<Select defaultSelectedKey="option1">
  <SelectItem key="option1">Option 1</SelectItem>
  <SelectItem key="option2">Option 2</SelectItem>
</Select>
<Switch defaultSelected />
<Checkbox defaultSelected>Remember me</Checkbox>

// ✅ Let components handle their own toggle logic
<Popover>
  <Button>Open Menu</Button>
  <PopoverContent>
    <Menu>
      <MenuItem>Action 1</MenuItem>
      <MenuItem>Action 2</MenuItem>
    </Menu>
  </PopoverContent>
</Popover>

// ❌ Don't create unnecessary state for mocks
const [checked, setChecked] = useState(false)
<Checkbox isSelected={checked} onChange={setChecked}>Remember me</Checkbox>
```

### Decision Flowchart

```
Need component state?
├─ Just displaying static value?
│  └─ Use `value` prop + `isReadOnly` ✅
├─ Need toggle/interaction without business logic?
│  └─ Use `defaultValue`/`defaultOpen`/`defaultSelected` ✅
├─ Complex validation or transformation?
│  └─ Use controlled state with `value` + `onChange` ✅
├─ Syncing with external state (store, API)?
│  └─ Use controlled state with store selectors ✅
└─ Simple form input?
   └─ Use uncontrolled with `name` prop ✅
```

### Best Practices

- **Default to uncontrolled** - Let components manage their own state
- **Minimize state creation** - Avoid useState unless necessary for business logic
- **Use value props** for static/read-only displays
- **Use default props** for initial values without controlling
- **Control only when needed** - Validation, sync, or dependent logic
- **Clean code** - Fewer states = less complexity

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

### Icon Library Configuration

**IMPORTANT**: Always check `components.json` for the current icon library:

```json
// components.json
{
  "iconLibrary": "lucide-react"  // Current configured library
}
```

Import icons from the configured library:

```tsx
// Check components.json first to see iconLibrary value
// If iconLibrary is "lucide-react":
import { User, Settings, Home } from "lucide-react"

<User className="size-5" />
<Settings className="size-4" />
<Home className="size-6" />
```

**Pattern**: Always reference `iconLibrary` field in `components.json` to determine which icon package to use.

## Mapping Figma Designs to Components

### Using Figma MCP Server

When implementing designs from Figma using the MCP server, follow this workflow:

#### 1. Element-to-Component Mapping

**Check existing components first**:
- Review `~/shared/components/ui` for matching components
- Identify the closest semantic match (not just visual similarity)
- Prefer components from IntentUI registry over custom implementations

**Common mappings**:
```tsx
// Figma Element      → Component Choice
"Button"             → <Button>
"Text Input"         → <TextField>
"Dropdown"           → <Select> or <ComboBox>
"Card"               → <Card>
"Modal/Dialog"       → <Modal> or <Dialog>
"Checkbox"           → <Checkbox>
"Radio Group"        → <RadioGroup>
"Toggle"             → <Switch>
"Tab Bar"            → <Tabs>
"Menu"               → <Menu>
"Text/Heading"       → <Heading> or <Text>
```

#### 2. Style vs Size Differentiation

**Before modifying styles, identify if difference is size or style**:

```tsx
// ✅ Size difference - Use size prop
// Figma: Button 48px height vs existing 40px
<Button size="lg">Action</Button>

// ✅ Style difference - Update component styles
// Figma: Button with rounded-full vs rounded-md
const buttonVariants = tv({
  base: "rounded-full", // Update from rounded-md
  // ...
})

// ❌ Don't create new component for size variants
// Use existing component with size prop instead
```

**Decision criteria**:
- **Size**: Height, width, padding, font-size → Use `size` prop variants
- **Style**: Colors, borders, shadows, border-radius → Update component styles

#### 3. Adding Missing Components

**CRITICAL**: Check if component exists before adding!

```bash
# Step 1: Verify component doesn't exist
ls app/shared/components/ui/[component].tsx

# Step 2: If file NOT found, then add from registry
npx shadcn@latest add @intentui/[component]
# Or use project script
pnpm add-ui [component]
```

**❌ DO NOT** add if component file already exists in `~/shared/components/ui`

#### 4. Adapting Existing Component Styles

When Figma design differs from existing component:

```tsx
// Example: Figma button has different border-radius

// 1. Locate component file
// app/shared/components/ui/button.tsx

// 2. Update variants
const buttonVariants = tv({
  base: [
    "rounded-full",  // Update from rounded-md to match Figma
    // Keep other design system tokens
    "transition-colors",
    "focus:outline-none focus:ring-2",
  ],
  variants: {
    intent: {
      primary: "bg-primary text-primary-fg hover:bg-primary/90",
      // ... other variants
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2",
      lg: "px-6 py-3 text-lg",  // Add if Figma has larger variant
    },
  },
})
```

#### 5. Workflow Checklist

- [ ] Get Figma node/screenshot using MCP tools
- [ ] Identify all unique UI elements in design
- [ ] Map each element to existing component or find in IntentUI
- [ ] Determine if differences are size (use props) or style (update component)
- [ ] Add missing components from registry if available
- [ ] Update component styles to match design using design system tokens
- [ ] Never hardcode colors - use tokens from `app/shared/styles/app.css`
- [ ] Test all size variants work with updated styles
- [ ] Verify accessibility features remain intact

#### 6. Token-First Styling

Always use design system tokens when adapting styles:

```tsx
// ✅ Correct - Use design system tokens
const variants = tv({
  base: "bg-surface border border-border text-fg",
  variants: {
    variant: {
      default: "bg-primary text-primary-fg",
      danger: "bg-danger text-danger-fg",
    },
  },
})

// ❌ Wrong - Hardcoded colors
const variants = tv({
  base: "bg-white border border-gray-200 text-gray-900",
  variants: {
    variant: {
      default: "bg-blue-500 text-white",
      danger: "bg-red-500 text-white",
    },
  },
})
```

## Component Checklist

Before creating/using a component:

- [ ] **FIRST**: Check if UI component exists in `~/shared/components/ui`
- [ ] **If exists**: Use it directly, import from barrel exports
- [ ] **If NOT exists**: Add from IntentUI registry (`npx shadcn@latest add @intentui/[component]`)
- [ ] **NEVER**: Run add command for components that already exist
- [ ] Use React Aria Components, not raw HTML
- [ ] Use `className` only for layout/positioning
- [ ] Use component props for design system properties
- [ ] Use design system tokens for colors
- [ ] Add TypeScript types
- [ ] Use `tailwind-variants` for custom variants
- [ ] Export from barrel file if in module
