"use client";

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/libs/utils/cn';
import { tabsListVariants, tabsTriggerVariants } from './Tabs.styles';

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn(tabsListVariants(), className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger className={cn(tabsTriggerVariants(), className)} {...props} />;
}

export function TabsContent({ className, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn('h-full', className)} {...props} />;
}
