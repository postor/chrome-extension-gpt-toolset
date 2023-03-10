import { CSSProperties } from "react"

let popMenu: HTMLElement | undefined = undefined


export function getContainer() {
  const CONTAINER_ID = 'gpt_toolbox_container'
  let container = document.getElementById(CONTAINER_ID)
  if (container) return container

  container = document.createElement('div')
  container.id = CONTAINER_ID
  for (let [k, v] of Object.entries(getContainerStyle())) {

    console.log([k, v])
    // @ts-ignore
    container.style[k] = v
  }

  document.body.appendChild(container)

  popMenu = container
  return container

}


export function getContainerStyle() {
  let s = window.getSelection();
  if (!s) throw 'selection not found!'
  let oRange = s.getRangeAt(0); //get the text range
  let oRect = oRange.getBoundingClientRect();
  return {
    position: 'absolute',
    top: (oRect.top + window.scrollY) + 'px',
    left: oRect.right + 'px',
    'z-index': '99999'
  }
}

export function closePopMenu() {
  if (popMenu) {
    popMenu.remove()
    popMenu = undefined
  }
}
