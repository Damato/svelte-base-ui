<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLAttributes<HTMLUListElement> { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();
</script>

<ul {...rest} class={className}>
  {@render children?.()}
</ul>
