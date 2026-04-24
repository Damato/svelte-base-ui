<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { getOTPFieldContext } from './context.js';

  interface Props extends HTMLInputAttributes {
    mask?: boolean;
  }

  let { mask = false, class: className, ...rest }: Props = $props();

  const ctx = getOTPFieldContext();
</script>

<input
  {...rest}
  class={className}
  type={mask ? 'password' : 'text'}
  autocomplete="one-time-code"
  inputmode="numeric"
  maxlength={ctx.length}
  value={ctx.value}
  disabled={ctx.disabled}
  readonly={ctx.readOnly}
  oninput={(e) => ctx.setValue((e.currentTarget as HTMLInputElement).value)}
/>
