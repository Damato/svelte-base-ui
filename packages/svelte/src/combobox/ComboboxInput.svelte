<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { getComboboxContext } from './context.js';

  interface Props extends HTMLInputAttributes {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getComboboxContext();
  let el: HTMLInputElement | null = $state(null);

  $effect(() => { ctx.inputEl = el; ctx.triggerEl = el; });
</script>

<input
  bind:this={el}
  {...rest}
  class={className}
  type="text"
  role="combobox"
  autocomplete="off"
  aria-expanded={ctx.open}
  aria-autocomplete="list"
  value={ctx.inputValue}
  oninput={(e) => ctx.setInputValue((e.currentTarget as HTMLInputElement).value)}
  onfocus={ctx.openList}
/>
