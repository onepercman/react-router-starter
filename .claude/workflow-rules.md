# Claude Code Workflow Rules

**CRITICAL - These rules MUST be followed at all times**

## 1. Package Manager

**ALWAYS use `pnpm`** - Never use npm, yarn, bun, or any other package manager

```bash
# ✅ Correct
pnpm install
pnpm add axios
pnpm dev

# ❌ Wrong
npm install
yarn add axios
bun install
```

## 2. Development Workflow

**ALWAYS follow this sequence:**

1. **Analyze** - Understand the request
2. **Plan** - Create a clear implementation plan
3. **Present** - Show the plan to user
4. **Confirm** - Wait for user approval
5. **Implement** - Execute only after confirmation

**Never skip step 4** - Always wait for user confirmation before implementing

### Example Workflow

```
User: "Add authentication to the app"

Claude:
I'll help you add authentication. Here's my plan:

1. Create auth module with:
   - auth-types.ts (User, AuthState interfaces)
   - auth-store.ts (Zustand store with login/logout)
   - auth-service.ts (API calls)
   - use-auth.ts (custom hook)
   - index.ts (barrel exports)

2. Add login route:
   - routes/login.tsx

3. Create LoginForm component in auth module

4. Add protected route wrapper

Would you like me to proceed with this approach?

[WAIT FOR USER RESPONSE]
```

## 3. Documentation Standards

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

## 4. Component Development

### Adding New Components

**Always follow this sequence:**

1. Check if component exists in `~/shared/components/ui`
2. If exists → Use it (DO NOT add again)
3. If NOT exists → Ask user → Add from IntentUI
4. Use `pnpm` for installation

```bash
# Check first
ls app/shared/components/ui/button.tsx

# If not exists, ask user, then:
pnpm add-ui button
```

## 5. Module Creation

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

## 6. Code Quality Rules

- **Comments**: Minimize, prefer self-documenting code
- **Types**: `interface` for objects, `type` for unions
- **Naming**: `kebab-case` files, `PascalCase` components, `camelCase` functions
- **Colors**: Use design system tokens, never hardcoded values
- **Imports**: Organize (React → Modules → Shared → Types)

## Workflow Checklist

Before starting any task:

- [ ] Is this a new feature/module? → Plan first, ask user
- [ ] Am I adding a component? → Check if exists first
- [ ] Am I installing packages? → Use `pnpm`
- [ ] Am I updating docs? → Use generic terms, consolidate headings
- [ ] Am I importing from modules? → Use `~/modules/[feature]` pattern

## Summary

**The Three Golden Rules:**

1. **`pnpm` only** - No exceptions
2. **Plan → Confirm → Implement** - Never skip confirmation
3. **Generic docs** - Use placeholders, consolidate headings
