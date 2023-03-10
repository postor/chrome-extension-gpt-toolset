import React, { FC, useEffect, useState } from "react"
import { closePopMenu } from "../utils/container"
import { ActionEnums, getItemKey, getLanguage, getList, ITask, NameEnums } from "../utils/store"
import useChromeStorage from "../utils/use-chrome-storage"
import _ from "underscore"


const Button: FC<{ label: string, onClick: React.MouseEventHandler<HTMLDivElement> }> = ({ label, onClick }) => {
  return <div
    style={{
      color: '#fff',
      background: 'gray',
      padding: '4px 10px',
      textAlign: 'center'
    }}
    onClick={async (e) => {
      await onClick(e)
      window.getSelection()?.empty();
      closePopMenu()
    }}
    onMouseDown={e => {
      e.stopPropagation()
      e.preventDefault()
    }}
    onTouchStart={e => {
      e.stopPropagation()
      e.preventDefault()
    }}
  > {label}</div >
}

const MenuItem: FC<{ id: string }> = ({ id }) => {
  let [data] = useChromeStorage(getItemKey(id), { label: ``, value: ``, edit: false })
  let [task, setTask] = useChromeStorage<ITask | undefined>(NameEnums.task, undefined)
  return <Button
    label={data.label}
    onClick={
      async (e) => {
        console.log((await chrome.storage.local.get(NameEnums.text)).text)
        let task = {
          action: ActionEnums.GptChat,
          text: (await chrome.storage.local.get(NameEnums.text)).text,
          language: await getLanguage(),
          template: data.value,
          edit: data.edit,
        }
        setTask(task)
        chrome.runtime.sendMessage(task, function (r) { console.log(r); });
      }
    }
  ></Button >
}

const PopMenu: FC<{ onAction: (action: string) => void }> = () => {
  let [list, setList] = useState<string[]>([])
  useEffect(() => {
    getList().then(list => setList(list))
  }, [])
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1px',
  }}>
    <Button label="copy only" onClick={async e => {
      navigator.clipboard.writeText((await chrome.storage.local.get(NameEnums.text)).text)
    }} />
    {list.map(id => <MenuItem id={id} />)}
  </div>
}

export default PopMenu