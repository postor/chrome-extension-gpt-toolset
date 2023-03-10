
import React, { CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import PopMenu from './contents/PopMenu'
import './contents/i18n'
import { ActionEnums, GPT_CHAT_URL, NameEnums } from './utils/store'
import { closePopMenu, getContainer } from './utils/container'

const RETRY_SETTING_CHAT_TIMES = 30, RETRY_SETTING_CHAT_PEROID = 1000

window.addEventListener('mouseup', checkSelect)
window.addEventListener('touchend', checkSelect)
window.addEventListener('mousedown', closePopMenu)
window.addEventListener('touchstart', closePopMenu)


if (location.href.startsWith(GPT_CHAT_URL)) {
  (async () => {
    while (true) {
      let inputEl = document.querySelector('textarea')
      if (!inputEl) continue
      let el = inputEl

      chrome.runtime.sendMessage({
        action: ActionEnums.GptPageFetchQuestion
      }, async function (r) {
        console.log(r)
        let inputFocused = false
        let focusCB = () => {
          inputFocused = true
          el.removeEventListener('focus', focusCB)
        }
        el.addEventListener('focus', focusCB)
        if (!r) return
        let { edit = false, text } = r
        await wait(500)
        el.value = text
        for (let i = 0; i < RETRY_SETTING_CHAT_TIMES; i++) {
          await wait(RETRY_SETTING_CHAT_PEROID)
          if (inputFocused) break
          let inputEl = document.querySelector('textarea')
          if (!inputEl) continue
          if (document.querySelectorAll('.text-base').length) {
            break
          }
          await wait(0)
          inputEl.value = text
          await wait(0)
          if (!edit) {
            // @ts-ignore
            inputEl.nextElementSibling.click()
          }
        }
      });
      break
    }
  })()
}


function checkSelect(e: Event) {
  setTimeout(async () => {
    closePopMenu()
    let text = (window.getSelection()?.toString() ?? '').trim()
    if (!text) return

    await chrome.storage.local.set({ [NameEnums.text]: text })

    let container = getContainer()
    let root = createRoot(container)
    root.render(<PopMenu onAction={startAction} />)
  }, 600)
}

function startAction(action: string) {
  console.log({ action })
}

function wait(mili: number) {
  return new Promise(resolve => setTimeout(resolve, mili))
}

function waitPageLoad() {
  return new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve))
}