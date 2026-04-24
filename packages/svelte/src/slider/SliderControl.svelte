<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSliderContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getSliderContext();
</script>

<div
  {...rest}
  class={className}
  data-orientation={ctx.orientation}
  data-disabled={ctx.disabled ? '' : undefined}
>
  {@render children?.()}
</div>
