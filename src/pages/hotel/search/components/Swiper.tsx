import React, { useRef } from 'react'

import SwiperItem from './SwiperItem'

import './Swiper.css'
import { SwiperItemType } from './types'
import { getRefValue, useStateRef } from './hooks'

// exported so we can use later in tests
export type Props = {
  items: Array<SwiperItemType>
}

function Swiper({ items }: Props) {
  const containerRef = useRef<HTMLUListElement>(null)
  // const [isSwiping, setIsSwiping] = useState(false);
  const currentOffsetXRef = useRef(0)
  const minOffsetXRef = useRef(0)
  const containerWidthRef = useRef(0)
  const startXRef = useRef(0)
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const containerWidth = getRefValue(containerWidthRef)
    let newOffsetX = getRefValue(offsetXRef)
    newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth
    currentOffsetXRef.current = getRefValue(offsetXRef)
    startXRef.current = e.clientX
    //setIsSwiping(false);
    setOffsetX(newOffsetX)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    setOffsetX(newOffsetX)
  }

  const onMouseMove = (e: MouseEvent) => {
    const currentX = e.clientX
    const diff = getRefValue(startXRef) - currentX
    let newOffsetX = getRefValue(currentOffsetXRef) - diff
    const maxOffsetX = 0
    const minOffsetX = getRefValue(minOffsetXRef)
    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX
    }
    setOffsetX(newOffsetX)
  }

  const onMouseUp = () => {
    const containerEl = getRefValue(containerRef)
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth
    // setIsSwiping(true);
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('mousemove', onMouseMove)
  }

  return (
    <div
      className="swiper-container"
      onMouseDown={onMouseDown}
      role="presentation"
    >
      <ul
        ref={containerRef}
        className="swiper-list"
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default Swiper
