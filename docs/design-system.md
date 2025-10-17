# Design System

**CRITICAL**: Never hardcoded colors. Always use tokens from `app/shared/styles/app.css`.

## Color Tokens

### Base
```
bg              # Main background
fg              # Main text
muted           # Muted background
muted-fg        # Muted text
border          # Borders
input           # Input background
ring            # Focus ring
```

### Brand
```
primary         # Primary color
primary-fg      # Text on primary
secondary       # Secondary color
secondary-fg    # Text on secondary
accent          # Accent color
accent-fg       # Text on accent
```

### Status
```
success         # Success state
success-fg      # Text on success
danger          # Error/danger
danger-fg       # Text on danger
warning         # Warning state
warning-fg      # Text on warning
```

### Subtle Variants
```
primary-subtle       # Subtle primary bg
primary-subtle-fg    # Text on subtle primary
success-subtle       # Subtle success bg
success-subtle-fg    # Text on subtle success
danger-subtle        # Subtle danger bg
danger-subtle-fg     # Text on subtle danger
```

### Layout
```
sidebar         # Sidebar bg
sidebar-fg      # Sidebar text
navbar          # Navbar bg
navbar-fg       # Navbar text
overlay         # Modal/overlay bg
overlay-fg      # Overlay text
```

### Charts
```
chart-1 through chart-5    # Chart colors
```

## Usage Rules

### Always Use Tokens

```tsx
// ✅ Correct
className="bg-primary text-primary-fg"
className="bg-bg text-fg"
className="text-muted-fg"

// ❌ Wrong
className="bg-blue-500 text-white"
className="bg-[#ffffff] text-[#000000]"
className="text-gray-600"
```

### Pair Correctly

Always pair bg/fg colors:

```tsx
// ✅ Correct
className="bg-primary text-primary-fg"
className="bg-danger text-danger-fg"
className="bg-success-subtle text-success-subtle-fg"

// ❌ Wrong
className="bg-primary text-white"
className="bg-danger text-fg"
```

### Secondary Text

Use `text-muted-fg` for secondary text:

```tsx
// ✅ Correct
<p className="text-fg">Main text</p>
<p className="text-muted-fg">Secondary text</p>

// ❌ Wrong
<p className="text-secondary">Secondary text</p>
```

### Error States

Use `danger` tokens for errors:

```tsx
// ✅ Correct
className="text-danger"
className="bg-danger-subtle border-danger"

// ❌ Wrong
className="text-destructive"
className="text-red-500"
```

## Common Patterns

### Main Content
```tsx
className="bg-bg text-fg"
```

### Secondary/Muted
```tsx
className="bg-muted text-muted-fg"
```

### Primary Actions
```tsx
className="bg-primary text-primary-fg hover:bg-primary/90"
```

### Success States
```tsx
className="bg-success text-success-fg"
className="bg-success-subtle text-success-subtle-fg"  // Subtle
```

### Error/Danger
```tsx
className="text-danger"
className="bg-danger-subtle border-danger text-danger-subtle-fg"
```

### Borders
```tsx
className="border border-border"
```

### Input Fields
```tsx
className="bg-input border-border text-fg"
```

### Focus
```tsx
className="ring-ring focus:ring-2"
```

### Cards
```tsx
className="bg-bg border border-border rounded-lg"
className="bg-muted"  // For differentiation
```

### Navigation
```tsx
className="bg-sidebar text-sidebar-fg"  // Sidebar
className="bg-navbar text-navbar-fg"    // Navbar
```

## Opacity Modifiers

Use Tailwind opacity with tokens:

```tsx
className="bg-primary/90"     // 90% opacity
className="bg-danger/50"      // 50% opacity
className="text-fg/70"        // 70% opacity
```

## Dark Mode

Tokens auto-adapt. Never hardcode dark mode:

```tsx
// ✅ Correct
className="bg-bg text-fg"

// ❌ Wrong
className="bg-white dark:bg-black"
```

## Hover/Active States

```tsx
// Primary button
className="bg-primary text-primary-fg hover:bg-primary/90 active:bg-primary/80"

// Outline button
className="border border-border bg-bg hover:bg-accent hover:text-accent-fg"

// Danger button
className="bg-danger text-danger-fg hover:bg-danger/90"
```

## Validation Checklist

- [ ] No hardcoded colors
- [ ] All colors use tokens
- [ ] Bg/fg pairs match
- [ ] Secondary text uses `text-muted-fg`
- [ ] Errors use `danger` tokens
- [ ] No dark mode variants
- [ ] All tokens exist in `app/shared/styles/app.css`
