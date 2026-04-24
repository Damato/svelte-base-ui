<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getScrollAreaContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    children?: Snippet;
  }

  let { orientation = 'vertical', class: className, children, ...rest }: Props = $props();

  const ctx = getScrollAreaContext();
  const visible = $derived(
    orientation === 'vertical' ? ctx.scrollingY || ctx.hovering : ctx.scrollingX || ctx.hovering,
  );
</script>

<div
  {...rest}
  class={className}
  data-orientation={orientation}
  data-hovering={ctx.hovering ? '' : undefined}
  style="display:{visible ? 'flex' : 'none'};{rest.style ?? ''}"
>
  {@render children?.()}
</div>
