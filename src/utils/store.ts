import uniqid from 'uniqid'

const { local } = chrome.storage

export const GPT_CHAT_OPEN_URL = `https://chat.openai.com`
export const GPT_CHAT_URL = `https://chat.openai.com/chat`

export enum ActionEnums {
  GptChat = 'GptChat',
  GptPageFetchQuestion = 'GptPageFetchQuestion',
  GptInputTextContextWait = 'GptInputTextContextWait',
  GptInputTextCheck = 'GptInputTextCheck',
  GptInputTextDone = 'GptInputTextDone'
}

export type ITask = {
  action: ActionEnums
  text: string
  language: string
  template: string
  edit?: boolean
}

export enum NameEnums {
  list = 'list',
  item = 'item',
  text = 'text',
  language = 'language',
  task = 'task'
}

export const languagesX = ({
  "sq": { "name": "Albanian", "localName": "shqiptar", "countries": ["Albania", "Kosovo", "North Macedonia"] },
  "ar": { "name": "Arabic", "localName": "العربية", "countries": ["Egypt", "Sudan", "Algeria", "Iraq", "Morocco", "Saudi Arabia"] },
  "bn": { "name": "Bengali", "localName": "বাংলা", "countries": ["Bangladesh", "India"] },
  "ch": { "name": "Chinese", "localName": "中文", "countries": ["China", "Singapore", "Taiwan"] },
  "nl": { "name": "Dutch", "localName": "Nederlandse", "countries": ["Netherlands", "Belgium", "Suriname"] },
  "en": { "name": "English", "localName": "English", "countries": ["United Kingdom", "Nigeria", "Philippines", "Bangladesh", "India"] },
  "fr": { "name": "French", "localName": "Français", "countries": ["Canada", "Belgium", "Switzerland", "Madagascar", "Monaco", "Haiti"] },
  "de": { "name": "German", "localName": "German", "countries": ["Germany", "Austria", "Switzerland", "Belgium", "Luxembourg", "Liechtenstein"] },
  "gr": { "name": "Greek", "localName": "ελληνική", "countries": ["Greece", "Cyprus"] },
  "gu": { "name": "Guarani", "localName": "Avañe'ẽ", "countries": ["Bolivia", "Paraguay"] },
  "hi": { "name": "Hindi", "localName": "हिंदुस्तानी", "countries": ["India", "Fiji (known as Hindustani)", "Pakistan (known as Urdu)"] },
  "it": { "name": "Italian", "localName": "Italiano", "countries": ["Italy", "Switzerland", "San Marino", "Vatican City"] },
  "ko": { "name": "Korean", "localName": "한국어", "countries": ["North Korea", "South Korea"] },
  "ms": { "name": "Malay", "localName": "Melayu", "countries": ["Indonesia (known as Indonesian), Malaysia", "Singapore", "Brunei"] },
  "fa": { "name": "Persian", "localName": "پارسی", "countries": ["Iran", "Afghanistan (known as Dari), Tajikistan (known as Tajik)"] },
  "pt": { "name": "Portuguese", "localName": "Português", "countries": ["Portugal", "Brazil", "Mozambique", "Angola"] },
  "ro": { "name": "Romanian", "localName": "Română", "countries": ["Romania", "Moldova"] },
  "ru": { "name": "Russian", "localName": "русский", "countries": ["Russia", "Kazakhstan", "Belarus", "Kyrgyzstan"] },
  "sr": { "name": "Serbo-Croatian", "localName": "Српско-хрватски", "countries": ["Serbia", "Croatia", "Bosnia and Herzegovina", "Montenegro", "Kosovo"] },
  "es": { "name": "Spanish", "localName": "Español", "countries": ["Spain", "Mexico", "Colombia", "Argentina"] },
  "sw": { "name": "Swahili", "localName": "Kiswahili", "countries": ["Tanzania", "Kenya", "Uganda", "Rwanda", "Democratic Republic of the Congo"] },
  "sv": { "name": "Swedish", "localName": "Swedish", "countries": ["Sweden", "Finland"] },
  "ta": { "name": "Tamil", "localName": "தமிழ்", "countries": ["Sri Lanka", "Singapore", "India"] },
  "tr": { "name": "Turkish", "localName": "Türk", "countries": ["Turkey", "Cyprus"] },
})

export function getItemKey(id: string) {
  return NameEnums.item + '_' + id
}

export async function getItem(id: string) {
  return (await local.get(getItemKey(id)))[getItemKey(id)]
}

export async function getList(): Promise<string[]> {
  let { list } = await local.get(NameEnums.list)
  if (list) return list
  await initDb()
  return await getList()
}

export async function initDb() {
  let list = []
  for (let { label, value } of getInitialItems()) {
    let id = uniqid()
    await addItem(id, label, value)
    list.push(id)
  }
  await local.set({ [NameEnums.list]: list })
}

async function addItem(id: string, label: string, value: string) {
  local.set({ [getItemKey(id)]: { label, value } })

}

function getInitialItems() {
  return [
    {
      label: `translate`,
      value: "translate the following content into ${LANGUAGE}:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `summarize`,
      value: "summarize the following content and answer in ${LANGUAGE}:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `continue writing`,
      value: "continue the story in following content and answer in ${LANGUAGE}:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `meeting minutes`,
      value: "generate meeting minutes from the following content and answer in ${LANGUAGE}:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `into JavaScript`,
      value: "convert following contents in to JavaScript code:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `find emails`,
      value: "find emails in the following content:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: false
    }, {
      label: `custom question`,
      value: "${QUESTION}:\n\ncontents:\n${TEXT}\n\nanswer:",
      edit: true
    },
  ]
}

export async function getLanguage(): Promise<string> {
  let key = (await chrome.storage.local.get(NameEnums.language)).language || 'en'
  //@ts-ignore
  return languagesX[key].name
}