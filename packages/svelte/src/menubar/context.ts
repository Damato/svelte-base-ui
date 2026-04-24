import { getContext, setContext } from 'svelte';

export interface MenubarContext {
  readonly disabled: boolean;
  readonly orientation: 'horizontal' | 'vertical';
}

const KEY = Symbol('base-ui:menubar');

export function setMenubarContext(ctx: MenubarContext): void {
  setContext(KEY, ctx);
}

export function getMenubarContext(): MenubarContext | undefined {
  return getContext<MenubarContext | undefined>(KEY);
}
