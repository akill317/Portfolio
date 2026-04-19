import { useState } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProjectGrid from './components/ProjectGrid'
import ProjectModal from './components/ProjectModal'
import LanguageSwitcher from './components/LanguageSwitcher'
import Footer from './components/Footer'
import projects from './data/projects.json'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const projectsWithIndex = projects.map((project, index) => ({
    project,
    index
  }))

  // 排序：仅按 projects.json 的 order，相同 order 时按文件内原始顺序
  const sortedProjects = projectsWithIndex
    .slice()
    .sort((a, b) => {
      const aOrder = typeof a.project.order === 'number' ? a.project.order : 9999
      const bOrder = typeof b.project.order === 'number' ? b.project.order : 9999
      if (aOrder !== bOrder) return aOrder - bOrder
      return a.index - b.index
    })
    .map(item => item.project)

  const filteredProjects = selectedCategory === 'all' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.category === selectedCategory)

  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <div className="page-content">
          <div className="page-scanline" aria-hidden="true"></div>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <ProjectGrid 
            projects={filteredProjects}
            onProjectSelect={setSelectedProject}
          />
          {selectedProject && (
            <ProjectModal 
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
          <LanguageSwitcher />
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
