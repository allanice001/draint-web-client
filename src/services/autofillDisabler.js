/* Function disabler for browser autofill feature
    parentNode String - CSS selector (class, id, tag name etc) of the parent of form
    childNode - CSS selector (class, id, tag name etc) of the target input elements
*/
const disabler = (parentNode, childNode) => {
  Array.from(document.querySelector(parentNode).querySelectorAll(childNode))
    .map((input) => { input.autocomplete = 'chrome-off'; return input; });
  return true;
};

export default disabler;
