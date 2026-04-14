import { useState } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProjectGrid from './components/ProjectGrid'
import ProjectModal from './components/ProjectModal'
import LanguageSwitcher from './components/LanguageSwitcher'
import Footer from './components/Footer'
import projects from './data/projects.json'

const PINNED_PROJECT_IDS = [
  'dungeon-employee',
  'override-adventure',
  'mist-trek',
  'pajinko',
  'birds-camp',
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

  // 排序：先按是否置顶（置顶的在前），置顶内按 PINNED_PROJECT_IDS 顺序，未置顶的按 order 再按原下标
  const sortedProjects = projectsWithIndex
    .slice()
    .sort((a, b) => {
      const aPinned = a.pinnedIndex !== -1
      const bPinned = b.pinnedIndex !== -1

      if (aPinned && bPinned) {
        return a.pinnedIndex - b.pinnedIndex
      }
      if (aPinned !== bPinned) {
        return aPinned ? -1 : 1
      }

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
