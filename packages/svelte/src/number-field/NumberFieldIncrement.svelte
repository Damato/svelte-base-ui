<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNumberFieldContext } from './context.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getNumberFieldContext();
  const disabled = $derived(
    ctx.disabled || (ctx.max !== undefined && (ctx.value ?? 0) >= ctx.max),
  );
</script>

<button
  {...rest}
  class={className}
  type="button"
  disabled={disabled}
  aria-controls={ctx.inputId}
  data-disabled={disabled ? '' : undefined}
  onclick={ctx.increment}
>
  {@render children?.()}
</button>
