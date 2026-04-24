<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNavMenuRootContext, getNavMenuItemContext } from './context.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const rootCtx = getNavMenuRootContext();
  const itemCtx = getNavMenuItemContext();

  function toggle() {
    rootCtx.setActiveItem(itemCtx.active ? undefined : itemCtx.value);
  }
</script>

<button
  {...rest}
  class={className}
  type="button"
  aria-expanded={itemCtx.active}
  data-active={itemCtx.active ? '' : undefined}
  onclick={toggle}
>
  {@render children?.()}
</button>
