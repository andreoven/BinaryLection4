import {IElement} from './Interfaces';

class View {
  element: HTMLElement;

   createElement({ tagName, className = '', attributes = {} } : IElement): HTMLElement {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }
}

export default View;


