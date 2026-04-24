import { getContext, setContext } from 'svelte';
import type { Placement } from '../utils/float.js';

export interface TooltipContext {
  readonly open: boolean;
  readonly placement: Placement;
  triggerEl: HTMLElement | null;
  popupEl: HTMLElement | null;
  arrowEl: HTMLElement | null;
  openTooltip(): void;
  closeTooltip(): void;
}

const KEY = Symbol('base-ui:tooltip');

export function setTooltipContext(ctx: TooltipContext): void {
  setContext(KEY, ctx);
}

export function getTooltipContext(): TooltipContext {
  const ctx = getContext<TooltipContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Tooltip sub-components must be inside a TooltipRoot.');
  return ctx;
}
