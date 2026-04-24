<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Shared delay in ms before any tooltip opens. @default 600 */
    delay?: number;
    /** Shared delay in ms before any tooltip closes. @default 0 */
    closeDelay?: number;
    children?: Snippet;
  }

  // Provider just renders children; per-tooltip delays are configurable on Root.
  let { delay: _delay = 600, closeDelay: _closeDelay = 0, children }: Props = $props();
</script>

{@render children?.()}
