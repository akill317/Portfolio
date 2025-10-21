import { useState } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProjectGrid from './components/ProjectGrid'
import ProjectModal from './components/ProjectModal'
import LanguageSwitcher from './components/LanguageSwitcher'
import projects from './data/projects.json'

const PINNED_PROJECT_IDS = [
  'monsterologist',
  'chase',
  'racognition',
  'darter',
  'full-collapsy',
  'horrific-war',
  'bigo8'
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const projectsWithIndex = projects.map((project, index) => ({
    project,
    index,
    pinnedIndex: PINNED_PROJECT_IDS.indexOf(project.id)
  }))

  const sortedProjects = projectsWithIndex
    .slice()
    .sort((a, b) => {
      const aPinned = a.pinnedIndex !== -1
      const bPinned = b.pinnedIndex !== -1

      if (aPinned && bPinned && a.pinnedIndex !== b.pinnedIndex) {
        return a.pinnedIndex - b.pinnedIndex
      }

      if (aPinned !== bPinned) {
        return aPinned ? -1 : 1
      }

      const aHasOrder = typeof a.project.order === 'number'
      const bHasOrder = typeof b.project.order === 'number'

      if (aHasOrder !== bHasOrder) {
        return aHasOrder ? 1 : -1
      }

      if (aHasOrder && a.project.order !== b.project.order) {
        return a.project.order - b.project.order
      }

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
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
