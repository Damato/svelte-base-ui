<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { getTabsContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getTabsContext();
</script>

<!-- Decorative indicator; position via CSS using [data-selected] on sibling tabs -->
<span
  {...rest}
  class={className}
  aria-hidden="true"
  data-orientation={ctx.orientation}
/>
