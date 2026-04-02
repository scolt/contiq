export const PROJECT_COLORS = [
  '#fde68a', // amber
  '#bbf7d0', // emerald
  '#bfdbfe', // sky blue
  '#e9d5ff', // purple
  '#fecaca', // rose
  '#fed7aa', // orange
  '#a5f3fc', // cyan
  '#fbcfe8', // pink
  '#d9f99d', // lime
  '#e0e7ff', // indigo
] as const;

export type ProjectColor = typeof PROJECT_COLORS[number]
