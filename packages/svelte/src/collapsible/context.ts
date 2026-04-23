import { getContext, setContext } from 'svelte';

export interface CollapsibleContext {
  readonly open: boolean;
  readonly disabled: boolean;
  readonly panelId: string;
  toggle(): void;
}

const KEY = Symbol('base-ui:collapsible');

export function setCollapsibleContext(ctx: CollapsibleContext): void {
  setContext(KEY, ctx);
}

export function getCollapsibleContext(): CollapsibleContext {
  const ctx = getContext<CollapsibleContext | undefined>(KEY);
  if (!ctx) {
    throw new Error(
      'Base UI: CollapsibleTrigger and CollapsiblePanel must be rendered inside a CollapsibleRoot.',
    );
  }
  return ctx;
}
