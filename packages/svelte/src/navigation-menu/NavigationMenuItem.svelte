<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNavMenuRootContext, setNavMenuItemContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLLIElement> {
    /** Item identifier (required). */
    value: string;
    children?: Snippet;
  }

  let { value, class: className, children, ...rest }: Props = $props();

  const rootCtx = getNavMenuRootContext();
  const active = $derived(rootCtx.isActive(value));

  setNavMenuItemContext({
    value,
    get active() { return active; },
  });
</script>

<li {...rest} class={className} data-active={active ? '' : undefined}>
  {@render children?.()}
</li>
