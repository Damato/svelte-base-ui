<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getToolbarContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getToolbarContext();
  const orientation = $derived(
    ctx?.orientation === 'horizontal' ? 'vertical' : 'horizontal',
  );
</script>

<div
  {...rest}
  class={className}
  role="separator"
  aria-orientation={orientation}
  data-orientation={orientation}
/>
