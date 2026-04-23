import { getContext, setContext } from 'svelte';

export type ProgressStatus = 'indeterminate' | 'progressing' | 'complete';

export interface ProgressContext {
  readonly value: number | null;
  readonly min: number;
  readonly max: number;
  readonly status: ProgressStatus;
  readonly formattedValue: string | null;
  setLabelId(id: string | undefined): void;
}

const KEY = Symbol('base-ui:progress');

export function setProgressContext(ctx: ProgressContext): void {
  setContext(KEY, ctx);
}

export function getProgressContext(): ProgressContext {
  const ctx = getContext<ProgressContext | undefined>(KEY);
  if (!ctx) {
    throw new Error(
      'Base UI: Progress sub-components must be rendered inside a ProgressRoot.',
    );
  }
  return ctx;
}

export function formatNumberValue(
  value: number | null,
  locale?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): string | null {
  if (value == null) return null;
  try {
    return new Intl.NumberFormat(locale as string | undefined, options).format(value);
  } catch {
    return String(value);
  }
}

export function valueToPercent(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}
