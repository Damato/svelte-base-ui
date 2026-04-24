import { getContext, setContext } from 'svelte';

export interface RadioGroupContext {
  readonly checkedValue: string | undefined;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly name: string | undefined;
  readonly form: string | undefined;
  select(value: string): void;
}

const KEY = Symbol('base-ui:radio-group');

export function setRadioGroupContext(ctx: RadioGroupContext): void {
  setContext(KEY, ctx);
}

export function getRadioGroupContext(): RadioGroupContext | undefined {
  return getContext<RadioGroupContext | undefined>(KEY);
}
