<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getTabsContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getTabsContext();
</script>

<div
  {...rest}
  class={className}
  role="tablist"
  aria-orientation={ctx.orientation}
  data-orientation={ctx.orientation}
>
  {@render children?.()}
</div>
