import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import starSVG from '../../../../../../assets/svg/star.svg'
import {
  Hotel,
  HotelAvailabilityResponse,
} from '../../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import Swiper from '../image-swiper/Swiper'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HotelDescriptionResponse } from '../../../../../../models/hotel/description-models/hotelDescriptionResponse'
import HotelDescriptionService from '../../../../../../services/hotel/HotelDescriptionService'
import { hotelSearchDescriptionResponseAction } from '../../../../../../store/actions/hotelSearchAction'
import {
  getDays,
  getHotelAvailabilityResponse,
} from '../../../../../../store/selectors/Selectors'
import './SearchResults.scss'

function SearchResults() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [hotelItems, setHotelItems] = useState<Hotel[]>([])
  const [hotelBackupItems, setHotelBackupItems] = useState<Hotel[]>([])

  const days: number = useSelector(getDays)

  const hotelAvailabilityResponse: HotelAvailabilityResponse = useSelector(
    getHotelAvailabilityResponse,
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

  return (
    <div>
      {hotelAvailabilityResponse.responseStatus.status != 1 && (
        <div className="text-2xl md:text-3xl font-medium">
          No properties found
        </div>
      )}

      {hotelBackupItems.map((hotel, i) => {
        return (
          <div className="hotel-container grid grid-cols-2" key={i}>
            <div className="md:flex-none">
              <picture>
                <div className="hotel-image">
                  {<Swiper hotelCode={hotel.hotelCode} key={i} />}
                </div>
              </picture>
            </div>
            <div className="hotel-details">
              <div className="hotel-result-content">
                <h1 className="hotel-name">{hotel.hotelName}</h1>
                <h1>{hotel.address.cityName}</h1>
                <div className="grid pl-1 w-28 grid-cols-5">
                  {[...Array(hotel.hotelCategory)].map((category, number) => (
                    <span className="mt-2" key={number}>
                      <img className="w-4" src={starSVG} alt="♦" />
                    </span>
                  ))}
                </div>
                <div className="address">
                  <h1>{hotel.address.streetAddress}</h1>
                  <h1>{hotel.address.zipCode}</h1>
                  <h1>{hotel.address.countryName}</h1>
                </div>
              </div>
              <div className="">
                <div className="text-sm font-normal text-right">
                  {days} night
                </div>
                <div className="col-span-1 text-xl font-bold text-gray-900 text-right">
                  €{hotel.minPrice}
                </div>
                <div className="col-span-1 pt-2 text-right">
                  <Link
                    to={`/hotel/${hotel.hotelCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn-availability">
                      {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                    </button>
                  </Link>
                </div>
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
