import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import React from "react"
import { languagesX, NameEnums } from "../utils/store"
import useChromeStorage from "../utils/use-chrome-storage"

const groupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  columnGap: '14px',
  justifyContent: 'space-between'
}


export const LanguageSelect = () => {
  let [lang, setLang] = useChromeStorage(NameEnums.language, 'en')
  return <div style={groupStyle}>
    <label>
      <FontAwesomeIcon icon={faLanguage} />
      <span>language</span>
    </label>
    <select value={lang} onChange={e => setLang(e.target.value)}>
      {Object.keys(languagesX).map(
        //@ts-ignore
        (x) => <option value={x} key={x}>{languagesX[x].localName}</option>
      )}
    </select>
  </div>
}
