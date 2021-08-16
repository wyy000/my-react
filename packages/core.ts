interface ElementAsObject {
  type: string
  props: {
    [key: string]: any
    children: Array<ElementAsObject>
  }
}

export function createElement (type: string, props: any, ...children: Array<ElementAsObject>): ElementAsObject {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => typeof child === 'object' ? child : createTextElement(child)),
    },
  }
}

function createTextElement (text: string): ElementAsObject {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

export function render (element: ElementAsObject, container: HTMLElement): void {
  const dom = element.props.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
  for (let key in element.props) {
    key !== 'children' && (dom[key] = element.props[key])
  }
  element.props.children.map((child) => render(child, dom as HTMLElement))
  container.appendChild(dom)
}