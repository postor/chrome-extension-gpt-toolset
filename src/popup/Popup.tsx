import React from "react"
import { useChromeStorageLocal } from "use-chrome-storage"
import { NameEnums } from "../store"
import { ConfigItem } from "./ConfigItem"
import { LanguageSelect } from "./LanguageSelect"

const Popup = () => {
  let [list] = useChromeStorageLocal(NameEnums.list, [])
  return <div>
    <LanguageSelect />
    <ul>
      {list.map(x => <li key={x}>
        <ConfigItem id={x} />
      </li>)}

    </ul>
  </div>
}

export default Popup