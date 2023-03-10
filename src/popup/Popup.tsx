import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import uniqid from "uniqid"
import { getItemKey, initDb, NameEnums } from "../utils/store"
import useChromeStorage from "../utils/use-chrome-storage"
import { ConfigItem } from "./ConfigItem"
import { LanguageSelect } from "./LanguageSelect"
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"

const Popup = () => {
  let [list, setList, reload] = useChromeStorage<string[]>(NameEnums.list, [])
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    rowGap: '20px'
  }}>
    <LanguageSelect />
    <ul style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '14px'
    }}>
      {list.map(x => <li key={x}>
        <ConfigItem id={x} removeItem={() => {
          chrome.storage.local.remove(getItemKey(x))
          setList(list.filter(y => y != x))
        }} />
      </li>)}
      <li>
        <button onClick={() => setList([...list, uniqid()])}>
          <FontAwesomeIcon icon={faSquarePlus} />
          <span>Add Menu</span>
        </button>
      </li>
    </ul>
    <div className="control-group">
      <a href={'https://github.com/postor/chrome-extension-gpt-toolset/issues'}>
        feedback
      </a>
      <a href={"mailto:postor@gmail.com"}>
        postor@gmail.com
      </a>
    </div>
    <button onClick={async () => {
      await chrome.storage.local.clear()
      await initDb()
      reload()
    }}>Reset All</button>

    <style>{`
    ul,li {
      margin: 0;
      padding: 0;
    }
    button,label {
      display: flex;
      column-gap: 6px;
      flex-wrap: nowrap;
    }
    .control-group {          
      display: flex;
      flex-direction: row;
      column-gap: 14px;
      justify-content: space-between;
    }
    `}</style>
  </div>
}

export default Popup