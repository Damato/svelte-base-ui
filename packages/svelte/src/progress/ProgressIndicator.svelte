<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getProgressContext, valueToPercent } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, style, children, ...rest }: Props = $props();

  const ctx = getProgressContext();

  const percentageValue = $derived(
    Number.isFinite(ctx.value) && ctx.value !== null
      ? valueToPercent(ctx.value, ctx.min, ctx.max)
      : null,
  );

  const indicatorStyle = $derived(
    percentageValue != null
      ? `inset-inline-start:0;height:inherit;width:${percentageValue}%;${style ?? ''}`
      : (style ?? ''),
  );
</script>

<div
  {...rest}
  class={className}
  style={indicatorStyle}
  data-status={ctx.status}
>
  {@render children?.()}
</div>
