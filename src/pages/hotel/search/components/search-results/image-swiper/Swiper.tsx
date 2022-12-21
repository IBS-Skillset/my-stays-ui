import React, { useEffect, useRef, useState } from 'react'

import SwiperItem from './swiperitem/SwiperItem'

import './Swiper.css'
import { SwiperItemType } from './swiperitem/types'
import { getRefValue, useStateRef } from './hooks'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../../store/reducers/rootReducer'
import loader from '../../../../../../assets/images/loader.gif'

export type Props = {
  hotelCode: string
}

function Swiper({ hotelCode }: Props) {
  const containerRef = useRef<HTMLUListElement>(null)
  const [offsetX, setOffsetX] = useStateRef(0)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [maxImages, setMaxImages] = useState(6)
  const [items, setItems] = useState<Array<SwiperItemType>>([])
  const hotel = useSelector(
    (state: IRootState) =>
      state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
        hotelCode
      ],
  )
  useEffect(() => {
    const items: Array<SwiperItemType> = []
    if (hotel) {
      const itemsMedia = hotel.media.mediaUrl
      itemsMedia.slice(0, maxImages).map((item: string) => {
        const image: SwiperItemType = {
          imageSrc: item,
        }
        items.push(image)
      })
    }

    setItems(items)
  }, [hotel])

  const indicatorOnClick = (idx: number) => {
    if (items.length < 6) {
      setMaxImages(items.length)
    }
    if (idx >= 0 && idx < maxImages) {
      const containerEl = getRefValue(containerRef)
      const containerWidth = containerEl.offsetWidth

      setCurrentIdx(idx)
      setOffsetX(-(containerWidth * idx))
    }
  }

  const swiperIndicator =
    Array.isArray(items) && items.length ? (
      <>
        <ul
          ref={containerRef}
          className="swiper-list"
          style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
        >
          {items.map((item, idx) => (
            <SwiperItem key={idx} {...item} />
          ))}
        </ul>
      </>
    ) : (
      <img src={loader} alt="loading..." />
    )

  return (
    <div className="swiper-container" role="presentation">
      {currentIdx !== 0 && (
        <div
          className="previous indicator"
          onClick={() => indicatorOnClick(currentIdx - 1)}
          onKeyDown={() => indicatorOnClick(currentIdx - 1)}
          role="presentation"
        >
          &#8249;
        </div>
      )}
      {swiperIndicator}
      {currentIdx !== maxImages - 1 && (
        <div
          className="next indicator"
          onClick={() => indicatorOnClick(currentIdx + 1)}
          onKeyUp={() => indicatorOnClick(currentIdx + 1)}
          role="presentation"
        >
          &#8250;
        </div>
      )}
    </div>
  )
}

export default Swiper
