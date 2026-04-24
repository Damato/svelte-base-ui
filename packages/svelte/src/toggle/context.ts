import { getContext, setContext } from 'svelte';

export interface ToggleGroupContext {
  readonly value: string[];
  readonly disabled: boolean;
  readonly multiple: boolean;
  toggle(value: string): void;
}

const KEY = Symbol('base-ui:toggle-group');

export function setToggleGroupContext(ctx: ToggleGroupContext): void {
  setContext(KEY, ctx);
}

export function getToggleGroupContext(): ToggleGroupContext | undefined {
  return getContext<ToggleGroupContext | undefined>(KEY);
}
