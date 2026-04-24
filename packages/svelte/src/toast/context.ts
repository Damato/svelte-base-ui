import { getContext, setContext } from 'svelte';
import type { ToastObject } from './createToastManager.js';

export interface ToastStoreContext {
  get toasts(): ToastObject[];
  add(options: Omit<ToastObject, 'transitionStatus'>): string;
  close(id?: string): void;
  update(id: string, updates: Partial<Omit<ToastObject, 'id' | 'transitionStatus'>>): void;
}

export interface ToastItemContext {
  get toast(): ToastObject;
  close(): void;
}

const TOAST_STORE_KEY = Symbol('ToastStoreContext');
const TOAST_ITEM_KEY = Symbol('ToastItemContext');

export function setToastStoreContext(ctx: ToastStoreContext) {
  setContext(TOAST_STORE_KEY, ctx);
}

export function getToastStoreContext(): ToastStoreContext {
  return getContext(TOAST_STORE_KEY);
}

export function setToastItemContext(ctx: ToastItemContext) {
  setContext(TOAST_ITEM_KEY, ctx);
}

export function getToastItemContext(): ToastItemContext {
  return getContext(TOAST_ITEM_KEY);
}
