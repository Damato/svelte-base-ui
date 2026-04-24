<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSelectContext } from './context.js';

  interface Props extends Omit<HTMLButtonAttributes, 'disabled'> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getSelectContext();
  let el: HTMLButtonElement | null = $state(null);

  $effect(() => { ctx.triggerEl = el; });
</script>

<button
  bind:this={el}
  {...rest}
  class={className}
  type="button"
  disabled={ctx.disabled}
  aria-haspopup="listbox"
  aria-expanded={ctx.open}
  data-open={ctx.open ? '' : undefined}
  data-disabled={ctx.disabled ? '' : undefined}
  onclick={ctx.toggle}
>
  {@render children?.()}
</button>
