<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setRadioContext } from './context.js';
  import { getRadioGroupContext } from '../radio-group/context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
    /** This radio's value (required). */
    value: string;
    /** Whether this radio is disabled. @default false */
    disabled?: boolean;
    /** Whether this radio is read-only. @default false */
    readOnly?: boolean;
    /** Whether this radio is required. @default false */
    required?: boolean;
    children?: Snippet;
  }

  let {
    value,
    disabled: disabledProp = false,
    readOnly: readOnlyProp = false,
    required: requiredProp = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const groupCtx = getRadioGroupContext();

  const checked = $derived(groupCtx?.checkedValue === value);
  const disabled = $derived(groupCtx?.disabled || disabledProp);
  const readOnly = $derived(groupCtx?.readOnly || readOnlyProp);
  const required = $derived(groupCtx?.required || requiredProp);

  let inputEl: HTMLInputElement | null = $state(null);

  function handleClick(event: MouseEvent) {
    if (disabled || readOnly) return;
    event.preventDefault();
    inputEl?.dispatchEvent(new PointerEvent('click', { bubbles: true }));
  }

  function handleInputChange() {
    if (disabled || readOnly) return;
    groupCtx?.select(value);
  }

  setRadioContext({
    get checked() { return checked; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
    get required() { return required; },
  });
</script>

<span
  {...rest}
  class={className}
  role="radio"
  aria-checked={checked}
  aria-disabled={disabled || undefined}
  aria-required={required || undefined}
  aria-readonly={readOnly || undefined}
  tabindex={disabled ? undefined : 0}
  data-checked={checked ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  data-readonly={readOnly ? '' : undefined}
  data-required={required ? '' : undefined}
  onclick={handleClick}
  onkeydown={(e) => {
    if (e.key === ' ') { e.preventDefault(); handleClick(e as unknown as MouseEvent); }
  }}
>
  {@render children?.()}
  <input
    bind:this={inputEl}
    type="radio"
    {value}
    checked={checked}
    {disabled}
    name={groupCtx?.name}
    form={groupCtx?.form}
    {required}
    aria-hidden={true}
    tabindex={-1}
    style="position:absolute;clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0;padding:0;width:1px;height:1px;margin:-1px"
    onchange={handleInputChange}
  />
</span>
