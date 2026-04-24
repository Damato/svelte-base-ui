import { getContext, setContext } from 'svelte';
import { generateId } from '../utils/id.js';

export type DrawerSwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface DrawerContext {
  get open(): boolean;
  get swipeDirection(): DrawerSwipeDirection;
  titleId: string;
  descriptionId: string;
  triggerId: string;
  setOpen(value: boolean): void;
}

const DRAWER_KEY = Symbol('DrawerContext');

export function setDrawerContext(ctx: DrawerContext) {
  setContext(DRAWER_KEY, ctx);
}

export function getDrawerContext(): DrawerContext {
  return getContext(DRAWER_KEY);
}
