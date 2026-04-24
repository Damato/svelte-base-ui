<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getDrawerContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getDrawerContext();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
  {...rest}
  class={className}
  aria-hidden="true"
  data-open={ctx.open ? '' : undefined}
  onclick={() => ctx.setOpen(false)}
/>
