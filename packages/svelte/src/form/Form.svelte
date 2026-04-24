<script lang="ts">
  import type { HTMLFormAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  interface Props extends HTMLFormAttributes {
    /** External field-level errors: `{ fieldName: 'error message' }`. */
    errors?: Record<string, string | string[]>;
    /** Called after native form submit validation passes. */
    onFormSubmit?: (event: SubmitEvent) => void;
    children?: Snippet;
  }

  let { errors, onFormSubmit, class: className, children, ...rest }: Props = $props();

  function handleSubmit(event: SubmitEvent) {
    onFormSubmit?.(event);
  }
</script>

<form {...rest} class={className} onsubmit={handleSubmit}>
  {@render children?.()}
</form>
