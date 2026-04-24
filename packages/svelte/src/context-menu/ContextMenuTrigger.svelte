<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from '../menu/context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getMenuContext();
  let el: HTMLSpanElement | null = $state(null);

  $effect(() => { ctx.triggerEl = el; });

  function handleContextMenu(event: MouseEvent) {
    event.preventDefault();
    ctx.toggle();
  }
</script>

<span
  bind:this={el}
  {...rest}
  class={className}
  oncontextmenu={handleContextMenu}
>
  {@render children?.()}
</span>
