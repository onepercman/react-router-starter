# Contributing to Documentation

Guidelines for maintaining and extending project documentation.

## Documentation Token Limits

**CRITICAL**: All documentation files MUST stay within token limits to maintain efficiency.

### Token Limits by File Type

| File Type | Max Tokens | Max Words | Purpose |
|-----------|------------|-----------|---------|
| **CLAUDE.md** | 600 tokens | ~450 words | Quick reference only |
| **Core Docs** | 1,500 tokens | ~1,125 words | Main documentation files |
| **Domain Docs** | 1,000 tokens | ~750 words | Domain-specific rules |
| **README files** | 400 tokens | ~300 words | Index/navigation only |
| **Slash Commands** | 200 tokens | ~150 words | Command instructions |

### Core Documentation Files

These are the main docs in `docs/`:

```
docs/
├── workflow.md          (max 1,500 tokens)
├── architecture.md      (max 1,500 tokens)
├── coding-standards.md  (max 1,500 tokens)
├── api-design.md        (max 1,500 tokens)
├── routing.md           (max 1,000 tokens)
├── design-system.md     (max 1,000 tokens)
├── components.md        (max 1,500 tokens)
├── prompts.md           (max 1,500 tokens)
└── testing.md           (max 1,000 tokens)
```

## When Files Exceed Limits

If a documentation file grows too large:

### 1. Consolidate and Refactor
- Remove redundant content
- Consolidate similar sections
- Use more concise language
- Remove verbose explanations

### 2. Split into Multiple Files
```
# Before (too large)
docs/architecture.md (2,500 tokens)

# After (split)
docs/architecture.md (1,400 tokens)
docs/architecture-advanced.md (900 tokens)
```

### 3. Move to Domain-Specific
```
# If content is feature-specific
docs/architecture.md → Generic patterns
docs/domains/auth.md → Auth-specific architecture
```

### 4. Create Subdirectory
```
# For complex topics
docs/architecture/
├── README.md          (400 tokens - overview + index)
├── modules.md         (800 tokens)
├── routing.md         (600 tokens)
└── imports.md         (700 tokens)
```

## Writing Guidelines

### Keep It Concise

```markdown
<!-- ❌ Verbose -->
When you are creating a new component, it is very important
that you remember to always check if the component already
exists in the shared components directory before you proceed
to add a new one from the registry.

<!-- ✅ Concise -->
Check if component exists in `~/shared/components/ui` before adding.
```

### Use Bullet Points

```markdown
<!-- ❌ Paragraphs -->
The first thing you need to do is analyze the requirement.
After that, you should create a plan. Then present it to
the user and wait for approval.

<!-- ✅ Bullets -->
1. Analyze requirement
2. Create plan
3. Present to user
4. Wait for approval
5. Implement
```

### Code Over Explanation

```markdown
<!-- ❌ Explanation -->
You should create a barrel export file named index.ts
in your module directory that exports all the public
components and types.

<!-- ✅ Code Example -->
```ts
// modules/[feature]/index.ts
export * from "./[feature]-service"
export { useFeatureStore } from "./[feature]-store"
export type { FeatureState } from "./[feature]-types"
```
```

### Generic Terms

```markdown
<!-- ❌ Specific -->
In the auth module, create auth-store.ts with useAuthStore
and auth-types.ts with User and AuthState interfaces.

<!-- ✅ Generic -->
In modules/[feature]/, create:
- [feature]-store.ts with use[Feature]Store
- [feature]-types.ts with type definitions
```

## Token Counting

Calculate tokens for your documentation:

```bash
# Count words and estimate tokens
words=$(wc -w < file.md)
tokens=$((words * 4 / 3))
echo "~$tokens tokens"

# Target: words * 1.33 ≈ tokens
```

**Estimation**:
- 1 word ≈ 1.33 tokens
- 750 words ≈ 1,000 tokens
- 1,125 words ≈ 1,500 tokens

## Documentation Standards

### File Header

Every doc should start with:

```markdown
# [Title]

Brief description (1 sentence).
```

### No Redundancy

```markdown
<!-- ❌ Duplicate content -->
# architecture.md
Rules about imports...

# coding-standards.md
Same rules about imports...

<!-- ✅ Reference -->
# coding-standards.md
For import hierarchy, see [architecture.md](architecture.md#import-flow).
```

### Generic Patterns

Use placeholders:
- `[feature]` - Feature/module name
- `[component]` - Component name
- `[type]` - Type name
- `[page]` - Route/page name

### Examples

Always provide code examples:
- ✅ Short, focused examples
- ✅ Actual working code
- ❌ Pseudo-code or comments only

## Adding New Documentation

### Before Adding

1. **Check if content fits existing docs**
   - Can it be added to current file?
   - Would it cause file to exceed token limit?

2. **Determine appropriate location**
   - General pattern → `docs/`
   - Domain-specific → `docs/domains/`
   - Quick reference → Add to `CLAUDE.md`

3. **Check token count**
   - Use word count: `wc -w file.md`
   - Estimate: `words * 4 / 3`
   - Stay under limits

### Creating New Docs

```bash
# 1. Create file
touch docs/new-topic.md

# 2. Write content (stay under 1,500 tokens)

# 3. Count tokens
words=$(wc -w < docs/new-topic.md)
echo "~$((words * 4 / 3)) tokens"

# 4. Update docs/README.md index

# 5. Consider adding slash command
touch .claude/commands/new-topic.md
```

## Slash Commands

Keep slash commands minimal:

```markdown
<!-- .claude/commands/topic.md -->
Please load and follow the guidelines in @docs/topic.md

Focus on:
- Key point 1
- Key point 2
- Key point 3
```

**Max 200 tokens** (150 words)

## Domain Documentation

### Creating Domain Docs

```bash
# 1. Create domain file
touch docs/domains/feature-name.md

# 2. Use template from docs/domains/_example.md

# 3. Keep under 1,000 tokens (~750 words)

# 4. Update docs/domains/README.md
```

### Domain Doc Structure

```markdown
# [Domain Name]

Brief description.

## Overview
- Purpose
- Related modules
- Key entities

## Business Rules
1. Rule 1
2. Rule 2

## Domain Logic
[Patterns and constraints]

## Common Patterns
[Code examples]

## Related Documentation
- [Link to related docs]
```

## Maintenance Checklist

Before committing documentation changes:

- [ ] File stays under token limit
- [ ] No redundant content
- [ ] Uses generic terms (`[feature]`, etc.)
- [ ] Code examples are concise
- [ ] Updated relevant indexes (README files)
- [ ] Tested slash commands (if added)
- [ ] Removed commented-out content
- [ ] Verified links work

## Review Process

### Token Count Review

```bash
# Run before commit
for file in docs/*.md; do
  words=$(wc -w < "$file")
  tokens=$((words * 4 / 3))
  limit=1500
  [[ $tokens -gt $limit ]] && echo "⚠️  $(basename $file): $tokens tokens (limit: $limit)"
done
```

### Content Review

1. **Clarity**: Is it easy to understand?
2. **Conciseness**: Can it be shorter?
3. **Accuracy**: Is information correct?
4. **Relevance**: Does it belong here?
5. **Examples**: Are examples clear?

## Breaking Changes

If updating docs structure:

1. Update all references
2. Test slash commands
3. Update README files
4. Document in CHANGELOG
5. Notify team

## Questions?

See:
- [docs/README.md](README.md) - Documentation index
- [docs/workflow.md](workflow.md) - Development workflow
- [.github/DOCUMENTATION.md](../.github/DOCUMENTATION.md) - Documentation guide

---

**Remember**: Concise docs = Better AI context = Faster development
