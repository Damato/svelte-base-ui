<script lang="ts">
  import type { Snippet } from 'svelte';
  import MenuRoot from '../menu/MenuRoot.svelte';

  interface Props {
    onOpenChange?: (open: boolean) => void;
    children?: Snippet;
  }

  let { onOpenChange, children }: Props = $props();
</script>

<!-- Context menu is a menu opened via right-click; shares all Menu sub-components -->
<MenuRoot placement="right-start" {onOpenChange}>
  {@render children?.()}
</MenuRoot>
