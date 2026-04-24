<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { getFieldContext } from '../field/context.js';
  import { generateId } from '../utils/id.js';

  interface Props extends HTMLInputAttributes {
    /** Called when the string value changes. */
    onValueChange?: (value: string) => void;
  }

  let { onValueChange, class: className, id: idProp, ...rest }: Props = $props();

  const fieldCtx = getFieldContext();
  const id = idProp ?? generateId('input');

  $effect(() => {
    fieldCtx?.setControlId(id);
    return () => fieldCtx?.setControlId(undefined);
  });

  function handleInput(event: Event) {
    onValueChange?.((event.currentTarget as HTMLInputElement).value);
  }
</script>

<input
  {...rest}
  class={className}
  {id}
  disabled={fieldCtx?.disabled || rest.disabled}
  required={fieldCtx?.required || rest.required}
  aria-invalid={fieldCtx?.invalid || undefined}
  aria-labelledby={fieldCtx?.labelId}
  aria-describedby={fieldCtx?.descriptionId}
  oninput={handleInput}
/>
