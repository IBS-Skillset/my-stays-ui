import React, { MouseEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mainImage from '../../../../../assets/images/download.webp'
import starSVG from '../../../../../assets/svg/star.svg'
import { Hotel } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import './SearchResults.scss'
import RoomAvailabilityService from '../../../../../services/hotel/RoomAvailabilityService'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { AxiosResponse } from 'axios'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import ModalPopup from './ModalPopup';
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'


interface SearchResult {
  hotelBackupItems: Hotel[]
  hotelDescriptionResponse: any
  hotelAvailabilityRequest: HotelAvailabilityRequest
  days: number | undefined
}

export const SearchResults = ({
  hotelBackupItems,
  hotelDescriptionResponse, hotelAvailabilityRequest,
  days,
}: SearchResult) => {
  const { t } = useTranslation()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const headers: { key: any; label: string }[] = [
    { key: "RoomTypeCode", label: "RoomType" },
    { key: "TotalAmount", label: "Today's Price" },
    { key: "Amenities", label: "Your Choices" },
  ];

  const [roomAvailabilityResponse, setRoomAvailabilityResponse] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
    const [descItems, setdescItems] = useState<HotelDescriptionResponse>({
      responseStatus: {status:-2},
      media: {mediaUrl: []},
      hotelItem: {
        address: {streetAddress: "",
          cityName: "",
          zipCode: "",
          countryName: ""},
    
        latitude: 0,
        longitude: 0
      },
        descriptions: {decription:[]},
        services: {service: []},
        safetyInfo: {safetyInfo: []}
     })


  const getRoomAvailResponse = async (code: string) => {
    await RoomAvailabilityService.getRoomAvailabilitySearch(
      code,
      hotelAvailabilityRequest,
      days
    )
      .then((response: AxiosResponse<RoomAvailabilityResponse>) => {
        setRoomAvailabilityResponse(response.data);
        handleShow()
        console.log(roomAvailabilityResponse)
      })
      .catch((error) => {
        console.log(error)
      })
    return roomAvailabilityResponse
  }

  const replaceImage = (error: any) => {
    error.target.src = mainImage
  }


  function handleClick(hotelCode: string) {
    //const roomItems = getRoomAvailResponse(hotelCode)
    getRoomAvailResponse(hotelCode)
    console.log('response : ', hotelDescriptionResponse.get(hotelCode))
    //const descItems = hotelDescriptionResponse.get(hotelCode)
    //const roomPlusDescItems = {...roomAvailabilityResponse, ...descItems}
    //console.log('CombinedItems: ',roomPlusDescItems)
    setdescItems(hotelDescriptionResponse.get(hotelCode))
    
  }

  return (
    <div className="my-5">
      {hotelBackupItems.map((hotel, i) => {
        return (
          <div className="hotel-container grid grid-cols-2 md:flex" key={i}>
            {/* col-1 image */}
            <div className="md:flex-none">
              <picture>
                <img
                  className="hotel-image"
                  src={mainImage}
                  onError={replaceImage}
                  alt=""
                />
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
      {

        roomAvailabilityResponse.responseStatus && show ? <ModalPopup descItems={descItems} setShow={setShow} roomAvailabilityResponse={roomAvailabilityResponse}></ModalPopup> : ""
      }
    </div>

  )
}

export default SearchResults
