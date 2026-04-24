<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {}

  let { class: className, ...rest }: Props = $props();
</script>

<div {...rest} class={className} role="separator" />
