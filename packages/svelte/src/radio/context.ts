import { getContext, setContext } from 'svelte';

export interface RadioContext {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
}

const KEY = Symbol('base-ui:radio');

export function setRadioContext(ctx: RadioContext): void {
  setContext(KEY, ctx);
}

export function getRadioContext(): RadioContext {
  const ctx = getContext<RadioContext | undefined>(KEY);
  if (!ctx) {
    throw new Error('Base UI: RadioIndicator must be rendered inside a RadioRoot.');
  }
  return ctx;
}
