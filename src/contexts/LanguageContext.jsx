import { createContext, useContext, useState } from 'react'
import zhCN from '../locales/zh-CN.json'
import enUS from '../locales/en-US.json'
import jaJP from '../locales/ja-JP.json'

const LanguageContext = createContext()

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'ja-JP': jaJP
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // 从本地存储获取语言设置，默认为中文
    return localStorage.getItem('portfolio-language') || 'zh-CN'
  })

  const t = (key) => {
    return translations[language][key] || key
  }

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    // 保存到本地存储
    localStorage.setItem('portfolio-language', newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, t, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
