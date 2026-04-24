import { getContext, setContext } from 'svelte';
import type { Placement } from '../utils/float.js';

export interface PopoverContext {
  readonly open: boolean;
  readonly modal: boolean;
  readonly titleId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly triggerId: string | undefined;
  readonly placement: Placement;
  triggerEl: HTMLElement | null;
  popupEl: HTMLElement | null;
  arrowEl: HTMLElement | null;
  setTitleId(id: string | undefined): void;
  setDescriptionId(id: string | undefined): void;
  setTriggerId(id: string | undefined): void;
  toggle(): void;
  close(): void;
}

const KEY = Symbol('base-ui:popover');

export function setPopoverContext(ctx: PopoverContext): void {
  setContext(KEY, ctx);
}

export function getPopoverContext(): PopoverContext {
  const ctx = getContext<PopoverContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Popover sub-components must be inside a PopoverRoot.');
  return ctx;
}
