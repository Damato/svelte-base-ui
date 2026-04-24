import { getContext, setContext } from 'svelte';

export interface OTPFieldContext {
  readonly value: string;
  readonly length: number;
  readonly disabled: boolean;
  readonly readOnly: boolean;
  setValue(v: string): void;
}

const KEY = Symbol('base-ui:otp-field');

export function setOTPFieldContext(ctx: OTPFieldContext): void {
  setContext(KEY, ctx);
}

export function getOTPFieldContext(): OTPFieldContext {
  const ctx = getContext<OTPFieldContext | undefined>(KEY);
  if (!ctx) throw new Error('Base UI: OTPField sub-components must be inside an OTPFieldRoot.');
  return ctx;
}
