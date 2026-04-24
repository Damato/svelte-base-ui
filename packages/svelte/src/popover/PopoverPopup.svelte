<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getPopoverContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getPopoverContext();
</script>

<div
  {...rest}
  class={className}
  role="dialog"
  aria-modal={ctx.modal || undefined}
  aria-labelledby={ctx.titleId}
  aria-describedby={ctx.descriptionId}
  data-open=""
>
  {@render children?.()}
</div>
