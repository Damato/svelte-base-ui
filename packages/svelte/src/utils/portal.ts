/**
 * Svelte action that teleports a DOM element to a different mount point.
 * Usage: <div use:portal> (mounts to document.body)
 *        <div use:portal={someElement}> (mounts to a specific element)
 */
export function portal(node: Element, target: Element | string = 'body') {
  function mount() {
    const destination =
      typeof target === 'string'
        ? document.querySelector(target)
        : target;
    if (destination) {
      destination.appendChild(node);
    }
  }

  mount();

  return {
    update(newTarget: Element | string) {
      target = newTarget;
      mount();
    },
    destroy() {
      node.remove();
    },
  };
}
