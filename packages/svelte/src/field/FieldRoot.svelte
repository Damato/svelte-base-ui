<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setFieldContext } from './context.js';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Form field name (forwarded to nested controls). */
    name?: string;
    /** Whether the field control is disabled. @default false */
    disabled?: boolean;
    /** Whether the field is in an error state. @default false */
    invalid?: boolean;
    /** Whether a value is required. @default false */
    required?: boolean;
    children?: Snippet;
  }

  let {
    name,
    disabled = false,
    invalid = false,
    required = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let labelId: string | undefined = $state(undefined);
  let descriptionId: string | undefined = $state(undefined);
  let controlId: string | undefined = $state(undefined);

  setFieldContext({
    get name() { return name; },
    get disabled() { return disabled; },
    get invalid() { return invalid; },
    get required() { return required; },
    get labelId() { return labelId; },
    get descriptionId() { return descriptionId; },
    get controlId() { return controlId; },
    setLabelId(id) { labelId = id; },
    setDescriptionId(id) { descriptionId = id; },
    setControlId(id) { setControlId = id; },
  });

  // Exposed so setFieldContext can forward to the reactive variable
  function setControlId(id: string | undefined) { controlId = id; }
</script>

<div
  {...rest}
  class={className}
  data-disabled={disabled ? '' : undefined}
  data-invalid={invalid ? '' : undefined}
>
  {@render children?.()}
</div>
