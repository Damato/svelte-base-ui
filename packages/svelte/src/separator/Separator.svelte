<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type Orientation = 'horizontal' | 'vertical';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * The orientation of the separator.
     * @default 'horizontal'
     */
    orientation?: Orientation;
    children?: Snippet;
  }

  let {
    orientation = 'horizontal',
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div
  {...rest}
  class={className}
  role="separator"
  aria-orientation={orientation}
  data-orientation={orientation}
>
  {@render children?.()}
</div>
