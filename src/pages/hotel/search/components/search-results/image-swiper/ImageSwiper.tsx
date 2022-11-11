import { Navigation, Pagination, Scrollbar, A11y /*Controller*/ } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
/*import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";*/
import { /*LegacyRef,*/ useEffect, /*useRef,*/ useState } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../../store/reducers/rootReducer'
//import {SwiperItemType} from "./types";
//import { Swiper as SwiperCore } from 'swiper/types';
import './ImageSwiper.scss'

export type Props = {
  hotelCode: string
}
export const ImageSwiper = ({ hotelCode }: Props) => {
  //const [swiper, setSwiper] = useState<SwiperCore>()
  //const prevRef: LegacyRef<HTMLDivElement>  = useRef(null)
  //const nextRef: LegacyRef<HTMLDivElement> = useRef(null)
  const [images, setImages] = useState<Array<string>>([])

  const hotel = useSelector(
    (state: IRootState) =>
      state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
        hotelCode
      ],
  )

  /* useEffect(() => {
        if (swiper) {
            console.log("Swiper instance:", swiper);
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper])*/

  useEffect(() => {
    const items: Array<string> = []
    if (hotel) {
      const itemsMedia = hotel.media.mediaUrl
      itemsMedia.slice(0, 6).map((item: string) => {
        const image: string = item
        items.push(image)
      })
    }
    setImages(items)
  }, [hotel])

  return (
    <div className="App">
      <div className="carousel-container">
        {/*<div className="swiper-button" ref={prevRef}>
                    prev
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                    className="external-buttons"
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevRef?.current,
                        nextEl: nextRef?.current
                    }}
                    updateOnWindowResize
                    observer
                    observeParents
                    initialSlide={2}
                    onSwiper={setSwiper}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                height="200"
                                width="300"
                                alt="img"
                                className="image"
                                src={image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button" ref={nextRef}>
                    next
                </div>*/}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          className="external-buttons"
          spaceBetween={24}
          slidesPerView={1}
          navigation
          updateOnWindowResize
          observer
          observeParents
          initialSlide={1}
          loop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                height="20"
                width="30"
                alt="img"
                className="image"
                src={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
