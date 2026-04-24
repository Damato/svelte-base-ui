<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getTooltipContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getTooltipContext();
  const popupId = generateId('tooltip-popup');
  let el: HTMLElement | null = $state(null);

  $effect(() => { ctx.triggerEl = el; });
</script>

<span
  bind:this={el}
  {...rest}
  class={className}
  aria-describedby={ctx.open ? popupId : undefined}
  tabindex={0}
  onmouseenter={ctx.openTooltip}
  onmouseleave={ctx.closeTooltip}
  onfocus={ctx.openTooltip}
  onblur={ctx.closeTooltip}
>
  {@render children?.()}
</span>
