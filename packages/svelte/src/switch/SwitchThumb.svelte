<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSwitchContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getSwitchContext();
</script>

<span
  {...rest}
  class={className}
  data-checked={ctx.checked ? '' : undefined}
  data-disabled={ctx.disabled ? '' : undefined}
  data-readonly={ctx.readOnly ? '' : undefined}
  data-required={ctx.required ? '' : undefined}
>
  {@render children?.()}
</span>
