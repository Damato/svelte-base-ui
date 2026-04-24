import { getContext, setContext } from 'svelte';

export interface TabsContext {
  readonly value: string | number;
  readonly orientation: 'horizontal' | 'vertical';
  select(value: string | number): void;
  isSelected(value: string | number): boolean;
}

const KEY = Symbol('base-ui:tabs');

export function setTabsContext(ctx: TabsContext): void {
  setContext(KEY, ctx);
}

export function getTabsContext(): TabsContext {
  const ctx = getContext<TabsContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Tabs sub-components must be inside a TabsRoot.');
  return ctx;
}
