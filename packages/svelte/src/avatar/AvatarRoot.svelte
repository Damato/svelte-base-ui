<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setAvatarContext, type ImageLoadingStatus } from './context.js';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    children?: Snippet;
  }

  let { class: className, children, ...rest }: Props = $props();

  let status: ImageLoadingStatus = $state('idle');

  setAvatarContext({
    get status() { return status; },
    setStatus(s) { status = s; },
  });
</script>

<span {...rest} class={className} data-status={status}>
  {@render children?.()}
</span>
