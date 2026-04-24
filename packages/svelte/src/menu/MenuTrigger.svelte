<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMenuContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> {
    disabled?: boolean;
    children?: Snippet;
  }

  let { disabled = false, class: className, children, ...rest }: Props = $props();

  const ctx = getMenuContext();
  let el: HTMLButtonElement | null = $state(null);

  $effect(() => { ctx.triggerEl = el; });
</script>

<button
  bind:this={el}
  {...rest}
  class={className}
  type="button"
  {disabled}
  aria-haspopup="menu"
  aria-expanded={ctx.open}
  data-open={ctx.open ? '' : undefined}
  onclick={ctx.toggle}
>
  {@render children?.()}
</button>
