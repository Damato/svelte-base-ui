import { getContext, setContext } from 'svelte';

export type TextDirection = 'ltr' | 'rtl';

const KEY = Symbol('base-ui:direction');

export function setDirectionContext(direction: TextDirection): void {
  setContext(KEY, direction);
}

export function useDirection(): TextDirection {
  return getContext<TextDirection>(KEY) ?? 'ltr';
}
