import createStyleElement from './createStyleElement'
import registerStyleElementUsage from './registerStyleElementUsage'
import setStyleElementText from './setStyleElementText'

function appendStyleElement(
  css: string | string[],
  attributes?: Record<string, any>,
  injectFirst?: boolean
) {
  if (Array.isArray(css)) css = css.join("\n");
  const id: string | undefined = attributes?.["id"];
  const head = document.head || document.getElementsByTagName("head")[0];
  const prevElement = id && document.getElementById(id);
  if (prevElement && prevElement instanceof HTMLStyleElement) {
    setStyleElementText(prevElement, css);
    registerStyleElementUsage(prevElement);
    return prevElement;
  } else {
    if (prevElement) prevElement.remove();
    const element = createStyleElement(css, attributes);
    registerStyleElementUsage(element);

    if (injectFirst) {
      head.insertBefore(element, head.firstChild);
    } else {
      head.appendChild(element);
    }

    return element;
  }
}

export default appendStyleElement;
