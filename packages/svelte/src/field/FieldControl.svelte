<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getFieldContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLDivElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getFieldContext();
  const id = idProp ?? generateId('field-control');

  $effect(() => {
    ctx?.setControlId(id);
    return () => ctx?.setControlId(undefined);
  });
</script>

<div
  {...rest}
  class={className}
  {id}
  aria-labelledby={ctx?.labelId}
  aria-describedby={ctx?.descriptionId}
>
  {@render children?.()}
</div>
