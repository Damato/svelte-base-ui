import { getContext, setContext } from 'svelte';

export interface FieldContext {
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly required: boolean;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly controlId: string | undefined;
  setLabelId(id: string | undefined): void;
  setDescriptionId(id: string | undefined): void;
  setControlId(id: string | undefined): void;
}

const KEY = Symbol('base-ui:field');

export function setFieldContext(ctx: FieldContext): void {
  setContext(KEY, ctx);
}

export function getFieldContext(): FieldContext | undefined {
  return getContext<FieldContext | undefined>(KEY);
}
