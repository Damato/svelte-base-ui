<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getNumberFieldContext } from './context.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getNumberFieldContext();
  const disabled = $derived(
    ctx.disabled || (ctx.min !== undefined && (ctx.value ?? 0) <= ctx.min),
  );
</script>

<button
  {...rest}
  class={className}
  type="button"
  disabled={disabled}
  aria-controls={ctx.inputId}
  data-disabled={disabled ? '' : undefined}
  onclick={ctx.decrement}
>
  {@render children?.()}
</button>
