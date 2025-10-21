import { useLanguage } from '../contexts/LanguageContext'
import './LanguageSwitcher.css'

function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage()

  const languages = [
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' }
  ]

  const handleLanguageChange = (newLanguage) => {
    switchLanguage(newLanguage)
  }

  return (
    <div className="language-switcher">
      <div className="language-buttons">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`language-button pixel-button ${
              language === lang.code ? 'active' : ''
            }`}
            onClick={() => handleLanguageChange(lang.code)}
            title={lang.name}
          >
            <span className="flag">{lang.flag}</span>
            <span className="name">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
