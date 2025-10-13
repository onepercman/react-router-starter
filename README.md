# React Router Starter

A modern React application starter template built with **React Router v7**, **IntentUI components**, and **feature-first architecture**.

## Features

- ⚡ **React Router v7** - File-based routing with SSR support
- 🎨 **Tailwind CSS v4** - Design system with CSS variables
- 🧩 **IntentUI Components** - Accessible React Aria Components
- 🏗️ **Routes & Modules Architecture** - Clear separation of concerns
- 🛠️ **TypeScript** - Full type safety with strict mode
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Technology Stack

### Core
- **React 19** - Functional components with latest features
- **React Router v7** - File-based routing with type safety
- **TypeScript** - Strict mode enabled
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS v4** - Design system with CSS variables
- **React Aria Components** - Accessible UI primitives
- **IntentUI** - Component registry (shadcn-compatible)
- **tailwind-variants** - Component variant system

### State Management
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **next-themes** - Theme management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Project Structure

```
react-router-starter/
├── app/                  # Application source
│   ├── routes/           # File-based routing
│   ├── modules/          # Feature modules
│   └── shared/           # Shared utilities & UI
├── .claude/              # Claude AI documentation
└── .cursor/              # Cursor AI documentation
```

## AI Assistant Documentation

This project includes comprehensive documentation for AI coding assistants:

### For Claude Code Users
📁 **[.claude/](.claude/)** - Complete Claude AI documentation
- Start with [.claude/README.md](.claude/README.md)
- Architecture, routing conventions, coding standards
- Component guidelines, design system tokens
- Implementation patterns and best practices

### For Cursor AI Users
📁 **[.cursor/](.cursor/)** - Cursor AI configuration
- Project-specific rules and conventions
- Code style preferences
- Custom prompts and snippets

## Development Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Code Quality
pnpm typecheck    # Run TypeScript checks
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm check        # Run all checks
pnpm fix          # Auto-fix issues

# Components
pnpm add-ui       # Add IntentUI components
```

## Architecture Overview

### Three-Layer Architecture

**Routes** (`app/routes/`) → **Modules** (`app/modules/`) → **Shared** (`app/shared/`)

- **Routes**: Page composition only, file-based routing
- **Modules**: Feature-based business logic and components
- **Shared**: Global utilities and UI design system

For detailed architecture documentation, see [.claude/architecture.md](.claude/architecture.md)

## Key Principles

1. **Feature-first organization** - Group by feature, not file type
2. **Design system tokens** - Use semantic color tokens, never hardcoded values
3. **Component-first UI** - Leverage IntentUI before creating custom components
4. **Type safety** - TypeScript strict mode throughout
5. **Clean separation** - Routes compose from modules, modules are reusable

## Documentation

- **Architecture**: [.claude/architecture.md](.claude/architecture.md)
- **Routing**: [.claude/routing.md](.claude/routing.md)
- **Design System**: [.claude/design-system.md](.claude/design-system.md)
- **Components**: [.claude/components.md](.claude/components.md)
- **Coding Standards**: [.claude/coding-standards.md](.claude/coding-standards.md)

## License

MIT