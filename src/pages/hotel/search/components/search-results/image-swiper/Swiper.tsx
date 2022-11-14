import React, { useEffect, useRef, useState } from 'react'

import SwiperItem from './SwiperItem'

import './Swiper.css'
import { SwiperItemType } from './types'
import { getRefValue, useStateRef } from './hooks'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../../store/reducers/rootReducer'
import loader from '../../../../../../assets/images/loader.gif'

export type Props = {
  hotelCode: string
}

const MAX_IMAGES_DISPLAY = 6

function Swiper({ hotelCode }: Props) {
  const containerRef = useRef<HTMLUListElement>(null)
  const [offsetX, setOffsetX] = useStateRef(0)
  const [currentIdx, setCurrentIdx] = useState(0)
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
      itemsMedia.slice(0, MAX_IMAGES_DISPLAY).map((item: string) => {
        const image: SwiperItemType = {
          imageSrc: item,
        }
        items.push(image)
      })
    }

    setItems(items)
  }, [hotel])

  const indicatorOnClick = (idx: number) => {
    if (idx >= 0 && idx < MAX_IMAGES_DISPLAY) {
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
      <div
        className="previous arrow"
        onClick={() => indicatorOnClick(currentIdx - 1)}
        onKeyDown={() => indicatorOnClick(currentIdx - 1)}
        role="presentation"
      >
        &#8249;
      </div>
      {swiperIndicator}
      <div
        className="next arrow"
        onClick={() => indicatorOnClick(currentIdx + 1)}
        onKeyUp={() => indicatorOnClick(currentIdx + 1)}
        role="presentation"
      >
        &#8250;
      </div>
    </div>
  )
}

export default Swiper
