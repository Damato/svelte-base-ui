import { getContext, setContext } from 'svelte';

export interface ToolbarContext {
  readonly disabled: boolean;
  readonly orientation: 'horizontal' | 'vertical';
}

const KEY = Symbol('base-ui:toolbar');

export function setToolbarContext(ctx: ToolbarContext): void {
  setContext(KEY, ctx);
}

export function getToolbarContext(): ToolbarContext | undefined {
  return getContext<ToolbarContext | undefined>(KEY);
}
