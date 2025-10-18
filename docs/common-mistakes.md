# Common Mistakes

Prevention guide for frequent errors. Refer to detailed docs for full context.

## Top 10 Mistakes

### 1. Adding Existing Component
```bash
# ❌ Wrong - Overwrites customizations
pnpm dlx shadcn@latest add @[registry]/button  # Button already exists

# ✅ Correct - Check first
ls app/shared/components/ui/button.tsx  # Exists? Use it
```

### 2. Hardcoding Colors
```tsx
// ❌ Wrong
className="bg-blue-500 text-white"
className="text-gray-600"

// ✅ Correct
className="bg-primary text-primary-fg"
className="text-muted-fg"
```

### 3. Overriding Component Design Props
```tsx
// ❌ Wrong - Conflicts with built-in intent system
<Button intent="primary" className="bg-red-500">

// ✅ Correct - Use props or extend with variants
<Button intent="danger">
```

### 4. Wrong Import Hierarchy
```tsx
// ❌ Wrong - Circular dependency
import { helper } from "~/modules/auth"  // In shared/utils

// ✅ Correct - Follow hierarchy: Routes → Modules → Shared
import { helper } from "~/shared/utils"  // In modules/auth
```

### 5. Missing Barrel Exports
```tsx
// ❌ Wrong - Exposing internal structure
import { LoginForm } from "~/modules/auth/auth-forms"

// ✅ Correct - Use barrel exports
// modules/auth/index.ts
export { LoginForm } from "./auth-forms"

// Usage
import { LoginForm } from "~/modules/auth"
```

### 6. Creating Root modules/index.ts
```bash
# ❌ Wrong - Creates barrel at root
touch app/modules/index.ts

# ✅ Correct - Each module has its own index.ts
touch app/modules/auth/index.ts
touch app/modules/user/index.ts
```

### 7. Using Wrong Package Manager
```bash
# ❌ Wrong
npm install axios
yarn add axios
bun install axios

# ✅ Correct
pnpm add axios
```

### 8. Wrong Text Token for Secondary
```tsx
// ❌ Wrong - secondary is a brand color
<p className="text-secondary">Description</p>

// ✅ Correct - muted-fg is for secondary text
<p className="text-muted-fg">Description</p>
```

### 9. Mismatched bg/fg Pairs
```tsx
// ❌ Wrong - Accessibility issues
className="bg-primary text-white"
className="bg-danger text-fg"

// ✅ Correct - Always pair bg with matching -fg
className="bg-primary text-primary-fg"
className="bg-danger text-danger-fg"
```

### 10. Mixing HTML + UI Components
```tsx
// ❌ Wrong - Inconsistent styling
<button className="...">Cancel</button>
<Button intent="primary">Submit</Button>

// ✅ Correct - Use UI components consistently
<Button intent="tertiary">Cancel</Button>
<Button intent="primary">Submit</Button>
```

## Quick Fixes

### Before Adding Component
```bash
# 1. Check config
cat components.json | grep -A1 "registries"

# 2. Check if exists
ls app/shared/components/ui/[component].tsx

# 3. If exists → Use it directly
```

### Before Implementing
```
1. Task complexity? Simple (<3 steps) or Complex (≥3)?
2. Need new component? Check existing first
3. Styling? Use tokens only
4. New module? Create index.ts barrel
5. Installing package? Use pnpm
```

### Import Order Template
```tsx
// 1. React + external
import { useState } from "react"
import axios from "axios"

// 2. Modules
import { useAuth } from "~/modules/auth"

// 3. Shared
import { Button } from "~/shared/components/ui"
import { axiosInstance } from "~/shared/lib/axios"

// 4. Types
import type { User } from "~/modules/auth"
```

## Anti-Patterns to Avoid

### Component Wrappers with Same Name
```tsx
// ❌ Anti-pattern - Creates confusion
// app/shared/components/button.tsx
export function Button(props) {
  return <UIButton {...props} className="custom" />
}

// ✅ Better - Extend or compose with different name
export function ActionButton(props) {
  return <Button {...props} intent="primary" size="lg" />
}
```

### Route Logic Bloat
```tsx
// ❌ Anti-pattern - Fat routes
// routes/dashboard.tsx
export default function Dashboard() {
  const [data, setData] = useState()
  const fetchData = async () => { /* complex logic */ }
  // 200 lines of logic...
}

// ✅ Better - Thin routes, logic in modules
// routes/dashboard.tsx
import { useDashboard } from "~/modules/dashboard"
export default function Dashboard() {
  const { data, isLoading } = useDashboard()
  return <DashboardView data={data} loading={isLoading} />
}
```

### Global State for Local UI
```tsx
// ❌ Anti-pattern - Zustand for local state
const useModalStore = create((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen }))
}))

// ✅ Better - useState for local UI
function Component() {
  const [isOpen, setIsOpen] = useState(false)
}
```

## Validation Checklist

Quick pre-commit check:

- [ ] No hardcoded colors (grep `bg-\[` `text-\[` `#[0-9a-f]`)
- [ ] All imports follow hierarchy (Routes → Modules → Shared)
- [ ] UI components used (not raw `<button>`, `<input>`)
- [ ] Barrel exports exist (each module has `index.ts`)
- [ ] No `modules/index.ts` at root
- [ ] Design props via component props, not `className`
- [ ] Used `pnpm` for package management
- [ ] Text pairs: `text-muted-fg` not `text-secondary`
- [ ] Bg/fg pairs match: `bg-X` + `text-X-fg`

## Related Documentation

- [workflow.md](workflow.md) - Development workflow
- [design-system.md](design-system.md) - Color tokens
- [components.md](components.md) - Component usage
- [architecture.md](architecture.md) - Import hierarchy
- [prompts.md](prompts.md) - Fix prompts
