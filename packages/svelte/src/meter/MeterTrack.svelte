<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMeterContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getMeterContext();
</script>

<div {...rest} class={className}>
  {@render children?.()}
</div>
