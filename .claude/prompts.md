# Common Development Prompts

Quick prompts for common tasks. Always refer to detailed docs for context.

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
Create [ComponentName] in modules/[module]/components:
- Use tailwind-variants for styling
- Use design system tokens only
- Use React Aria components from ~/shared/components/ui
- Add proper TypeScript types
```

### Add UI Component from Registry
```
Add [component-name] from IntentUI:
npx shadcn@latest add @intentui/[component-name]
```

### Create Custom Component with Variants
```
Create [ComponentName] with variants:
- variant: [list variants]
- size: [list sizes]
Use tailwind-variants and design tokens
```

## Module Development

### Create New Module
```
Create module for [feature] in app/modules/[feature]:
- Structure: index.ts, components/, hooks/, [feature]-store.ts, [feature]-types.ts
- Add barrel exports
- Follow architecture pattern
```

### Create Zustand Store
```
Create Zustand store for [feature]:
- Include data, isLoading, error states
- Add persist middleware
- Type all state and actions
- Follow store pattern
```

### Extract Logic to Module
```
Move [logic/component] from routes/[route] to modules/[module]:
- Extract business logic
- Keep route as composition layer
- Add barrel exports
```

## Styling & Design System

### Fix Design Token Violations
```
Audit [file] for design system violations:
- Replace hardcoded colors with tokens
- Fix incorrect token usage
- Verify bg/fg pairings
- Use danger tokens for errors
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
Use className only for layout
```

## Code Quality

### Fix Import Order
```
Organize imports in [file]:
1. React and external
2. Modules (~/modules/...)
3. Shared (~/shared/...)
4. Type imports
```

### Extract Types
```
Extract types from [file] to [module]-types.ts:
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
Refactor [component] from [route] to module:
- Move to modules/[module]/components
- Extract business logic
- Update imports
- Add barrel export
```

### Create Barrel Exports
```
Create barrel exports for modules/[module]:
- Export components, hooks, stores
- Export types
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
- Use Form component
- Add validation
- Handle submit/errors
- Use TextField components
```

## Architecture

### Review Architecture
```
Review architecture of modules/[module]:
- Check layer separation
- Verify import hierarchy
- Validate file organization
- Check barrel exports
```

### Create Service Layer
```
Create service for [feature]:
- API calls
- Business logic
- Error handling
- Type safety
```

## Common Fixes

### Fix All Design Violations in File
```
Fix all design system violations in [file]:
1. Replace hardcoded colors
2. Use correct tokens
3. Fix bg/fg pairs
4. Use text-muted-fg for secondary
5. Use danger for errors
```

### Fix All Component Issues
```
Fix component issues in [file]:
1. Replace HTML with UI components
2. Remove style overrides
3. Use design tokens
4. Add proper types
5. Fix imports
```

### Audit Module
```
Audit modules/[module] for compliance:
- Architecture patterns
- Design system usage
- Component priorities
- TypeScript types
- Import patterns
- File naming
```

---

## Reference Quick Links

- Architecture: [.claude/architecture.md](.claude/architecture.md)
- Design System: [.claude/design-system.md](.claude/design-system.md)
- Components: [.claude/components.md](.claude/components.md)
- Coding Standards: [.claude/coding-standards.md](.claude/coding-standards.md)
