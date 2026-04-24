import {
  computePosition,
  flip,
  shift,
  offset,
  arrow as arrowMiddleware,
  type Placement,
  type Middleware,
} from '@floating-ui/dom';

export type { Placement };

export interface FloatOptions {
  placement?: Placement;
  offsetValue?: number;
  arrowEl?: HTMLElement | null;
}

export interface FloatState {
  x: number;
  y: number;
  placement: Placement;
  arrowX: number | null;
  arrowY: number | null;
}

/**
 * Compute floating-ui position for a reference/floating pair.
 * Returns updated x/y/placement plus arrow data.
 */
export async function computeFloat(
  reference: Element,
  floating: HTMLElement,
  options: FloatOptions = {},
): Promise<FloatState> {
  const { placement = 'bottom', offsetValue = 4, arrowEl } = options;

  const middleware: Middleware[] = [
    offset(offsetValue),
    flip(),
    shift({ padding: 8 }),
  ];

  if (arrowEl) {
    middleware.push(arrowMiddleware({ element: arrowEl }));
  }

  const result = await computePosition(reference, floating, {
    placement,
    middleware,
  });

  const arrowData = result.middlewareData.arrow;

  return {
    x: result.x,
    y: result.y,
    placement: result.placement,
    arrowX: arrowData?.x ?? null,
    arrowY: arrowData?.y ?? null,
  };
}
