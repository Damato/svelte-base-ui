<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { getNumberFieldContext } from './context.js';

  interface Props extends HTMLInputAttributes {}

  let { class: className, ...rest }: Props = $props();

  const ctx = getNumberFieldContext();

  function handleChange(e: Event) {
    const raw = (e.currentTarget as HTMLInputElement).value;
    const n = parseFloat(raw);
    ctx.setValue(isNaN(n) ? null : n);
  }
</script>

<input
  {...rest}
  class={className}
  id={ctx.inputId}
  type="text"
  inputmode="numeric"
  value={ctx.value?.toString() ?? ''}
  disabled={ctx.disabled}
  readonly={ctx.readOnly}
  required={ctx.required}
  aria-disabled={ctx.disabled || undefined}
  onchange={handleChange}
/>
