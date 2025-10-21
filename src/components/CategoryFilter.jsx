import { useLanguage } from '../contexts/LanguageContext'
import './CategoryFilter.css'

const categories = ['all', 'game', 'music', 'painting', 'others']

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const { t } = useLanguage()

  return (
    <div className="category-filter">
      <nav className="category-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button pixel-button ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {t(category)}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default CategoryFilter
