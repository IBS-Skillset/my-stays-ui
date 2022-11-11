import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import starSVG from '../../../../../assets/svg/star.svg'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { Hotel } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import RoomAvailabilityService from '../../../../../services/hotel/RoomAvailabilityService'
import ModalPopup from './ModalPopup'
import Swiper from './image-swiper/Swiper'
import { SwiperItemType } from './image-swiper/types'

import './SearchResults.scss'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../reducers/rootReducer'
//import {ImageSwiper} from "./image-swiper/ImageSwiper";

interface SearchResult {
  hotelBackupItems: Hotel[]
  days: number
}

export const SearchResults = ({ hotelBackupItems, days }: SearchResult) => {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [roomAvailabilityResponse, setRoomAvailabilityResponse] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
  const [descItems /*, setdescItems*/] = useState<HotelDescriptionResponse>({
    responseStatus: { status: -2 },
    media: { mediaUrl: [] },
    hotelItem: {
      address: {
        streetAddress: '',
        cityName: '',
        zipCode: '',
        countryName: '',
      },

      latitude: 0,
      longitude: 0,
    },
    descriptions: { decription: [] },
    services: { service: [] },
    safetyInfo: { safetyInfo: [] },
  })

  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )

  const getRoomAvailResponse = async (code: string) => {
    await RoomAvailabilityService.getRoomAvailabilitySearch(
      code,
      hotelAvailabilityRequest,
      days,
    )
      .then((response: AxiosResponse<RoomAvailabilityResponse>) => {
        setRoomAvailabilityResponse(response.data)
        handleShow()
        console.log(roomAvailabilityResponse)
      })
      .catch((error) => {
        console.log(error)
      })
    return roomAvailabilityResponse
  }

  function handleClick(hotelCode: string) {
    getRoomAvailResponse(hotelCode)
    /*const hotelDesc = useSelector((state:IRootState) => state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[hotelCode])
    console.log('response : ', descItems)
    if (hotelDesc) {
      setdescItems(hotelDesc)
    }*/
  }

  const images = (hotelDescription: any) => {
    const responsedesc = hotelDescription
    const items: Array<SwiperItemType> = []
    if (responsedesc) {
      console.log('response : ', responsedesc)
      const itemsMedia = responsedesc.media.mediaUrl
      console.log('response : ', itemsMedia)
      itemsMedia.slice(0, 6).map((item: string) => {
        const image: SwiperItemType = {
          imageSrc: item,
        }
        items.push(image)
      })
    }
    return items
  }

  return (
    <div>
      {hotelBackupItems.map((hotel, i) => {
        return (
          <div className="hotel-container grid grid-cols-2 md:flex" key={i}>
            {/* col-1 image */}
            <div className="md:flex-none">
              <picture>
                <div className="hotel-image">
                  {
                    <Swiper
                      images={images}
                      hotelCode={hotel.hotelCode}
                      key={i}
                    />
                    /*<ImageSwiper hotelCode={hotel.hotelCode} key={i}/>*/
                  }
                </div>
              </picture>
            </div>
            {/* col-2 hotel */}
            <div className="hotel-details">
              <h1 className="hotel-name">{hotel.hotelName}</h1>
              <h1 className="w-48">{hotel.address.cityName}</h1>
              <div className="grid pl-1 w-28 grid-cols-5">
                {[...Array(hotel.hotelCategory)].map((e, i) => (
                  <span className="mt-2" key={i}>
                    <img className="w-4" src={starSVG} alt="♦" />
                  </span>
                ))}
              </div>
              <div className="address">
                <h1 className="w-48">{hotel.address.countryName}</h1>
                <h1 className="w-48">{hotel.address.streetAddress}</h1>
                <h1 className="w-48">{hotel.address.zipCode}</h1>
              </div>
            </div>
            {/* col-3 price and button */}
            <div className="">
              <div className="text-sm font-normal text-right">{days} night</div>
              <div className="col-span-1 text-xl font-bold text-gray-900 text-right">
                €{hotel.minPrice}
              </div>
              <div className="col-span-1 pt-2 text-left md:text-right">
                <button
                  onClick={() => handleClick(hotel.hotelCode)}
                  className="btn-availability"
                >
                  {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                </button>
              </div>
            </div>
          </div>
        )
      })}
      {show ? (
        <ModalPopup
          descItems={descItems}
          setShow={setShow}
          roomAvailabilityResponse={roomAvailabilityResponse}
        ></ModalPopup>
      ) : (
        ''
      )}
    </div>
  )
}

export default SearchResults
