import { useLanguage } from '../contexts/LanguageContext'
import ProjectCard from './ProjectCard'
import './ProjectGrid.css'

function ProjectGrid({ projects, onProjectSelect }) {
  const { t } = useLanguage()
  
  return (
    <main className="project-grid-container">
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard 
              project={project}
              onClick={onProjectSelect}
            />
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="empty-state">
          <p>{t('noProjects')}</p>
        </div>
      )}
    </main>
  )
}

export default ProjectGrid
