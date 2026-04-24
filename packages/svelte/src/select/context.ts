import { getContext, setContext } from 'svelte';
import type { Placement } from '../utils/float.js';

export interface SelectContext<T = string> {
  readonly value: T | T[] | undefined;
  readonly multiple: boolean;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly open: boolean;
  readonly placement: Placement;
  triggerEl: HTMLElement | null;
  popupEl: HTMLElement | null;
  isSelected(v: T): boolean;
  select(v: T): void;
  toggle(): void;
  close(): void;
}

const KEY = Symbol('base-ui:select');

export function setSelectContext<T>(ctx: SelectContext<T>): void {
  setContext(KEY, ctx as SelectContext);
}

export function getSelectContext<T = string>(): SelectContext<T> {
  const ctx = getContext<SelectContext<T> | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Select sub-components must be inside a SelectRoot.');
  return ctx;
}
