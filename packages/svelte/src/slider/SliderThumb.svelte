<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getSliderContext, clamp, snapToStep } from './context.js';
  import { valueToPercent } from '../progress/context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Zero-based index of this thumb. @default 0 */
    index?: number;
    children?: Snippet;
  }

  let { index = 0, class: className, style, children, ...rest }: Props = $props();

  const ctx = getSliderContext();

  const value = $derived(ctx.values[index] ?? ctx.values[0]);
  const pct = $derived(valueToPercent(value, ctx.min, ctx.max));

  const thumbStyle = $derived(
    ctx.orientation === 'horizontal'
      ? `left:${pct}%;${style ?? ''}`
      : `bottom:${pct}%;${style ?? ''}`,
  );

  let el: HTMLSpanElement | null = $state(null);
  let dragging = $state(false);
  let trackEl: HTMLElement | null = $state(null);

  function getRelativeValue(clientX: number, clientY: number): number {
    const track = el?.closest('[data-orientation]') as HTMLElement | null;
    if (!track) return value;
    const rect = track.getBoundingClientRect();
    if (ctx.orientation === 'horizontal') {
      return ctx.min + ((clientX - rect.left) / rect.width) * (ctx.max - ctx.min);
    }
    return ctx.min + (1 - (clientY - rect.top) / rect.height) * (ctx.max - ctx.min);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (ctx.disabled) return;
    let newValue = value;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault(); newValue = value + ctx.step;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault(); newValue = value - ctx.step;
    } else if (e.key === 'Home') {
      e.preventDefault(); newValue = ctx.min;
    } else if (e.key === 'End') {
      e.preventDefault(); newValue = ctx.max;
    } else return;

    ctx.updateThumb(index, clamp(snapToStep(newValue, ctx.min, ctx.step), ctx.min, ctx.max));
  }

  function handlePointerDown(e: PointerEvent) {
    if (ctx.disabled) return;
    dragging = true;
    el?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: PointerEvent) {
    if (!dragging || ctx.disabled) return;
    ctx.updateThumb(index, getRelativeValue(e.clientX, e.clientY));
  }

  function handlePointerUp(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    el?.releasePointerCapture(e.pointerId);
    ctx.commitThumb(index, getRelativeValue(e.clientX, e.clientY));
  }
</script>

<span
  bind:this={el}
  {...rest}
  class={className}
  style={thumbStyle}
  role="slider"
  tabindex={ctx.disabled ? undefined : 0}
  aria-valuemin={ctx.min}
  aria-valuemax={ctx.max}
  aria-valuenow={value}
  aria-valuetext={ctx.formattedValues[index] ?? undefined}
  aria-orientation={ctx.orientation}
  aria-disabled={ctx.disabled || undefined}
  data-disabled={ctx.disabled ? '' : undefined}
  data-dragging={dragging ? '' : undefined}
  onkeydown={handleKeyDown}
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
>
  {@render children?.()}
  {#if ctx.name}
    <input type="hidden" name={ctx.name} form={ctx.form} value={value} />
  {/if}
</span>
