import { useMemo, useState } from 'react'
import './AnimatedTitle.css'

function AnimatedTitle() {
  const targetText = 'ERENYX'
  const dotGlyph = '●'

  const hueOffsets = useMemo(() => {
    const offsets = {}

    targetText.split('').forEach((char, charIndex) => {
      getCharDots(char).forEach((row, rowIndex) => {
        row.forEach((dot, dotIndex) => {
          if (!dot) return
          const id = `${charIndex}-${rowIndex}-${dotIndex}`
          offsets[id] = Math.random()
        })
      })
    })

    return offsets
  }, [targetText])

  const { animationConfig, dotMeta } = useMemo(() => {
    const config = {}
    const metaMap = {}

    targetText.split('').forEach((char, charIndex) => {
      const grid = getCharDots(char)

      grid.forEach((row, rowIndex) => {
        row.forEach((dot, dotIndex) => {
          if (dot) {
            const id = `${charIndex}-${rowIndex}-${dotIndex}`
            config[id] = {
              delay: Math.random() * 2,
              duration: 2 + Math.random() * 3
            }
            metaMap[id] = {
              charIndex,
              rowIndex,
              colIndex: dotIndex
            }
          }
        })
      })
    })

    return { animationConfig: config, dotMeta: metaMap }
  }, [targetText])

  const [dotOffsets, setDotOffsets] = useState({})

  const getNeighborDotIds = (originId, radius) => {
    const origin = dotMeta[originId]
    if (!origin) {
      return [originId]
    }

    const neighbors = [originId]

    Object.entries(dotMeta).forEach(([id, meta]) => {
      if (id === originId) return
      if (meta.charIndex !== origin.charIndex) return

      const distance = Math.hypot(
        meta.rowIndex - origin.rowIndex,
        meta.colIndex - origin.colIndex
      )

      if (distance <= radius) {
        neighbors.push(id)
      }
    })

    return neighbors
  }

  const handleDotEnter = (dotId) => {
    const affectedIds = getNeighborDotIds(dotId, 2.5)

    setDotOffsets((prev) => {
      const next = { ...prev }

      affectedIds.forEach((id) => {
        const isPrimary = id === dotId
        const angle = Math.random() * Math.PI * 2
        const minDistance = isPrimary ? 60 : 40
        const maxDistance = isPrimary ? 140 : 100
        const distance = minDistance + Math.random() * (maxDistance - minDistance)
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const rotationRange = isPrimary ? 160 : 100
        const rotation = (Math.random() - 0.5) * rotationRange

        next[id] = { x, y, rotation }
      })

      return next
    })
  }

  const handleDotLeave = (dotId) => {
    const affectedIds = getNeighborDotIds(dotId, 2.5)

    setDotOffsets((prev) => {
      if (!affectedIds.some((id) => id in prev)) {
        return prev
      }

      const next = { ...prev }
      affectedIds.forEach((id) => {
        delete next[id]
      })
      return next
    })
  }

  return (
    <div className="animated-title">
      <div
        className="title-dots"
        onMouseLeave={() =>
          setDotOffsets((prev) => (Object.keys(prev).length ? {} : prev))
        }
      >
        {targetText.split('').map((char, charIndex) => (
          <div key={charIndex} className="char-dots">
            {getCharDots(char).map((row, rowIndex) => (
              <div key={rowIndex} className="dot-row">
                {row.map((dot, dotIndex) => {
                  const dotKey = `${charIndex}-${rowIndex}-${dotIndex}`

                  if (!dot) {
                    return <span key={dotKey} className="dot-space"></span>
                  }

                  const offset = dotOffsets[dotKey]
                  const animation = animationConfig[dotKey] || { delay: 0, duration: 2.5 }
                  const transform = offset
                    ? `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.rotation}deg)`
                    : 'translate3d(0px, 0px, 0) rotate(0deg)'

                  return (
                    <span
                      key={dotKey}
                      className={`dot${offset ? ' dot-flight' : ''}`}
                      style={{
                        transform,
                        '--dot-hue': `${((hueOffsets[dotKey] || 0) * 360).toFixed(2)}deg`
                      }}
                      onMouseEnter={() => handleDotEnter(dotKey)}
                      onMouseLeave={() => handleDotLeave(dotKey)}
                    >
                      <span
                        className="dot-inner"
                        style={{
                          animationDelay: `${animation.delay}s`,
                          animationDuration: `${animation.duration}s`
                        }}
                      >
                        {dotGlyph}
                      </span>
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// 优化的点阵字符映射 - 6-7列像素 (大写字母)
function getCharDots(char) {
  const charMap = {
    'E': [
      [1,1,1,1,1,1],
      [1,0,0,0,0,0],
      [1,0,0,0,0,0],
      [1,1,1,1,0,0],
      [1,0,0,0,0,0],
      [1,0,0,0,0,0],
      [1,1,1,1,1,1]
    ],
    'R': [
      [1,1,1,1,1,0,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [1,1,1,1,1,0,0],
      [1,0,0,1,0,0,0],
      [1,0,0,0,1,0,0],
      [1,0,0,0,0,1,0]
    ],
    'N': [
      [1,0,0,0,0,1,0],
      [1,1,0,0,0,1,0],
      [1,0,1,0,0,1,0],
      [1,0,0,1,0,1,0],
      [1,0,0,0,1,1,0],
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0]
    ],
    'Y': [
      [1,0,0,0,0,1,0],
      [1,0,0,0,0,1,0],
      [0,1,0,0,1,0,0],
      [0,0,1,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0]
    ],
    'X': [
      [1,0,0,0,0,1,0],
      [0,1,0,0,1,0,0],
      [0,0,1,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,1,0,0,0],
      [0,1,0,0,1,0,0],
      [1,0,0,0,0,1,0]
    ]
  }
  
  return charMap[char] || [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ]
}

export default AnimatedTitle
