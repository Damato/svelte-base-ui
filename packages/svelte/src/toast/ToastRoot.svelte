<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToastStoreContext, setToastItemContext } from './context.js';
  import type { ToastObject } from './createToastManager.js';

  interface Props extends HTMLAttributes<HTMLLIElement> {
    toast: ToastObject;
    children?: Snippet;
  }

  let { toast, class: className, children, ...rest }: Props = $props();

  const store = getToastStoreContext();

  let timer: ReturnType<typeof setTimeout> | null = null;

  $effect(() => {
    const ms = toast.timeout ?? 5000;
    if (ms === 0) return;

    timer = setTimeout(() => {
      store.close(toast.id);
      toast.onClose?.();
    }, ms);

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  setToastItemContext({
    get toast() { return toast; },
    close() { store.close(toast.id); toast.onClose?.(); },
  });
</script>

<li
  {...rest}
  class={className}
  role="status"
  aria-live={toast.priority === 'high' ? 'assertive' : 'polite'}
  aria-atomic="true"
  data-type={toast.type}
>
  {@render children?.()}
</li>
