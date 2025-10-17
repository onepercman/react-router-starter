# Domain-Specific Documentation

Domain-specific rules and context for project features.

## Purpose

This directory contains domain-specific documentation for:
- Feature-specific business rules
- Domain logic and constraints
- Module-specific guidelines
- Project-specific patterns

## Structure

```
docs/domains/
├── README.md              # This file
├── [domain-name].md       # Domain-specific rules
└── examples/              # Domain examples (optional)
```

## Creating Domain Docs

**Each domain file should**:
- Focus on ONE business domain
- Include business rules and constraints
- Provide domain-specific patterns
- Reference related modules
- **Stay under 1,000 tokens** (~750 words)

## Template

Create new domain docs following this template:

```markdown
# [Domain Name]

Brief description of this business domain.

## Overview
- Purpose and scope
- Related modules: `modules/[feature]`
- Key entities and concepts

## Business Rules
1. [Rule 1]
2. [Rule 2]

## Domain Logic
[Specific logic and constraints]

## Common Patterns
[Code examples for this domain]

## Related Documentation
- [Link to related docs]
```

## Example Domains

For a typical application, you might have:

```
domains/
├── authentication.md      # Auth rules, session management
├── authorization.md       # Permissions, RBAC rules
├── user-management.md     # User CRUD, profile rules
├── payments.md            # Payment flow, validation
└── notifications.md       # Notification rules, channels
```

## Token Limits

**Maximum per domain file**: 1,000 tokens (~750 words)

If a domain needs more documentation:
1. Split into multiple focused files
2. Create subdirectory for complex domains:
   ```
   domains/payments/
   ├── README.md
   ├── checkout-flow.md
   └── refunds.md
   ```

## When to Create Domain Docs

Create domain-specific docs when:
- ✅ Feature has complex business rules
- ✅ Domain logic is not obvious from code
- ✅ Multiple modules interact for one domain
- ✅ Specific constraints or validation rules
- ✅ Domain patterns differ from general patterns

**Don't create if**:
- ❌ Simple CRUD with no special rules
- ❌ Rules already clear in general docs
- ❌ Only used in one small module

## Guidelines

### Keep Generic Base Docs
- General patterns stay in main `docs/`
- Domain-specific rules go in `docs/domains/`
- No duplication between general and domain docs

### Reference, Don't Repeat
```markdown
<!-- ❌ Bad - Duplicating general rules -->
## Creating Components
Components should use design tokens...

<!-- ✅ Good - Reference + Domain-specific -->
## Payment Components
Follow [component guidelines](../components.md).

Domain-specific rules:
- Always validate amount format
- Show currency symbol based on locale
```

### Use Slash Commands
Consider creating domain-specific slash commands:
```
.claude/commands/domain-[name].md
```

## Maintenance

- Review domain docs quarterly
- Update when business rules change
- Remove obsolete domains
- Keep under token limits
- Use generic terms where possible

---

**This is a template directory**. Add your project-specific domains as you build features.
