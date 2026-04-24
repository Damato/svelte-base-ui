import { getContext, setContext } from 'svelte';

export interface NavigationMenuRootContext {
  readonly value: string | undefined;
  readonly orientation: 'horizontal' | 'vertical';
  setActiveItem(value: string | undefined): void;
  isActive(value: string): boolean;
}

export interface NavigationMenuItemContext {
  readonly value: string;
  readonly active: boolean;
}

const ROOT_KEY = Symbol('base-ui:nav-menu-root');
const ITEM_KEY = Symbol('base-ui:nav-menu-item');

export function setNavMenuRootContext(ctx: NavigationMenuRootContext): void {
  setContext(ROOT_KEY, ctx);
}

export function getNavMenuRootContext(): NavigationMenuRootContext {
  const ctx = getContext<NavigationMenuRootContext | undefined>(ROOT_KEY);
  if (!ctx) throw new Error('Base UI: NavigationMenu sub-components must be inside a NavigationMenuRoot.');
  return ctx;
}

export function setNavMenuItemContext(ctx: NavigationMenuItemContext): void {
  setContext(ITEM_KEY, ctx);
}

export function getNavMenuItemContext(): NavigationMenuItemContext {
  const ctx = getContext<NavigationMenuItemContext | undefined>(ITEM_KEY);
  if (!ctx) throw new Error('Base UI: NavigationMenuTrigger/Content must be inside a NavigationMenuItem.');
  return ctx;
}
