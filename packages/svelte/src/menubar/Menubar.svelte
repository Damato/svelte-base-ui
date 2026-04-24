<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setMenubarContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** @default false */
    disabled?: boolean;
    /** @default 'horizontal' */
    orientation?: 'horizontal' | 'vertical';
    children?: Snippet;
  }

  let {
    disabled = false,
    orientation = 'horizontal',
    class: className,
    children,
    ...rest
  }: Props = $props();

  setMenubarContext({
    get disabled() { return disabled; },
    get orientation() { return orientation; },
  });
</script>

<div
  {...rest}
  class={className}
  role="menubar"
  aria-orientation={orientation}
  data-orientation={orientation}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</div>
