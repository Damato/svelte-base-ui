<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import DialogPopup from '../dialog/DialogPopup.svelte';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { ...rest }: Props = $props();
</script>

<!-- Renders as role="alertdialog" — cannot be dismissed by clicking the backdrop -->
<DialogPopup {...rest} role="alertdialog">
  {@render rest.children?.()}
</DialogPopup>
