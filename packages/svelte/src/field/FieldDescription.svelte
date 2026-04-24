<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getFieldContext();
  const id = idProp ?? generateId('field-desc');

  $effect(() => {
    ctx?.setDescriptionId(id);
    return () => ctx?.setDescriptionId(undefined);
  });
</script>

<span {...rest} class={className} {id}>
  {@render children?.()}
</span>
