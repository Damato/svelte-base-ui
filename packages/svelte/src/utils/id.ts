let counter = 0;

/** Generates a stable unique id for aria relationships. */
export function generateId(prefix = 'base-ui'): string {
  return `${prefix}-${++counter}`;
}
