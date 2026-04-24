<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getAccordionItemContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLHeadingElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const itemCtx = getAccordionItemContext();
</script>

<h3
  {...rest}
  class={className}
  data-open={itemCtx.open ? '' : undefined}
  data-closed={!itemCtx.open ? '' : undefined}
  data-disabled={itemCtx.disabled ? '' : undefined}
>
  {@render children?.()}
</h3>
