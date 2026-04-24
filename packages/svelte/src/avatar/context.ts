import { getContext, setContext } from 'svelte';

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AvatarContext {
  readonly status: ImageLoadingStatus;
  setStatus(status: ImageLoadingStatus): void;
}

const KEY = Symbol('base-ui:avatar');

export function setAvatarContext(ctx: AvatarContext): void {
  setContext(KEY, ctx);
}

export function getAvatarContext(): AvatarContext {
  const ctx = getContext<AvatarContext | undefined>(KEY);
  if (!ctx) {
    throw new Error('Base UI: Avatar sub-components must be rendered inside an AvatarRoot.');
  }
  return ctx;
}
