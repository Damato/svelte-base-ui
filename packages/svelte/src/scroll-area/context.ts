import { getContext, setContext } from 'svelte';

export interface ScrollAreaContext {
  readonly scrollingX: boolean;
  readonly scrollingY: boolean;
  readonly hovering: boolean;
  viewportEl: HTMLElement | null;
  setScrollingX(v: boolean): void;
  setScrollingY(v: boolean): void;
  setHovering(v: boolean): void;
}

const KEY = Symbol('base-ui:scroll-area');

export function setScrollAreaContext(ctx: ScrollAreaContext): void {
  setContext(KEY, ctx);
}

export function getScrollAreaContext(): ScrollAreaContext {
  const ctx = getContext<ScrollAreaContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: ScrollArea sub-components must be inside a ScrollAreaRoot.');
  return ctx;
}
