<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSliderContext } from './context.js';
  import { valueToPercent } from '../progress/context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, style, children, ...rest }: Props = $props();

  const ctx = getSliderContext();

  const indicatorStyle = $derived(() => {
    const { values, min, max, orientation } = ctx;
    if (values.length === 1) {
      const pct = valueToPercent(values[0], min, max);
      const prop = orientation === 'horizontal' ? 'width' : 'height';
      return `${prop}:${pct}%;${style ?? ''}`;
    }
    const startPct = valueToPercent(Math.min(...values), min, max);
    const endPct = valueToPercent(Math.max(...values), min, max);
    if (orientation === 'horizontal') {
      return `left:${startPct}%;width:${endPct - startPct}%;${style ?? ''}`;
    }
    return `bottom:${startPct}%;height:${endPct - startPct}%;${style ?? ''}`;
  });
</script>

<div {...rest} class={className} style={indicatorStyle()} data-orientation={ctx.orientation}>
  {@render children?.()}
</div>
