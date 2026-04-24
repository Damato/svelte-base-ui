<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDialogContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLHeadingElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getDialogContext();
  const id = idProp ?? generateId('dialog-title');

  $effect(() => {
    ctx.setTitleId(id);
    return () => ctx.setTitleId(undefined);
  });
</script>

<h2 {...rest} class={className} {id}>
  {@render children?.()}
</h2>
