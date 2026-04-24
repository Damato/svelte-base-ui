<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getScrollAreaContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getScrollAreaContext();
</script>

<div
  {...rest}
  class={className}
  data-dragging={false}
/>
