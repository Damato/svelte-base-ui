import { getContext, setContext } from 'svelte';

export interface MeterContext {
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly formattedValue: string | null;
  setLabelId(id: string | undefined): void;
}

const KEY = Symbol('base-ui:meter');

export function setMeterContext(ctx: MeterContext): void {
  setContext(KEY, ctx);
}

export function getMeterContext(): MeterContext {
  const ctx = getContext<MeterContext | undefined>(KEY);
  if (!ctx) {
    throw new Error('Base UI: Meter sub-components must be rendered inside a MeterRoot.');
  }
  return ctx;
}
