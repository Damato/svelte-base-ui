import { getContext, setContext } from 'svelte';

export interface CheckboxGroupContext {
  readonly value: string[];
  readonly disabled: boolean;
  toggle(value: string): void;
}

const KEY = Symbol('base-ui:checkbox-group');

export function setCheckboxGroupContext(ctx: CheckboxGroupContext): void {
  setContext(KEY, ctx);
}

export function getCheckboxGroupContext(): CheckboxGroupContext | undefined {
  return getContext<CheckboxGroupContext | undefined>(KEY);
}
