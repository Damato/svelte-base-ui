import { getContext, setContext } from 'svelte';
import type { Placement } from '../utils/float.js';

export interface ComboboxContext<T = string> {
  readonly value: T | T[] | undefined;
  readonly multiple: boolean;
  readonly inputValue: string;
  readonly open: boolean;
  readonly placement: Placement;
  triggerEl: HTMLElement | null;
  inputEl: HTMLInputElement | null;
  popupEl: HTMLElement | null;
  isSelected(v: T): boolean;
  select(v: T): void;
  setInputValue(v: string): void;
  openList(): void;
  closeList(): void;
}

const KEY = Symbol('base-ui:combobox');

export function setComboboxContext<T>(ctx: ComboboxContext<T>): void {
  setContext(KEY, ctx as ComboboxContext);
}

export function getComboboxContext<T = string>(): ComboboxContext<T> {
  const ctx = getContext<ComboboxContext<T> | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Combobox sub-components must be inside a ComboboxRoot.');
  return ctx;
}
