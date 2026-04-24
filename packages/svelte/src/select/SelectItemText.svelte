<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();
</script>

<span {...rest} class={className}>{@render children?.()}</span>
