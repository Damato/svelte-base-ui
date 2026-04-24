<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setToastStoreContext } from './context.js';
  import type { ToastObject, ToastManager } from './createToastManager.js';
  import { generateId } from '../utils/id.js';

  interface Props {
    timeout?: number;
    limit?: number;
    toastManager?: ToastManager;
    children?: Snippet;
  }

  let { timeout = 5000, limit = 3, toastManager, children }: Props = $props();

  let toasts: ToastObject[] = $state([]);

  function add(options: Omit<ToastObject, 'transitionStatus'>): string {
    const id = options.id || generateId('toast');
    const existing = toasts.findIndex((t) => t.id === id);
    if (existing >= 0) {
      toasts[existing] = { ...toasts[existing], ...options, id };
    } else {
      if (toasts.length >= limit) {
        toasts = toasts.slice(toasts.length - limit + 1);
      }
      toasts = [...toasts, { ...options, id, transitionStatus: 'starting' }];
    }
    return id;
  }

  function close(id?: string): void {
    if (id) {
      toasts = toasts.filter((t) => t.id !== id);
    } else {
      toasts = [];
    }
  }

  function update(id: string, updates: Partial<Omit<ToastObject, 'id' | 'transitionStatus'>>): void {
    const idx = toasts.findIndex((t) => t.id === id);
    if (idx >= 0) {
      toasts[idx] = { ...toasts[idx], ...updates };
    }
  }

  $effect(() => {
    if (!toastManager) return;
    const unsubscribe = toastManager[' subscribe'](({ action, options }) => {
      if (action === 'add') {
        add(options);
      } else if (action === 'close') {
        close(options.id);
      } else if (action === 'update') {
        const { id, ...rest } = options;
        update(id, rest);
      } else if (action === 'promise' && options.promise) {
        const id = add(options);
        options.promise.then(
          (result: any) => {
            const resolved =
              typeof options.success === 'function' ? options.success(result) : options.success;
            const upd = typeof resolved === 'string' ? { title: resolved } : resolved;
            update(id, upd);
          },
          (err: any) => {
            const resolved =
              typeof options.error === 'function' ? options.error(err) : options.error;
            const upd = typeof resolved === 'string' ? { title: resolved } : resolved;
            update(id, upd);
          },
        );
      }
    });
    return unsubscribe;
  });

  setToastStoreContext({
    get toasts() { return toasts; },
    add,
    close,
    update,
  });
</script>

{@render children?.()}
