import { getContext, setContext } from 'svelte';

export interface DialogContext {
  readonly open: boolean;
  readonly modal: boolean;
  readonly titleId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly triggerId: string | undefined;
  setTitleId(id: string | undefined): void;
  setDescriptionId(id: string | undefined): void;
  setTriggerId(id: string | undefined): void;
  close(): void;
}

const KEY = Symbol('base-ui:dialog');

export function setDialogContext(ctx: DialogContext): void {
  setContext(KEY, ctx);
}

export function getDialogContext(): DialogContext {
  const ctx = getContext<DialogContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: Dialog sub-components must be inside a DialogRoot.');
  return ctx;
}
