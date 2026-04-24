<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getToastStoreContext } from './context.js';
  import { portal } from '../utils/portal.js';

  interface Props extends HTMLAttributes<HTMLOListElement> {
    children?: Snippet<[typeof ctx.toasts]>;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getToastStoreContext();
</script>

<ol use:portal {...rest} class={className} aria-live="polite" aria-label="Notifications">
  {@render children?.(ctx.toasts)}
</ol>
