import { getContext, setContext } from 'svelte';

export interface CheckboxContext {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly indeterminate: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
}

const KEY = Symbol('base-ui:checkbox');

export function setCheckboxContext(ctx: CheckboxContext): void {
  setContext(KEY, ctx);
}

export function getCheckboxContext(): CheckboxContext {
  const ctx = getContext<CheckboxContext | undefined>(KEY);
  if (!ctx) {
    throw new Error(
      'Base UI: CheckboxIndicator must be rendered inside a CheckboxRoot.',
    );
  }
  return ctx;
}
