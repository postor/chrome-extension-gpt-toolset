import uniqid from 'uniqid'

const { local } = chrome.storage

export enum NameEnums {
  list = 'list',
  item = 'item',
  text = 'text'
}

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

async function initDb() {
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
      value: "translate the following content into {{LANGUAGE}}:\n\ncontents:\n{{TEXT}}\n\nanswer:"
    }, {
      label: `summarize`,
      value: "summarize the following content and answer in {{LANGUAGE}}:\n\ncontents:\n{{TEXT}}\n\nanswer:"
    },
  ]
}