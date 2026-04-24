<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getMeterContext } from './context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> { children?: Snippet; }

  let { class: className, id: idProp, children, ...rest }: Props = $props();

  const ctx = getMeterContext();
  const id = idProp ?? generateId('meter-label');

  $effect(() => {
    ctx.setLabelId(id);
    return () => ctx.setLabelId(undefined);
  });
</script>

<span {...rest} class={className} {id} role="presentation">
  {@render children?.()}
</span>
