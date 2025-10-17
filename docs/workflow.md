# Development Workflow

**CRITICAL**: These rules MUST be followed at all times.

## Package Manager

**ALWAYS use `pnpm`** - Never npm, yarn, bun, or others

```bash
# ✅ Correct
pnpm install
pnpm add axios
pnpm dev
pnpm build

# ❌ Wrong
npm install
yarn add axios
bun install
```

## Development Workflow

**Assess complexity first, then choose path:**

### Simple Tasks (<3 steps)
Execute directly + notify user of actions taken.

**Examples**: Fix import, add type, format code, rename file

### Complex Tasks (≥3 steps)
Follow structured workflow:

1. **Analyze** - Understand the request fully
2. **Plan** - Create clear implementation plan
3. **Present** - Show plan to user with details
4. **Confirm** - Wait for user approval
5. **Implement** - Execute only after confirmation

**Examples**: New feature module, refactor architecture, API integration

### Example: Complex Task

```
User: "Add authentication to the app"

Claude: This is a complex task. Here's my plan:

1. Create auth module with types, store, service, hooks
2. Add login route
3. Create LoginForm component
4. Add protected route wrapper

Proceed? [WAIT FOR USER RESPONSE]
```

### Example: Simple Task

```
User: "Fix the import order in dashboard.tsx"

Claude: [Reads file, fixes imports, responds]
Fixed import order in dashboard.tsx following the hierarchy:
React/external → modules → shared → types
```

## Component Development

### Adding Components

**Always follow this sequence:**

1. **Check config**: `cat components.json | grep -A1 "registries"`
2. **Check exists**: `ls app/shared/components/ui/[component].tsx`
3. **If exists** → Use it directly (DO NOT add again)
4. **If NOT exists** → Ask user → Add from configured registry
5. **Use `pnpm`** for installation

```bash
# Step 1: Check registry config
cat components.json | grep -A1 "registries"

# Step 2: Check if exists
ls app/shared/components/ui/button.tsx

# Step 3: If not exists, ask user, then:
npx shadcn@latest add @[registry]/button
# or use project alias (check package.json)
pnpm add-ui button
```

**❌ DON'T**:
- Add components that already exist
- Re-add same component (overwrites customizations)
- Guess registry name without checking config
- Skip checking existing components

## Module Creation

**Every module MUST have:**
- `index.ts` for barrel exports
- Generic naming: `[feature]-store.ts`, `[feature]-types.ts`
- NO `modules/index.ts` at root level

**Import pattern:**
```tsx
// ✅ Correct
import { useFeature } from "~/modules/[feature]"

// ❌ Wrong
import { useFeature } from "~/modules"
```

## Documentation Standards

When updating documentation:

### Keep It Generic
- Use placeholders: `[feature]`, `[component]`, `[module]`
- Never mention specific names like "auth", "products", "users"
- Focus on patterns and rules, not specific cases

### Consolidate, Don't Duplicate
- Add new content to existing headings
- Don't create new headings for similar topics
- Keep docs concise and scannable

### Examples

```tsx
// ✅ Generic - Good
// modules/[feature]/[feature]-store.ts
export const useFeatureStore = create<FeatureState>(...)

// ❌ Specific - Bad
// modules/auth/auth-store.ts
export const useAuthStore = create<AuthState>(...)
```

## Code Quality Checklist

Before implementing:

- [ ] Is this a new feature/module? → Plan first, ask user
- [ ] Am I adding a component? → Check if exists first
- [ ] Am I installing packages? → Use `pnpm`
- [ ] Am I updating docs? → Use generic terms, consolidate headings
- [ ] Am I importing from modules? → Use `~/modules/[feature]` pattern
- [ ] Design system tokens only? → No hardcoded colors
- [ ] Comments necessary? → Minimize, explain "why" not "what"

## Quick Rules Summary

**The Golden Rules:**

1. **`pnpm` only** - No exceptions
2. **Plan → Confirm → Implement** - Never skip confirmation
3. **Generic docs** - Use placeholders, consolidate headings
4. **Check before adding** - Components, packages, imports
5. **Design tokens** - Never hardcoded colors
6. **Routes are thin** - Delegate to modules
7. **Module index.ts** - Required for each module, not at root
