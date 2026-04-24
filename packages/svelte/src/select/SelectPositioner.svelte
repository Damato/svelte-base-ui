<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSelectContext } from './context.js';
  import { computeFloat, type Placement } from '../utils/float.js';
  import { portal } from '../utils/portal.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    placement?: Placement;
    children?: Snippet;
  }

  let { placement: placementOverride, class: className, children, ...rest }: Props = $props();

  const ctx = getSelectContext();
  let posEl: HTMLDivElement | null = $state(null);
  let x = $state(0);
  let y = $state(0);
  let actualPlacement: Placement = $state(ctx.placement);

  $effect(() => { ctx.popupEl = posEl; });

  $effect(() => {
    if (!ctx.open || !ctx.triggerEl || !posEl) return;
    computeFloat(ctx.triggerEl, posEl, {
      placement: placementOverride ?? ctx.placement,
    }).then((r) => { x = r.x; y = r.y; actualPlacement = r.placement; });
  });

  function handleOutsideClick(event: MouseEvent) {
    if (
      posEl && !posEl.contains(event.target as Node) &&
      ctx.triggerEl && !ctx.triggerEl.contains(event.target as Node)
    ) {
      ctx.close();
    }
  }
</script>

{#if ctx.open}
  <div use:portal>
    <svelte:window
      onclick={handleOutsideClick}
      onkeydown={(e) => e.key === 'Escape' && ctx.close()}
    />
    <div
      bind:this={posEl}
      {...rest}
      class={className}
      style="position:absolute;left:{x}px;top:{y}px"
      data-placement={actualPlacement}
      data-open=""
    >
      {@render children?.()}
    </div>
  </div>
{/if}
