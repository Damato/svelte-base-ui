<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getTooltipContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getTooltipContext();
  const id = idProp ?? generateId('tooltip-popup');
</script>

<div {...rest} class={className} {id} role="tooltip" data-open={ctx.open ? '' : undefined}>
  {@render children?.()}
</div>
