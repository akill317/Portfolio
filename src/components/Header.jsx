import { useMemo, useState } from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useLanguage } from '../contexts/LanguageContext'
import './Header.css'

const SOCIAL_LINKS = [
  {
    id: 'itch',
    href: 'https://erenyx.itch.io',
    label: 'itch.io',
    renderIcon: () => (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3.5 6.5v5h7v-5h-7Zm-2 2.5H9v2H6.5v-2Zm8.5 0h2.5v2H15v-2Z" fill="currentColor" />
      </svg>
    )
  }
]

const INTRO_CONTENT = {
  'zh-CN': {
    primary: [
      '你好，我是仇平（Erenyx），喜欢把设计、编程和音乐混在一起创造体验。',
      '这些年来我专注于游戏与互动叙事，也持续练习插画与声音以寻找新的表达方式。'
    ],
    secondary: [
      'Hi, I\'m Ping "Erenyx" Qiu — I design playful systems with equal love for code, art and sound.'
    ]
  },
  'en-US': {
    primary: [
      'Hi, I\'m Ping "Erenyx" Qiu, a multidisciplinary game designer who blends systems, aesthetics and music.',
      'I build playful experiments, sketch worlds, and score them so stories and mechanics feel inseparable.'
    ],
    secondary: [
      '你好，我是仇平（Erenyx），正在把设计、程序与声音混在一起探索更多的互动可能。'
    ]
  },
  'ja-JP': {
    primary: [
      'こんにちは、秋平（Erenyx）です。ゲームデザインとインタラクションを中心に制作しています。',
      'コード・ビジュアル・サウンドを行き来しながら、遊び心のある体験づくりを探求しています。'
    ],
    secondary: [
      'Hi, I\'m Ping "Erenyx" Qiu — blending design, programming and music keeps my projects vivid.'
    ]
  }
}

const EXPAND_LABEL = {
  'zh-CN': '展开个人简介',
  'en-US': 'Show personal intro',
  'ja-JP': '自己紹介を表示'
}

const COLLAPSE_LABEL = {
  'zh-CN': '收起个人简介',
  'en-US': 'Hide personal intro',
  'ja-JP': '自己紹介を閉じる'
}

function Header() {
  const { language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const introContent = useMemo(() => {
    return INTRO_CONTENT[language] || INTRO_CONTENT['en-US']
  }, [language])

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  const ariaLabel = isExpanded
    ? COLLAPSE_LABEL[language] || COLLAPSE_LABEL['en-US']
    : EXPAND_LABEL[language] || EXPAND_LABEL['en-US']

  return (
    <header className="header">
      <div className="header-content">
        <div className="title-shell">
          <AnimatedTitle />
        </div>

        <div
          id="personal-intro"
          className={`expanded-content${isExpanded ? ' show' : ''}`}
        >
          <div className="personal-info">
            {introContent.primary.map((line, index) => (
              <p key={`primary-${index}`} className="intro-text">{line}</p>
            ))}
            {introContent.secondary?.map((line, index) => (
              <p key={`secondary-${index}`} className="intro-text-en">{line}</p>
            ))}
          </div>

          <div className="social-links">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                className="social-link"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.label}
                title={link.label}
              >
                {link.renderIcon()}
              </a>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`expand-button${isExpanded ? ' expanded' : ''}`}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-label={ariaLabel}
        aria-controls="personal-intro"
      >
        <span className="triangle" aria-hidden="true"></span>
      </button>
    </header>
  )
}

export default Header
