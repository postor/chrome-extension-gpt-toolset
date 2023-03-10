import { useEffect, useState } from "react";

let { local } = chrome.storage

export default function useChromeStorage<T>(key: string, defaultValue: T) {
  let [val, setVal] = useState(defaultValue)
  let reload = () => {
    setVal(defaultValue)
    local.get(key).then(x => {
      if (x[key]) setVal(x[key])
    })
  }

  useEffect(reload, [])

  return [
    val,
    (val: T) => {
      setVal(val)
      local.set({ [key]: val })
    },
    reload
  ] as [T, (val: T) => void, () => void]
}