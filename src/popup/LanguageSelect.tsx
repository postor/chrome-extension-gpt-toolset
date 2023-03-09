import React from "react"
import { useChromeStorageLocal } from 'use-chrome-storage'

const languagesX = ({
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

export const LanguageSelect = () => {
  let [lang, setLang] = useChromeStorageLocal('language', 'en')
  return <div>
    <select value={lang} onChange={e => setLang(e.target.value)}>
      {Object.keys(languagesX).map(
        //@ts-ignore
        (x) => <option value={lang}>{languagesX[x].localName}</option>
      )}
    </select>
  </div>
}

export async function getLanguage(): Promise<string> {
  let key = (await chrome.storage.local.get('language')) || 'en'
  //@ts-ignore
  return languagesX[key].name
}