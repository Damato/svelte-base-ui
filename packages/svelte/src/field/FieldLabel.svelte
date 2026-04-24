<script lang="ts">
  import type { HTMLLabelAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLLabelAttributes { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getFieldContext();
  const id = idProp ?? generateId('field-label');

  $effect(() => {
    ctx?.setLabelId(id);
    return () => ctx?.setLabelId(undefined);
  });
</script>

<label {...rest} class={className} {id} for={ctx?.controlId}>
  {@render children?.()}
</label>
