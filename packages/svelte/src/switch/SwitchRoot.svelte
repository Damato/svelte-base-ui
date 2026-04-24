<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import { setSwitchContext } from './context.js';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
    /** Whether the switch is on (controlled). */
    checked?: boolean;
    /** Initial on/off state for uncontrolled usage. @default false */
    defaultChecked?: boolean;
    /** Whether the component ignores user interaction. @default false */
    disabled?: boolean;
    /** Form field name for the hidden input. */
    name?: string;
    /** Value submitted with the form when on. */
    value?: string;
    /** Whether the field is required. @default false */
    required?: boolean;
    /** Whether the user cannot change the value. @default false */
    readOnly?: boolean;
    /** Associated form element id. */
    form?: string;
    /** Called when the checked state changes. */
    onCheckedChange?: (checked: boolean) => void;
    children?: Snippet;
  }

  let {
    checked: checkedProp = undefined,
    defaultChecked = false,
    disabled = false,
    name,
    value,
    required = false,
    readOnly = false,
    form,
    onCheckedChange,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let internalChecked = $state(defaultChecked);
  const checked = $derived(checkedProp !== undefined ? checkedProp : internalChecked);

  let inputEl: HTMLInputElement | null = $state(null);

  function handleClick(event: MouseEvent) {
    if (readOnly || disabled) return;
    event.preventDefault();
    inputEl?.dispatchEvent(
      new PointerEvent('click', {
        bubbles: true,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
      }),
    );
  }

  function handleInputChange(event: Event) {
    if ((event as any).defaultPrevented) return;
    if (readOnly) {
      event.preventDefault();
      return;
    }
    const nextChecked = (event.currentTarget as HTMLInputElement).checked;
    onCheckedChange?.(nextChecked);
    if (checkedProp === undefined) {
      internalChecked = nextChecked;
    }
  }

  setSwitchContext({
    get checked() { return checked; },
    get disabled() { return disabled; },
    get readOnly() { return readOnly; },
    get required() { return required; },
  });
</script>

<!--
  Renders a <span> with role="switch" plus a visually-hidden <input type="checkbox">
  for native form participation.
-->
<span
  {...rest}
  class={className}
  role="switch"
  aria-checked={checked}
  aria-readonly={readOnly || undefined}
  aria-required={required || undefined}
  aria-disabled={disabled || undefined}
  tabindex={disabled ? undefined : 0}
  data-checked={checked ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  data-readonly={readOnly ? '' : undefined}
  data-required={required ? '' : undefined}
  onclick={handleClick}
  onkeydown={(e) => {
    if (e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as MouseEvent);
    }
  }}
>
  {@render children?.()}
  <input
    bind:this={inputEl}
    type="checkbox"
    {checked}
    {disabled}
    {name}
    {value}
    {required}
    {form}
    aria-hidden={true}
    tabindex={-1}
    style="position:absolute;clip-path:inset(50%);overflow:hidden;white-space:nowrap;border:0;padding:0;width:1px;height:1px;margin:-1px"
    onchange={handleInputChange}
  />
</span>
