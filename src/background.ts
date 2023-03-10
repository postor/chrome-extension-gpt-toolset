import { inputText, waitForContextId } from "./utils/input-text";
import { ActionEnums, GPT_CHAT_OPEN_URL, ITask } from "./utils/store"
import stringReplaceAll from 'string-replace-all'

let lastTask: ITask | undefined = undefined

chrome.runtime.onMessage.addListener(
  function (req: ITask, sender, cb) {
    switch (req.action) {
      case ActionEnums.GptPageFetchQuestion:
        {
          if (!lastTask) {
            cb()
          } else {
            let str = interpolate(lastTask.template, {
              TEXT: lastTask.text,
              LANGUAGE: lastTask.language,
            })
            console.log(str)
            cb({
              text: str,
              edit: lastTask.edit
            })
          }

          lastTask = undefined
        } break
      default:
        {
          lastTask = req
          chrome.tabs.create({ url: GPT_CHAT_OPEN_URL });
          cb({ background: 'copy that' });
        }
    }
  }
)

function getInputText() {
  if (!lastTask) return ''
  return interpolate(lastTask.template, {
    TEXT: lastTask.text,
    LANGUAGE: lastTask.language,
  })
}

function interpolate(template: string, params: { [key: string]: string }) {
  const names = Object.keys(params);
  let rtn = template
  for (let name of names) {
    rtn = stringReplaceAll(rtn, `\${${name}}`, params[name])
  }
  return rtn
}