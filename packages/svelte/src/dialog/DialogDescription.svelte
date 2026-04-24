<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDialogContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLParagraphElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getDialogContext();
  const id = idProp ?? generateId('dialog-desc');

  $effect(() => {
    ctx.setDescriptionId(id);
    return () => ctx.setDescriptionId(undefined);
  });
</script>

<p {...rest} class={className} {id}>
  {@render children?.()}
</p>
