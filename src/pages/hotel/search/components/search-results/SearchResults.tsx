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

interface SearchResult {
  hotelBackupItems: Hotel[]
  hotelDescriptionResponse: any
  hotelAvailabilityRequest: HotelAvailabilityRequest
  days: number
}

export const SearchResults = ({
  hotelBackupItems,
  hotelDescriptionResponse,
  hotelAvailabilityRequest,
  days,
}: SearchResult) => {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const [roomAvailabilityResponse, setRoomAvailabilityResponse] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
  const [descItems, setdescItems] = useState<HotelDescriptionResponse>({
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
    console.log('response : ', hotelDescriptionResponse.get(hotelCode))
    setdescItems(hotelDescriptionResponse.get(hotelCode))
  }

  const images = (hotelDescription: any, hotelCode: string) => {
    const responsedesc = hotelDescription.get(hotelCode)
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
    <div className="my-5">
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
                      hotelDescriptionResponse={hotelDescriptionResponse}
                      key={i}
                    />
                  }
                </div>
              </picture>
            </div>
            {/* col-2 hotel */}
            <div className="md:grow">
              <div className="flex items-center m-2 text-3xs md:text-2xl">
                <div className="grid grid-cols-1">
                  <div id="hotel-name" className="font-medium flex">
                    {hotel.hotelName}
                  </div>
                  <div className="grid pl-1 w-28 grid-cols-5">
                    {[...Array(hotel.hotelCategory)].map((e, i) => (
                      <span className="stars" key={i}>
                        <img className="w-6" src={starSVG} alt="♦" />
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 font-medium text-sm text-blue-900 underline">
                    <div id="hotel-city">
                      {hotel.address.cityName} , {hotel.address.countryName}
                    </div>
                    <div id="hotel-address">
                      {hotel.address.streetAddress}
                      <br />
                      {hotel.address.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* col-3 price and button */}
            <div className="col-span-2 md:flex-none md:w-52 text-left md:text-right">
              <div className="text-sm font-normal text-right md:text-center">
                {days} night
              </div>
              <div className="col-span-1 text-xl font-bold text-gray-900">
                €{hotel.minPrice}
              </div>
              <div className="col-span-1 pt-2 text-left md:text-right">
                <button
                  onClick={() => handleClick(hotel.hotelCode)}
                  className="btn-availability font-medium"
                >
                  {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                </button>
              </div>
            </div>
          </div>
        )
      })}
      {roomAvailabilityResponse.responseStatus && show ? (
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
