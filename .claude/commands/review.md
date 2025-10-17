Run code review checklist for the current changes:

## Architecture Review
@docs/architecture.md

- [ ] Routes are thin, delegate to modules
- [ ] Modules have index.ts barrel exports
- [ ] NO modules/index.ts at root
- [ ] Imports follow hierarchy (Routes → Modules → Shared)
- [ ] Files use kebab-case naming

## Coding Standards Review
@docs/coding-standards.md

- [ ] interface for objects, type for unions
- [ ] Imports organized (React → Modules → Shared → Types)
- [ ] Zustand stores follow pattern
- [ ] Functions verb-based, hooks use prefix
- [ ] Comments explain "why" not "what"
- [ ] cn() used for className management

## Design System Review
@docs/design-system.md

- [ ] No hardcoded colors (no bg-blue-500, etc)
- [ ] All colors use design system tokens
- [ ] Bg/fg pairs match (bg-primary with text-primary-fg)
- [ ] Secondary text uses text-muted-fg
- [ ] Errors use danger tokens, not destructive

## Component Review
@docs/components.md

- [ ] UI components used instead of HTML (Button not button)
- [ ] className only for layout/positioning
- [ ] Component props used for design system
- [ ] Check existing components before adding
- [ ] Prefer uncontrolled state
- [ ] Import from barrel exports

## API Design Review
@docs/api-design.md

- [ ] Axios instance in shared/lib/axios.ts
- [ ] Service layer follows pattern
- [ ] Store integrates with service
- [ ] Proper error handling
- [ ] Types defined in [feature]-types.ts

Provide findings and suggestions for improvements.
