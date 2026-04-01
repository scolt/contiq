<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Next.js App

### Feature Structure

Each domain feature lives under `src/features/<domain>/` (e.g. `src/features/chat/`, `src/feature/documents/`).

```
features/<domain>/
├── actions/              # Server actions (one file per action)
│   ├── saveSomething.ts      # Naming: verb-entity.ts
│   ├── updateSomething.ts
│   └── deleteSomething.ts
├── queries/              # Data fetching functions
│   └── getSomething.ts
│   └── getSomethingList.ts
└── components/           # Component tree
    └── ComponentName/
        ├── ComponentName.tsx
        ├── ComponentName.styles.ts        # CVA variants (optional)
        ├── ComponentName.fallback.tsx      # Suspense fallback (optional)
        └── components/               # Sub-components (same structure, recursive)
            └── SubComponentName/
                ├── SubComponentName.tsx
                └── SubComponentName.styles.ts
libs/ # can contains folders and single files (e.g. schemas/api.ts, dateUtils.ts);
components/ # for global components used across features (e.g. Layout, Header, Footer, Button)
└── ComponentName/
        ├── ComponentName.tsx
        ├── ComponentName.styles.ts        # CVA variants (optional)
        ├── ComponentName.fallback.tsx      # Suspense fallback (optional)
        └── components/               # Sub-components (same structure, recursive)
            └── SubComponentName/
                ├── SubComponentName.tsx
                └── SubComponentName.styles.ts
```

### Component Rules

- **Max 150 lines** per component function body (imports excluded).
- **Tailwind only** for styling — no inline styles.
- **CVA variants** go in a separate `.styles.ts` file, not inside the component.
- **Max 1 component per file**
- Use `cn()` utility from `libs/utils/cn` for conditional class merging.
- Prefer `src/components` components for any generic UI element (Button, Card, TextInput, etc.).
- If a UI component doesn't exist yet — create it in `src/componentns` following the UI Library pattern below.

### Action Rules

- One server action per file.
- Name convention: `verbEntity.ts` (e.g. `saveQuiz.ts`, `deleteRound.ts`).
- Actions call the API; they do not access the database directly.

---

## UI Library (`src/components`)

### Component Pattern

Every component follows this structure:

```
src/components/<ComponentName>/
├── <ComponentName>.tsx          # Main component (React.forwardRef, props extend HTML element)
├── <ComponentName>.styles.ts    # CVA variant definitions
├── <ComponentName>.stories.tsx  # Storybook stories
└── index.ts                     # Named re-export
```

- Export each component from `src/index.ts`.
- Use **shadcn** as the preferred base for new components.
- Use **Radix UI** primitives for accessibility (dialogs, tooltips, popovers, etc.).
- Use **Lucide React** for icons.
- Compound component pattern for complex components (e.g. Card → CardHeader, CardContent, CardFooter).

### Existing Components

Button, Card, Chip, Tabs, TextInput, Tooltip, Typography.

## General Rules

- **Package manager:** Check root `package.json` scripts (use `nx` commands).
- **Linting:** ESLint configured per app/lib. Run via NX.
- **Testing:** No tests.
- **No dead code.** Remove unused imports, variables, and files.
- If a third-party package simplifies implementation, install it and mention it in the response.
