import { getContext, setContext } from 'svelte';

export interface SliderContext {
  readonly values: number[];
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly disabled: boolean;
  readonly orientation: 'horizontal' | 'vertical';
  readonly name: string | undefined;
  readonly form: string | undefined;
  readonly formattedValues: (string | null)[];
  updateThumb(index: number, value: number): void;
  commitThumb(index: number, value: number): void;
}

const KEY = Symbol('base-ui:slider');

export function setSliderContext(ctx: SliderContext): void {
  setContext(KEY, ctx);
}

export function getSliderContext(): SliderContext {
  const ctx = getContext<SliderContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Slider sub-components must be inside a SliderRoot.');
  return ctx;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function snapToStep(value: number, min: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return Math.round(snapped * 1e10) / 1e10;
}
