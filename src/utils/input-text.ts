import { promiseMessaging } from "./promise-messaging";
import { ActionEnums } from "./store";

const ime_api = chrome.input.ime;

export function waitForContextId(): Promise<number> {
  return new Promise((resolve) => {
    console.log(`waitForContextId`)
    let cb = function (context: chrome.input.ime.InputContext) {
      console.log('onFocus:' + context.contextID)
      ime_api.onFocus.removeListener(cb)
      resolve(context.contextID)
    }
    ime_api.onFocus.addListener(cb)
  })
}

export function inputText(context_id: number, text: string) {
  ime_api.commitText({
    "contextID": context_id,
    "text": text
  })
}