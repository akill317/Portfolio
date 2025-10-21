import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import './ImageCarousel.css'

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { t } = useLanguage()

  if (!images || images.length === 0) return null

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="image-carousel">
      <div className="carousel-container">
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="carousel-image pixelated"
        />

        {images.length > 1 && (
          <>
            <button 
              className="carousel-nav carousel-prev pixel-button"
              onClick={prevImage}
              aria-label={t('previous')}
            >
              ←
            </button>
            <button 
              className="carousel-nav carousel-next pixel-button"
              onClick={nextImage}
              aria-label={t('next')}
            >
              →
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel
