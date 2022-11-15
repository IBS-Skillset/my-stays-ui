import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import starSVG from '../../../../../assets/svg/star.svg'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import {
  Hotel,
  HotelAvailabilityResponse,
} from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import RoomAvailabilityService from '../../../../../services/hotel/RoomAvailabilityService'
import Swiper from './image-swiper/Swiper'

import './SearchResults.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../../store/reducers/rootReducer'
import { useNavigate } from 'react-router-dom'
import {
  hotelCodeAction,
  hotelSearchDescriptionResponseAction,
  roomAvailabilityResponseAction,
} from '../../../../../store/actions/hotelSearchAction'
import { useEffect, useState } from 'react'
import HotelDescriptionService from '../../../../../services/hotel/HotelDescriptionService'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'

function SearchResults() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hotelItems, setHotelItems] = useState<Hotel[]>([])
  const [hotelBackupItems, setHotelBackupItems] = useState<Hotel[]>([])

  const days: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )

  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )

  const hotelAvailabilityResponse: HotelAvailabilityResponse = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityResponse.hotelAvailabilityResponse,
  )

  const updateBackupHotelItem = () => {
    if (hotelItems.length - hotelBackupItems.length >= 5) {
      setHotelBackupItems(
        hotelBackupItems.concat(
          hotelItems.slice(hotelItems.length - 5, hotelItems.length),
        ),
      )
    } else {
      setHotelBackupItems(
        hotelBackupItems.concat(
          hotelItems.slice(hotelBackupItems.length, hotelItems.length),
        ),
      )
    }
  }

  const getHotelDescription = (hotelDescriptionDetails: Hotel) => {
    HotelDescriptionService.getHotelDescription(
      hotelDescriptionDetails.hotelCode,
    )
      .then(async (response: AxiosResponse<HotelDescriptionResponse>) => {
        if (typeof response.data != 'undefined') {
          dispatch(
            hotelSearchDescriptionResponseAction(
              hotelDescriptionDetails.hotelCode,
              response.data,
            ),
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchHotels = () => {
    const hotelDetailsList: Hotel[] = []
    const maxLimit =
      hotelItems.length == 0 ? hotelItems.length + 10 : hotelItems.length + 5
    hotelAvailabilityResponse.hotelItem
      .filter((h, i) => i >= hotelItems.length && i < maxLimit)
      .forEach((hotel) => {
        hotelDetailsList.push(hotel)
      })
    setHotelItems(hotelItems.concat(hotelDetailsList))
    hotelDetailsList.forEach((item) => {
      getHotelDescription(item)
    })
  }

  useEffect(() => {
    if (hotelItems.length == 0) fetchHotels()
    else if (
      hotelAvailabilityResponse.hotelItem.length > 10 &&
      hotelItems.length == 10
    ) {
      setHotelBackupItems(hotelBackupItems.concat(hotelItems))
      fetchHotels()
    } else if (hotelItems.length <= 10) {
      setHotelBackupItems(hotelBackupItems.concat(hotelItems))
    }
  }, [hotelItems])

  useEffect(() => {
    if (hotelItems.length != 0) {
      setHotelBackupItems([])
      setHotelItems([])
    }
  }, [hotelAvailabilityResponse])

  const displayMore = () => {
    updateBackupHotelItem()
    fetchHotels()
  }

  const getRoomAvailResponse = async (code: string) => {
    await RoomAvailabilityService.getRoomAvailabilitySearch(
      code,
      hotelAvailabilityRequest,
      days,
    )
      .then((response: AxiosResponse<RoomAvailabilityResponse>) => {
        dispatch(roomAvailabilityResponseAction(response.data))
        dispatch(hotelCodeAction(code))
        navigate('/hotel')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {hotelAvailabilityResponse.responseStatus.status != 1 && (
        <div className="text-2xl md:text-3xl font-medium">
          No properties found
        </div>
      )}

      {hotelBackupItems.map((hotel, i) => {
        return (
          <div className="hotel-container grid grid-cols-2 md:flex" key={i}>
            <div className="md:flex-none">
              <picture>
                <div className="hotel-image">
                  {<Swiper hotelCode={hotel.hotelCode} key={i} />}
                </div>
              </picture>
            </div>
            <div className="hotel-details">
              <h1 className="hotel-name">{hotel.hotelName}</h1>
              <h1 className="w-48">{hotel.address.cityName}</h1>
              <div className="grid pl-1 w-28 grid-cols-5">
                {[...Array(hotel.hotelCategory)].map((category, number) => (
                  <span className="mt-2" key={number}>
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
            <div className="">
              <div className="text-sm font-normal text-right">{days} night</div>
              <div className="col-span-1 text-xl font-bold text-gray-900 text-right">
                €{hotel.minPrice}
              </div>
              <div className="col-span-1 pt-2 text-left md:text-right">
                <button
                  onClick={() => getRoomAvailResponse(hotel.hotelCode)}
                  className="btn-availability"
                >
                  {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                </button>
              </div>
            </div>
          </div>
        )
      })}

      {hotelAvailabilityResponse.hotelItem.length != hotelBackupItems.length &&
        hotelBackupItems.length != 0 && (
          <div className="load-more">
            <button className="btn-loadmore" onClick={displayMore}>
              Show more items
            </button>
          </div>
        )}
    </div>
  )
}

export default SearchResults
