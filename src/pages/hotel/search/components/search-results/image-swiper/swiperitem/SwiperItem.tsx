import React, { useState } from 'react'
import './SwiperItem.css'
import { SwiperItemType } from './types'
import ImageNA from '../../../../../../../assets/images/Error.jpg'

export type Props = SwiperItemType

function SwiperItem({ imageSrc }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(imageSrc)
  const onError = () => setImgSrc(ImageNA)
  return (
    <li className="swiper-item">
      <img
        src={imgSrc}
        alt=""
        onError={onError}
        className="swiper-img"
        draggable={false}
      />
    </li>
  )
}

export default SwiperItem
