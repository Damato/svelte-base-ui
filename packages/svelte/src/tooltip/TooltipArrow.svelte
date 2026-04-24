<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getTooltipContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getTooltipContext();
  let el: HTMLDivElement | null = $state(null);

  $effect(() => { ctx.arrowEl = el; });
</script>

<div bind:this={el} {...rest} class={className} aria-hidden="true" />
