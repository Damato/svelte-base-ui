import { getContext, setContext } from 'svelte';

export interface SwitchContext {
  readonly checked: boolean;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  readonly required: boolean;
}

const KEY = Symbol('base-ui:switch');

export function setSwitchContext(ctx: SwitchContext): void {
  setContext(KEY, ctx);
}

export function getSwitchContext(): SwitchContext {
  const ctx = getContext<SwitchContext | undefined>(KEY);
  if (!ctx) {
    throw new Error(
      'Base UI: SwitchThumb must be rendered inside a SwitchRoot.',
    );
  }
  return ctx;
}
