import { getContext, setContext } from 'svelte';
import type { Placement } from '../utils/float.js';

export interface MenuContext {
  readonly open: boolean;
  readonly placement: Placement;
  triggerEl: HTMLElement | null;
  popupEl: HTMLElement | null;
  /** Highlighted item index */
  highlightedIndex: number;
  toggle(): void;
  close(): void;
}

const KEY = Symbol('base-ui:menu');

export function setMenuContext(ctx: MenuContext): void {
  setContext(KEY, ctx);
}

export function getMenuContext(): MenuContext {
  const ctx = getContext<MenuContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Menu sub-components must be inside a MenuRoot.');
  return ctx;
}
