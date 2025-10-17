# Common Development Prompts

Quick reference prompts for common tasks. Refer to detailed docs for context.

## Component Development

### Create New Route
```
Create a new route at /[path]:
- Use components from ~/shared/components/ui
- Import logic from appropriate modules
- Follow design system tokens
```

### Create Module Component
```
Create [ComponentName] in modules/[module]/[feature]-components.tsx:
- Use tailwind-variants for styling
- Use design system tokens only
- Use React Aria components from ~/shared/components/ui
- Add proper TypeScript types
```

### Add UI Component
```
Check if [component] exists in ~/shared/components/ui first.
If NOT exists, add from IntentUI:
pnpm add-ui [component]
```

### Create Custom Component with Variants
```
Create [ComponentName] with variants:
- intent: [list variants]
- size: [list sizes]
Use tailwind-variants and design tokens
```

## Module Development

### Create New Module
```
Create module for [feature] in app/modules/[feature]:
- [feature]-types.ts (type definitions)
- [feature]-store.ts (Zustand store, optional)
- [feature]-service.ts (API calls, optional)
- [feature]-components.tsx (components, optional)
- use-[feature].ts (custom hook, optional)
- index.ts (barrel exports - REQUIRED)
```

### Create Zustand Store
```
Create Zustand store for [feature]:
- Include data, isLoading, error states
- Add persist middleware
- Type all state and actions
- Follow store pattern from docs/api-design.md
```

### Extract Logic to Module
```
Move [logic/component] from routes/[route] to modules/[module]:
- Extract business logic
- Keep route as composition layer
- Add barrel exports to module/index.ts
```

## Styling & Design System

### Fix Design Token Violations
```
Audit [file] for design system violations:
- Replace hardcoded colors with tokens
- Fix incorrect token usage (text-muted-fg not text-secondary)
- Verify bg/fg pairings
- Use danger tokens for errors (not destructive/red-500)
```

### Apply Design Tokens
```
Update [component] to use design system:
- Main text: text-fg
- Secondary text: text-muted-fg
- Backgrounds: bg-primary/bg-bg/bg-muted
- Pair with correct -fg variants
```

### Fix UI Component Overrides
```
Fix style overrides in [file]:
- Remove className design properties
- Use component props (intent, size)
- Keep only layout/positioning classes
```

### Replace HTML with UI Components
```
Replace HTML elements in [file]:
- button → Button
- input → TextField
- form → Form
- select → Select
Use className only for layout (w-*, m-*, flex, etc)
```

## Code Quality

### Fix Import Order
```
Organize imports in [file]:
1. React and external libraries
2. Modules (~/modules/...)
3. Shared (~/shared/...)
4. Type imports
```

### Extract Types
```
Extract types from [file] to [feature]-types.ts:
- interface for objects
- type for unions
- Export shared types only
```

### Add TypeScript Types
```
Add proper TypeScript types to [file]:
- Component props
- Function parameters/returns
- Store state/actions
```

## Refactoring

### Refactor Component to Module
```
Refactor [component] from routes/[route] to module:
- Move to modules/[module]/[feature]-components.tsx
- Extract business logic to store/service
- Update imports in route
- Add barrel export to modules/[module]/index.ts
```

### Create Barrel Exports
```
Create barrel exports for modules/[module]/index.ts:
- Export components, hooks, stores
- Export types (using export type)
- Keep internal files private
```

### Split Large Component
```
Split [component] into smaller components:
- Identify reusable parts
- Extract to separate files
- Use composition
- Maintain types
```

## State Management

### Add Loading States
```
Add loading/error states to [component]:
- Use isLoading for loading UI
- Handle error with error state
- Show success feedback
```

### Implement Form Handling
```
Create form handling for [feature]:
- Use Form component from ~/shared/components/ui
- Add validation
- Handle submit/errors
- Use TextField/Select components
```

## Architecture Review

### Review Module Architecture
```
Review architecture of modules/[module]:
- Check layer separation (routes → modules → shared)
- Verify import hierarchy
- Validate file organization
- Check barrel exports (index.ts exists)
- No modules/index.ts at root
```

### Create Service Layer
```
Create service for [feature] in modules/[feature]/[feature]-service.ts:
- API calls using axiosInstance from ~/shared/lib/axios
- Business logic
- Error handling
- Type safety
- Export as singleton: export default new FeatureService()
```

## Common Fixes

### Fix All Design Violations
```
Fix all design system violations in [file]:
1. Replace hardcoded colors (bg-blue-500 → bg-primary)
2. Use correct tokens (text-gray-600 → text-muted-fg)
3. Fix bg/fg pairs (bg-primary + text-primary-fg)
4. Use text-muted-fg for secondary
5. Use danger for errors (not destructive/red-500)
```

### Fix All Component Issues
```
Fix component issues in [file]:
1. Replace HTML with UI components
2. Remove style overrides from className
3. Use design tokens only
4. Add proper types
5. Fix import order
6. Use cn() for className management
```

### Audit Module Compliance
```
Audit modules/[module] for compliance:
- Architecture patterns (3-layer system)
- Design system usage (tokens only)
- Component priorities (UI components over HTML)
- TypeScript types (interface/type usage)
- Import patterns (barrel exports)
- File naming (kebab-case)
```

## Quick Reference Links

- Workflow: [docs/workflow.md](workflow.md)
- Architecture: [docs/architecture.md](architecture.md)
- Coding Standards: [docs/coding-standards.md](coding-standards.md)
- API Design: [docs/api-design.md](api-design.md)
- Design System: [docs/design-system.md](design-system.md)
- Components: [docs/components.md](components.md)
