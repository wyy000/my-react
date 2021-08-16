export function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => typeof child === 'object' ? child : createTextElement(child)),
    },
  }
}

function createTextElement (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

export function render (element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
  for (let key in element.props) {
    key !== 'children' && (dom[key] = element.props[key])
  }
  element.props.children.map((child) => render(child, dom))
  container.appendChild(dom)
}