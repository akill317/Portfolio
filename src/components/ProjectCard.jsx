import { useLanguage } from '../contexts/LanguageContext'
import './ProjectCard.css'

function ProjectCard({ project, onClick }) {
  const { language, t } = useLanguage()
  
  // 获取当前语言的标题
  const getTitle = () => {
    if (typeof project.title === 'object') {
      return project.title[language] || project.title['zh-CN'] || project.title['en-US']
    }
    return project.title
  }

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
      className="project-card"
      onClick={() => onClick(project)}
    >
      <div className="card-thumbnail">
        <img 
          src={project.thumbnail} 
          alt={getTitle()}
          className="thumbnail-image pixelated"
          loading="lazy"
        />
        <div className="card-overlay">
          <div className="overlay-content">
            <h3 className="card-title">{getTitle()}</h3>
            <span className="card-category">{getCategory()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
