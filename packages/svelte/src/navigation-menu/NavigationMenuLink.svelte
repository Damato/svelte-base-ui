<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNavMenuRootContext } from './context.js';

  interface Props extends HTMLAnchorAttributes {
    /** Whether this link is currently active. */
    active?: boolean;
    children?: Snippet;
  }

  let { active = false, class: className, onclick: onclickProp, children, ...rest }: Props = $props();

  const rootCtx = getNavMenuRootContext();

  function handleClick(e: MouseEvent) {
    onclickProp?.(e);
    rootCtx.setActiveItem(undefined);
  }
</script>

<a
  {...rest}
  class={className}
  aria-current={active ? 'page' : undefined}
  data-active={active ? '' : undefined}
  onclick={handleClick}
>
  {@render children?.()}
</a>
