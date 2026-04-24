<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getPopoverContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLHeadingElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getPopoverContext();
  const id = idProp ?? generateId('popover-title');

  $effect(() => { ctx.setTitleId(id); return () => ctx.setTitleId(undefined); });
</script>

<h2 {...rest} class={className} {id}>{@render children?.()}</h2>
