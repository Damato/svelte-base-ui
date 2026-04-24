<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getProgressContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getProgressContext();

  // Generate a stable ID if none is provided.
  const id = idProp ?? `progress-label-${Math.random().toString(36).slice(2, 9)}`;

  $effect(() => {
    ctx.setLabelId(id);
    return () => ctx.setLabelId(undefined);
  });
</script>

<span {...rest} class={className} {id} role="presentation" data-status={ctx.status}>
  {@render children?.()}
</span>
