import React from 'react'
import './SwiperItem.css'
import { SwiperItemType } from './types'

export type Props = SwiperItemType

function SwiperItem({ imageSrc }: Props) {
  return (
    <li className="swiper-item">
      <img src={imageSrc} alt="" className="swiper-img" draggable={false} />
    </li>
  )
}

export default SwiperItem
