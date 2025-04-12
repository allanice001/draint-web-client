export function updateClassList(type, { el, selector, className }) {
  const types = ['remove', 'add', 'toggle'];

  if (types.indexOf(type) === -1) {
    return;
  }

  if (el) {
    el.classList[type](className);
  } else if (selector) {
    const node = document.querySelector(selector);

    if (!node) {
      return;
    }

    node.classList[type](className);
  }
}

export const cssClassWithModifier = (classes, className, modifier) =>
  classes[`${className}--${modifier}`];
