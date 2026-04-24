import { getContext, setContext } from 'svelte';

export interface NumberFieldContext {
  readonly value: number | null;
  readonly min: number | undefined;
  readonly max: number | undefined;
  readonly step: number;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
  readonly inputId: string;
  increment(): void;
  decrement(): void;
  setValue(v: number | null): void;
}

const KEY = Symbol('base-ui:number-field');

export function setNumberFieldContext(ctx: NumberFieldContext): void {
  setContext(KEY, ctx);
}

export function getNumberFieldContext(): NumberFieldContext {
  const ctx = getContext<NumberFieldContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: NumberField sub-components must be inside a NumberFieldRoot.');
  return ctx;
}
