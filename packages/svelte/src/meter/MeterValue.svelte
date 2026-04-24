<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMeterContext } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    children?: Snippet<[formattedValue: string | null, value: number]> | null;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getMeterContext();
</script>

<span {...rest} class={className} aria-hidden={true}>
  {#if children}
    {@render children(ctx.formattedValue, ctx.value)}
  {:else}
    {ctx.formattedValue}
  {/if}
</span>
