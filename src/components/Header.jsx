import { useMemo, useState } from 'react'
import AnimatedTitle from './AnimatedTitle'
import { useLanguage } from '../contexts/LanguageContext'
import './Header.css'

const ItchIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M5.2 3.2h13.6c1.1 0 2 .9 2 2v10.6c0 1.5-.6 2.9-1.7 4l-.9.9a1 1 0 0 1-1.4 0l-2.3-2.3H9.5l-2.3 2.3a1 1 0 0 1-1.4 0l-.9-.9a5.66 5.66 0 0 1-1.7-4V5.2c0-1.1.9-2 2-2Zm2.8 4.8c-.66 0-1.2.54-1.2 1.2v4c0 .66.54 1.2 1.2 1.2h8c.66 0 1.2-.54 1.2-1.2v-4c0-.66-.54-1.2-1.2-1.2h-8Zm1.3 2.2a1 1 0 1 1 2 0v1.2a1 1 0 1 1-2 0V10.2Zm3.4 0a1 1 0 1 1 2 0v1.2a1 1 0 1 1-2 0V10.2Z"
    />
  </svg>
)

const XiaohongshuIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3" y="5" width="18" height="14" rx="3" fill="currentColor" />
    <path
      fill="currentColor"
      stroke="#0A0A0F"
      strokeWidth="1.2"
      strokeLinecap="round"
      d="M7.2 10.5h2.1m2.4 0h2.1m2.4 0h2.1M7.5 8V16m4.5-8v8m4.5-8v8"
    />
  </svg>
)

const BilibiliIcon = () => (
  <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="4" y="7" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      d="m9 5 2.2 2m3.8-2-2.2 2M9 11h2m4 0h2"
    />
  </svg>
)

const SOCIAL_LINKS = [
  {
    id: 'itch',
    href: 'https://erenyx.itch.io',
    label: 'itch.io',
    renderIcon: () => <ItchIcon />
  },
  {
    id: 'xiaohongshu',
    href: 'https://xhslink.com/m/3qN3uvHCsvB',
    label: '小红书',
    renderIcon: () => <XiaohongshuIcon />
  },
  {
    id: 'bilibili',
    href: 'https://space.bilibili.com/601816',
    label: 'Bilibili',
    renderIcon: () => <BilibiliIcon />
  },
  {
    id: 'email',
    href: 'mailto:375051821@qq.com',
    label: 'Email',
    renderIcon: () => (
      <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
      </svg>
    )
  }
]

const SKILLS_DATA = {
  'zh-CN': {
    'gamedesign': { name: '游戏设计', level: 2, maxLevel: 5, icon: '🎮' },
    'chinese': { name: '中文', level: 3, maxLevel: 5, icon: '中' },
    'english': { name: '英文', level: 2, maxLevel: 5, icon: 'E' },
    'japanese': { name: '日文', level: 2, maxLevel: 5, icon: '日' },
    'programming': { name: '编程', level: 2, maxLevel: 5, icon: '💻' },
    'violin': { name: '小提琴', level: 2, maxLevel: 5, icon: '🎻' },
    'musiccompose': { name: '音乐创作', level: 1, maxLevel: 5, icon: '🎵' },
    'painting': { name: '绘画', level: 1, maxLevel: 5, icon: '🎨' },
    'special': { name: '特殊技能', level: 3, maxLevel: 5, icon: '⭐' }
  },
  'en-US': {
    'gamedesign': { name: 'Game Design', level: 2, maxLevel: 5, icon: '🎮' },
    'chinese': { name: 'Chinese', level: 3, maxLevel: 5, icon: '中' },
    'english': { name: 'English', level: 2, maxLevel: 5, icon: 'E' },
    'japanese': { name: 'Japanese', level: 2, maxLevel: 5, icon: '日' },
    'programming': { name: 'Programming', level: 2, maxLevel: 5, icon: '💻' },
    'violin': { name: 'Violin', level: 2, maxLevel: 5, icon: '🎻' },
    'musiccompose': { name: 'Music Compose', level: 1, maxLevel: 5, icon: '🎵' },
    'painting': { name: 'Painting', level: 1, maxLevel: 5, icon: '🎨' },
    'special': { name: 'Special Skills', level: 3, maxLevel: 5, icon: '⭐' }
  },
  'ja-JP': {
    'gamedesign': { name: 'ゲームデザイン', level: 2, maxLevel: 5, icon: '🎮' },
    'chinese': { name: '中国語', level: 3, maxLevel: 5, icon: '中' },
    'english': { name: '英語', level: 2, maxLevel: 5, icon: 'E' },
    'japanese': { name: '日本語', level: 2, maxLevel: 5, icon: '日' },
    'programming': { name: 'プログラミング', level: 2, maxLevel: 5, icon: '💻' },
    'violin': { name: 'バイオリン', level: 2, maxLevel: 5, icon: '🎻' },
    'musiccompose': { name: '音楽制作', level: 1, maxLevel: 5, icon: '🎵' },
    'painting': { name: '絵画', level: 1, maxLevel: 5, icon: '🎨' },
    'special': { name: '特殊技能', level: 3, maxLevel: 5, icon: '⭐' }
  }
}

const INTRO_CONTENT = {
  'zh-CN': {
    primary: [
      '大家好，我是Erenyx，这个网页主要陈列一些个人过去参与过的作品。'
    ]
  },
  'en-US': {
    primary: [
      'Hello everyone, I\'m Erenyx. This website mainly showcases some personal works I\'ve participated in the past.'
    ]
  },
  'ja-JP': {
    primary: [
      '皆さん、こんにちは。Erenyxです。このウェブサイトは主に私が過去に参加した作品を展示しています。'
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

  const skillsData = useMemo(() => {
    return SKILLS_DATA[language] || SKILLS_DATA['en-US']
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
            
            <div className="skills-section">
              <h3 className="skills-title">
                {language === 'zh-CN' && '技能等级'}
                {language === 'en-US' && 'Skill Level'}
                {language === 'ja-JP' && 'スキルレベル'}
              </h3>
              <div className="skills-grid">
                {Object.entries(skillsData).map(([skillKey, skill]) => (
                  <div key={skillKey} className="skill-item">
                    <div className="skill-icon">
                      <span className="skill-icon-symbol">{skill.icon}</span>
                    </div>
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <div className="level-bars">
                          {Array.from({ length: skill.maxLevel }, (_, i) => (
                            <div 
                              key={i} 
                              className={`level-bar ${i < skill.level ? 'filled' : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
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
