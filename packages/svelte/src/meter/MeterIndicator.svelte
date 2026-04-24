<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMeterContext } from './context.js';
  import { valueToPercent } from '../progress/context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, style, children, ...rest }: Props = $props();

  const ctx = getMeterContext();

  const pct = $derived(valueToPercent(ctx.value, ctx.min, ctx.max));
  const indicatorStyle = $derived(
    `inset-inline-start:0;height:inherit;width:${pct}%;${style ?? ''}`,
  );
</script>

<div {...rest} class={className} style={indicatorStyle}>
  {@render children?.()}
</div>
