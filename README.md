# React Router Starter

Modern React starter with **React Router v7**, **IntentUI**, and **feature-first architecture**.

## Quick Start

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server
pnpm build      # Build production
```

## Stack

- **React 19** + **React Router v7** + **TypeScript**
- **Tailwind CSS v4** + **IntentUI** (React Aria)
- **Zustand** + **React Query** + **Axios**

## Structure

```
app/
├── routes/     # File-based routing
├── modules/    # Feature modules
└── shared/     # UI & utilities
```

**3-layer**: Routes → Modules → Shared

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Quick reference (AI assistants)
- **[docs/](docs/)** - Full development guides
- **Slash commands**: `/arch`, `/standards`, `/api`, `/review`

See [docs/README.md](docs/README.md) for complete index.

## Commands

```bash
pnpm dev          # Dev server
pnpm build        # Build
pnpm typecheck    # Type check
pnpm check        # All checks
pnpm fix          # Auto-fix
pnpm add-ui       # Add IntentUI component
```

## License

MIT
