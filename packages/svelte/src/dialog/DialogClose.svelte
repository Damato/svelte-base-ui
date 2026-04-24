<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDialogContext } from './context.js';

  interface Props extends HTMLButtonAttributes { children?: Snippet; }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getDialogContext();
</script>

<button {...rest} class={className} type="button" onclick={ctx.close}>
  {@render children?.()}
</button>
