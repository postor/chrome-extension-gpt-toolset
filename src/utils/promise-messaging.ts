export function promiseMessaging(data: any) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(data, resolve)
  })
}