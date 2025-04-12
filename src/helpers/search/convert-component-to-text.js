import ReactDOMServer from 'react-dom/server';

const HTML_TAG_REGEX = /(<([^>]+)>)/gi;

export function convertComponentToText(component) {
  const innerHtml = ReactDOMServer.renderToString(component);

  return innerHtml.replaceAll(HTML_TAG_REGEX, '');
}
