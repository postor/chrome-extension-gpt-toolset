import React from 'react'
import { FC } from 'react'
import { ActionEnums, getItemKey, getLanguage, ITask, NameEnums } from '../utils/store'
import useChromeStorage from '../utils/use-chrome-storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight, faTrashCan, faBars } from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

const groupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  columnGap: '14px',
  justifyContent: 'space-between'
}

export const ConfigItem: FC<{ id: string, removeItem: () => void }> = ({ id, removeItem }) => {
  let [data, setData] = useChromeStorage(
    getItemKey(id), {
    label: `menu text for ${id}`, value: `translate the following content into {{LANGUAGE}}:\n\ncontents:\n{{TEXT}}\n\nanswer:`,
    edit: false,
  })
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px'
  }}>
    <div style={groupStyle}>
      <label>
        <FontAwesomeIcon icon={faBars} />
        <span>Menu</span>
      </label>
      <input placeholder={`menu text`} value={data.label} onChange={e => setData({
        ...data,
        label: e.target.value
      })} />
    </div>

    <div style={groupStyle}>
      <label>
        <FontAwesomeIcon icon={faPenToSquare} />
        <span>Edit</span>
      </label>
      <input type={'checkbox'} checked={data.edit} onClick={e => setData({
        ...data,
        edit: !data.edit
      })} />
    </div>
    <textarea rows={4} placeholder={`menu text`} value={data.value} onChange={e => setData({
      ...data,
      value: e.target.value
    })} />
    <div style={groupStyle}>
      <button onClick={async () => {
        let task: ITask = {
          action: ActionEnums.GptChat,
          text: '${TEXT}',
          language: await getLanguage(),
          template: data.value,
          edit: true,
        }
        await chrome.storage.local.set({ [NameEnums.task]: task })
        chrome.runtime.sendMessage(task, function (r) { console.log(r); });
      }}>
        <FontAwesomeIcon icon={faSquareArrowUpRight} />
        <span>Open</span>
      </button>
      <button onClick={removeItem} >
        <FontAwesomeIcon icon={faTrashCan} />
        <span>Delete</span>
      </button>
    </div>
  </div>
}