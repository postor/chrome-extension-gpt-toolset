import React from 'react';
import { FC } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage'
import { getItemKey } from '../store';


export const ConfigItem: FC<{ id: string }> = ({ id }) => {
  let [data, setData] = useChromeStorageLocal(
    getItemKey(id), {
      label: `menu text for ${id}`, value: `translate the following content into {{LANGUAGE}}:\n\ncontents:\n{{TEXT}}\n\nanswer:` })
  return <div>
    <input placeholder={`menu text`} value={data.label} onChange={e => setData(x => ({
      ...x,
      label: e.target.value
    }))} />
    <textarea rows={4} placeholder={`menu text`} value={data.label} onChange={e => setData(x => ({
      ...x,
      value: e.target.value
    }))} />
  </div>
}