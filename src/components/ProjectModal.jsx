import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ImageCarousel from './ImageCarousel'
import './ProjectModal.css'

function ProjectModal({ project, onClose }) {
  const { t, language } = useLanguage()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.removeProperty('overflow')
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // 获取当前语言的标题和描述
  const getTitle = () => {
    if (typeof project.title === 'object') {
      return project.title[language] || project.title['zh-CN'] || project.title['en-US']
    }
    return project.title
  }

  const getDescription = () => {
    if (typeof project.description === 'object') {
      return project.description[language] || project.description['zh-CN'] || project.description['en-US']
    }
    return project.description
  }

  const getDescriptionParts = () => {
    const raw = (getDescription() || '').replace(/\r/g, '')
    const roleMatchIndex = raw.search(/\nrole:/i)
    let introPart = raw
    let rolePart = ''

    if (roleMatchIndex !== -1) {
      introPart = raw.slice(0, roleMatchIndex)
      rolePart = raw.slice(roleMatchIndex).replace(/\nrole:\s*/i, '').trim()
    } else if (/^role:/i.test(raw)) {
      rolePart = raw.replace(/^role:\s*/i, '').trim()
      introPart = ''
    }

    const cleanedIntro = introPart.replace(/^Introduction:\s*/i, '').trim()
    const introHtml = cleanedIntro.replace(/\n/g, '<br />')

    const roleHtml = rolePart ? rolePart.replace(/\n/g, '<br />') : ''

    return {
      introHtml,
      roleHtml
    }
  }
  const descriptionParts = getDescriptionParts()

  const getCategory = () => {
    if (!project.category) return ''
    if (typeof project.category === 'object') {
      return (
        project.category[language] ||
        project.category['zh-CN'] ||
        project.category['en-US'] ||
        ''
      )
    }
    return t(project.category)
  }

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close pixel-button"
          onClick={onClose}
          aria-label={t('close')}
        >
          ×
        </button>

        <div className="modal-header">
          <h2 className="modal-title">{getTitle()}</h2>
          <span className="modal-category">{getCategory()}</span>
        </div>

        <div className="modal-body">
          {getDescription() && (
            <div className="modal-description">
              <h3>{t('introduction')}</h3>
              <div
                className="modal-introduction-text"
                dangerouslySetInnerHTML={{ __html: descriptionParts.introHtml }}
              />
              {descriptionParts.roleHtml && (
                <p className="modal-role">
                  <strong>{t('role')}:</strong>{' '}
                  <span
                    dangerouslySetInnerHTML={{ __html: descriptionParts.roleHtml }}
                  />
                </p>
              )}
            </div>
          )}

          {/* 视频播放器 - 优先显示国内可访问的视频源 */}
          {(project.bilibiliEmbed || project.vimeoEmbed) && (
            <div className="modal-video">
              {/* 优先显示Bilibili视频 */}
              {project.bilibiliEmbed ? (
                <iframe
                  src={project.bilibiliEmbed}
                  width="100%"
                  height="315"
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                  title={project.title}
                />
              ) : (
                /* 如果没有Bilibili视频，显示Vimeo（可能无法访问） */
                <>
                  <div className="video-fallback-notice">
                    <p>⚠️ 此视频可能无法正常播放，建议使用VPN或查看其他项目</p>
                  </div>
                  <iframe
                    src={project.vimeoEmbed}
                    width="100%"
                    height="315"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={project.title}
                  />
                </>
              )}
            </div>
          )}

          {project.soundcloudEmbed && (
            <div className="modal-audio">
              <iframe
                title={`${getTitle()} audio`}
                allow="autoplay"
                src={project.soundcloudEmbed}
              />
            </div>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="modal-screenshots">
              <h3>{t('screenshots')}</h3>
              <ImageCarousel images={project.screenshots} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
