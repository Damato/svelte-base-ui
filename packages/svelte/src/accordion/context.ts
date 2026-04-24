import { getContext, setContext } from 'svelte';

export interface AccordionRootContext {
  readonly value: string[];
  readonly disabled: boolean;
  readonly multiple: boolean;
  readonly orientation: 'horizontal' | 'vertical';
  readonly keepMounted: boolean;
  toggleItem(value: string): void;
  isOpen(value: string): boolean;
}

export interface AccordionItemContext {
  readonly open: boolean;
  readonly disabled: boolean;
  readonly value: string;
  readonly triggerId: string;
  readonly panelId: string;
}

const ROOT_KEY = Symbol('base-ui:accordion-root');
const ITEM_KEY = Symbol('base-ui:accordion-item');

export function setAccordionRootContext(ctx: AccordionRootContext): void {
  setContext(ROOT_KEY, ctx);
}

export function getAccordionRootContext(): AccordionRootContext {
  const ctx = getContext<AccordionRootContext | undefined>(ROOT_KEY);
  if (!ctx) throw new Error('Base UI: Accordion sub-components must be inside AccordionRoot.');
  return ctx;
}

export function setAccordionItemContext(ctx: AccordionItemContext): void {
  setContext(ITEM_KEY, ctx);
}

export function getAccordionItemContext(): AccordionItemContext {
  const ctx = getContext<AccordionItemContext | undefined>(ITEM_KEY);
  if (!ctx) throw new Error('Base UI: AccordionTrigger/Panel must be inside an AccordionItem.');
  return ctx;
}
