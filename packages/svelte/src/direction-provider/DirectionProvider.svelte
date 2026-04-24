<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setDirectionContext, type TextDirection } from './context.js';

  interface Props {
    /** Reading direction for nested components. @default 'ltr' */
    direction?: TextDirection;
    children?: Snippet;
  }

  let { direction = 'ltr', children }: Props = $props();

  setDirectionContext(direction);
</script>

{@render children?.()}
