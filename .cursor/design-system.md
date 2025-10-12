# Design System

## Color Tokens

**CRITICAL**: Never use hardcoded colors. Always use design system tokens from `app/shared/styles/app.css`.

### Available Tokens

#### Base Colors
```
bg              # Main background
fg              # Main foreground/text
muted           # Muted background
muted-fg        # Muted foreground/text
border          # Border color
input           # Input field background
ring            # Focus ring color
```

#### Brand Colors
```
primary         # Primary brand color
primary-fg      # Primary foreground (text on primary bg)
secondary       # Secondary brand color
secondary-fg    # Secondary foreground
accent          # Accent color
accent-fg       # Accent foreground
```

#### Status Colors
```
success         # Success state
success-fg      # Success foreground
danger          # Error/danger state
danger-fg       # Danger foreground
warning         # Warning state
warning-fg      # Warning foreground
```

#### Subtle Variants
```
primary-subtle       # Subtle primary background
primary-subtle-fg    # Text on subtle primary
success-subtle       # Subtle success background
success-subtle-fg    # Text on subtle success
danger-subtle        # Subtle danger background
danger-subtle-fg     # Text on subtle danger
```

#### Layout Colors
```
sidebar         # Sidebar background
sidebar-fg      # Sidebar text
navbar          # Navigation bar background
navbar-fg       # Navigation bar text
overlay         # Overlay/modal background
overlay-fg      # Overlay text
```

#### Chart Colors
```
chart-1 through chart-5    # Chart data colors
```

## Usage Rules

### 1. Always Use Tokens
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

### 2. Pair Correctly
Always pair background colors with their corresponding foreground colors:

```tsx
// ✅ Correct
className="bg-primary text-primary-fg"
className="bg-danger text-danger-fg"
className="bg-success-subtle text-success-subtle-fg"

// ❌ Wrong
className="bg-primary text-white"
className="bg-danger text-fg"
```

### 3. Secondary Text
Use `text-muted-fg` for secondary text, NOT `text-secondary`:

```tsx
// ✅ Correct
<p className="text-fg">Main text</p>
<p className="text-muted-fg">Secondary text</p>

// ❌ Wrong
<p className="text-secondary">Secondary text</p>
```

### 4. Error States
Use `danger` tokens for error states, NOT `destructive`:

```tsx
// ✅ Correct
className="text-danger"
className="bg-danger-subtle border-danger"

// ❌ Wrong
className="text-destructive"
className="text-red-500"
```

### 5. Check Available Tokens
Before using any color, verify it exists in `app/shared/styles/app.css`.

## Common Patterns

### Main Content
```tsx
className="bg-bg text-fg"
```

### Secondary/Muted Content
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
className="bg-success-subtle text-success-subtle-fg"  // More subtle
```

### Error/Danger States
```tsx
className="text-danger"
className="bg-danger-subtle border-danger text-danger-subtle-fg"
```

### Warning States
```tsx
className="bg-warning text-warning-fg"
```

### Borders
```tsx
className="border border-border"
```

### Input Fields
```tsx
className="bg-input border-border text-fg"
```

### Focus States
```tsx
className="ring-ring focus:ring-2"
```

### Cards/Containers
```tsx
className="bg-bg border border-border rounded-lg"
className="bg-muted"  // For differentiation
```

### Navigation
```tsx
// Sidebar
className="bg-sidebar text-sidebar-fg"

// Navbar
className="bg-navbar text-navbar-fg"
```

### Modals/Overlays
```tsx
className="bg-overlay text-overlay-fg"
```

## Opacity Modifiers

Use Tailwind opacity modifiers with tokens:

```tsx
className="bg-primary/90"     // 90% opacity
className="bg-danger/50"      // 50% opacity
className="text-fg/70"        // 70% opacity
```

## Dark Mode

Tokens automatically adapt to dark mode. Never hardcode dark mode variants:

```tsx
// ✅ Correct
className="bg-bg text-fg"

// ❌ Wrong
className="bg-white dark:bg-black text-black dark:text-white"
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

Before committing component styles:

- [ ] No hardcoded colors (no `blue-500`, `red-600`, etc.)
- [ ] All colors use design system tokens
- [ ] Background and foreground pairs match (`bg-primary` with `text-primary-fg`)
- [ ] Secondary text uses `text-muted-fg`
- [ ] Error states use `danger` tokens
- [ ] No dark mode variants (tokens handle this)
- [ ] All tokens exist in `app/shared/styles/app.css`
