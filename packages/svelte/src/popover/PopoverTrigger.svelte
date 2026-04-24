<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getPopoverContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getPopoverContext();
  const id = idProp ?? generateId('popover-trigger');

  $effect(() => {
    ctx.setTriggerId(id);
    return () => ctx.setTriggerId(undefined);
  });

  let el: HTMLButtonElement | null = $state(null);

  $effect(() => {
    ctx.triggerEl = el;
  });
</script>

<button
  bind:this={el}
  {...rest}
  class={className}
  type="button"
  {id}
  aria-haspopup="dialog"
  aria-expanded={ctx.open}
  data-open={ctx.open ? '' : undefined}
  onclick={ctx.toggle}
>
  {@render children?.()}
</button>
