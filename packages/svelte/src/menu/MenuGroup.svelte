<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div {...rest} class={className} role="group">
  {@render children?.()}
</div>
