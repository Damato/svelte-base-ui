<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { getDialogContext } from './context.js';
  import { portal } from '../utils/portal.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The ARIA role. @default 'dialog' */
    role?: 'dialog' | 'alertdialog';
    children?: Snippet;
  }

  let { role = 'dialog', class: className, children, ...rest }: Props = $props();

  const ctx = getDialogContext();

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') ctx.close();
  }
</script>

{#if ctx.open}
  <div use:portal>
    <!-- Backdrop -->
    {#if ctx.modal}
      <div
        aria-hidden="true"
        style="position:fixed;inset:0;"
        data-backdrop=""
        onclick={ctx.close}
      />
    {/if}

    <div
      {...rest}
      class={className}
      {role}
      aria-modal={ctx.modal || undefined}
      aria-labelledby={ctx.titleId}
      aria-describedby={ctx.descriptionId}
      data-open=""
      onkeydown={handleKeydown}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
