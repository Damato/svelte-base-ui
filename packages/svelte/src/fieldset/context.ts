import { getContext, setContext } from 'svelte';

export interface FieldsetContext {
  readonly disabled: boolean;
  readonly legendId: string | undefined;
  setLegendId(id: string | undefined): void;
}

const KEY = Symbol('base-ui:fieldset');

export function setFieldsetContext(ctx: FieldsetContext): void {
  setContext(KEY, ctx);
}

export function getFieldsetContext(): FieldsetContext | undefined {
  return getContext<FieldsetContext | undefined>(KEY);
}
