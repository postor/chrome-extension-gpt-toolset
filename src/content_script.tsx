
import React, { CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import PopMenu from './contents/PopMenu'
import './contents/i18n'
import { NameEnums } from './store'

let popMenu: HTMLElement | undefined = undefined

window.addEventListener('mouseup', checkSelect)
window.addEventListener('touchend', checkSelect)
window.addEventListener('mousedown', closePopMenu)
window.addEventListener('touchstart', closePopMenu)



function checkSelect(e: Event) {
  setTimeout(async () => {
    closePopMenu()
    let text = (window.getSelection()?.toString() ?? '').trim()
    if (!text) return

    await chrome.storage.local.set({ [NameEnums.text]: text })

    let container = getContainer()
    let root = createRoot(container)
    root.render(<PopMenu onAction={startAction} />)
    popMenu = container
  }, 600)
}

function startAction(action: string) {
  console.log({ action })
}


function getContainer() {
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
  return container

}


function getContainerStyle(): CSSProperties {
  let s = window.getSelection();
  if (!s) throw 'selection not found!'
  let oRange = s.getRangeAt(0); //get the text range
  let oRect = oRange.getBoundingClientRect();
  return {
    position: 'absolute',
    top: (oRect.top + window.scrollY) + 'px',
    left: oRect.right + 'px',
  }
}

function closePopMenu() {
  if (popMenu) {
    popMenu.remove()
    popMenu = undefined
  }
}
