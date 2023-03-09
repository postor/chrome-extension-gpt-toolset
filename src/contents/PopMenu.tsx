import React, { FC, useEffect, useState } from "react"
import { useChromeStorageLocal } from "use-chrome-storage"
import { getItemKey, getList, NameEnums } from "../store"

const MenuItem: FC<{ id: string }> = ({ id }) => {
  let [data] = useChromeStorageLocal(getItemKey(id), { label: ``, value: `` })
  return <div
    style={{
      color: '#fff',
      background: 'gray',
      padding: '4px 10px',
      textAlign: 'center'
    }}
    onClick={async (e) => {
      e.stopPropagation()
      e.preventDefault()
      console.log({
        text: await chrome.storage.local.get(NameEnums.text),
        id,
        data,
      })
    }}
    onMouseDown={e => {
      e.stopPropagation()
      e.preventDefault()
    }}
    onTouchStart={e => {
      e.stopPropagation()
      e.preventDefault()
    }}
  > {data.label}</div >
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
    {list.map(id => <MenuItem id={id} />)}
  </div>
}

export default PopMenu