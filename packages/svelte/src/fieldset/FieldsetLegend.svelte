<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getFieldsetContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLLegendElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getFieldsetContext();
  const id = idProp ?? generateId('fieldset-legend');

  $effect(() => {
    ctx?.setLegendId(id);
    return () => ctx?.setLegendId(undefined);
  });
</script>

<legend {...rest} class={className} {id}>
  {@render children?.()}
</legend>
