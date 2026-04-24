<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setFieldsetContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLFieldSetElement> {
    /** Whether all controls in the fieldset are disabled. @default false */
    disabled?: boolean;
    children?: Snippet;
  }

  let { disabled = false, class: className, children, ...rest }: Props = $props();

  let legendId: string | undefined = $state(undefined);

  setFieldsetContext({
    get disabled() { return disabled; },
    get legendId() { return legendId; },
    setLegendId(id) { legendId = id; },
  });
</script>

<fieldset
  {...rest}
  class={className}
  {disabled}
  aria-labelledby={legendId}
  data-disabled={disabled ? '' : undefined}
>
  {@render children?.()}
</fieldset>
