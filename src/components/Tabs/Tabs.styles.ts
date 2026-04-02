import { cva } from 'class-variance-authority';

export const tabsListVariants = cva(
  'flex gap-0.5 rounded-xl bg-brand-100 p-1',
);

export const tabsTriggerVariants = cva(
  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-brand-800 data-[state=active]:shadow-sm data-[state=inactive]:text-brand-500 data-[state=inactive]:hover:text-brand-700',
);
