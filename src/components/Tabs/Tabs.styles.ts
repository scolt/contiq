import { cva } from 'class-variance-authority'

export const tabsListVariants = cva(
  'flex gap-1 rounded-lg bg-gray-100 p-0.5',
)

export const tabsTriggerVariants = cva(
  'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-gray-800 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700',
)
