import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import mainImage from '../../../../../assets/images/download.webp'
import starSVG from '../../../../../assets/svg/star.svg'
import { HotelDetails } from '../../../../../models/hotel/description-models/hotelDescriptionModel'
import {
  Address,
  HotelDescriptionResponse,
} from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import { HotelAvailabilityResponse } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import HotelDescriptionService from '../../../../../services/hotel/HotelDescriptionService'
import './SearchResults.scss'

interface SearchResult {
  hotelAvailabilityResponse: HotelAvailabilityResponse
  days: number | undefined
}

export const SearchResults = ({
  hotelAvailabilityResponse,
  days,
}: SearchResult) => {
  const [hotelItems, setHotelItems] = useState<HotelDetails[]>([])
  const [hotelBackupItems, setHotelBackupItems] = useState<HotelDetails[]>([])
  const { t } = useTranslation()

  const updateHotelItem = (item: HotelDetails) => {
    setHotelItems((existingItems) => {
      return existingItems.map((hotel, j) => {
        const index = existingItems.findIndex(
          (i) => i.hotelCode === item.hotelCode,
        )
        return j === index ? item : hotel
      })
    })
  }

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

  const getHotelDescription = (hotelDescriptionDetails: HotelDetails) => {
    HotelDescriptionService.getHotelDescription(
      hotelDescriptionDetails.hotelCode,
    ).then((response: AxiosResponse<HotelDescriptionResponse>) => {
      if (typeof response.data.media != 'undefined') {
        const hotelAddress: Address = {
          streetAddress: response.data.hotelItem.address.streetAddress,
          cityName: response.data.hotelItem.address.cityName,
          zipCode: response.data.hotelItem.address.zipCode,
          countryName: response.data.hotelItem.address.countryName,
        }
        const hotelDetails: HotelDetails = {
          hotelCode: hotelDescriptionDetails.hotelCode,
          hotelCategory: hotelDescriptionDetails.hotelCategory,
          address: hotelAddress,
          latitude: hotelDescriptionDetails.latitude,
          longitude: hotelDescriptionDetails.longitude,
          minPrice: hotelDescriptionDetails.minPrice,
          currencyCode: hotelDescriptionDetails.currencyCode,
          breakfast: hotelDescriptionDetails.breakfast,
          mediaUrl: response.data.media.mediaUrl,
          descriptions: response.data.descriptions.description,
          services: response.data.services.services,
          safetyInfo: response.data.safetyInfo.safetyInfo,
          hotelName: hotelDescriptionDetails.hotelName,
          cityCode: hotelDescriptionDetails.cityCode,
        }
        updateHotelItem(hotelDetails)
      }
    })
  }

  const fetchHotels = async () => {
    const hotelDetailsList: HotelDetails[] = []
    const maxLimit =
      hotelItems.length == 0 ? hotelItems.length + 10 : hotelItems.length + 5
    hotelAvailabilityResponse.hotelItem
      .filter((h, i) => i >= hotelItems.length && i < maxLimit)
      .forEach((hotel) => {
        const hotelAddress: Address = {
          streetAddress: hotel.address.streetAddress,
          cityName: hotel.address.cityName,
          zipCode: hotel.address.zipCode,
          countryName: hotel.address.countryName,
        }
        const hotelDetails: HotelDetails = {
          hotelCode: hotel.hotelCode,
          hotelCategory: hotel.hotelCategory,
          address: hotelAddress,
          latitude: hotel.latitude,
          longitude: hotel.longitude,
          minPrice: hotel.minPrice,
          currencyCode: hotel.currencyCode,
          breakfast: hotel.breakfast,
          mediaUrl: [],
          descriptions: [],
          services: [],
          safetyInfo: [],
          hotelName: hotel.hotelName,
          cityCode: hotel.cityCode,
        }
        hotelDetailsList.push(hotelDetails)
      })
    setHotelItems(hotelItems.concat(hotelDetailsList))
    await hotelDetailsList.forEach(async (item) => {
      await getHotelDescription(item)
    })
  }

  useEffect(() => {
    if (hotelItems.length == 0) fetchHotels()
    else if (
      hotelAvailabilityResponse.hotelItem.length > 9 &&
      hotelItems.length == 10 &&
      hotelItems[0].mediaUrl.length > 0
    ) {
      setHotelBackupItems(hotelBackupItems.concat(hotelItems))
      fetchHotels()
    } else if (
      hotelAvailabilityResponse.hotelItem.length < 10 &&
      hotelItems[hotelAvailabilityResponse.hotelItem.length - 1].mediaUrl
        .length > 0
    ) {
      setHotelBackupItems(hotelBackupItems.concat(hotelItems))
    }
  }, [hotelItems])

  const displayMore = () => {
    updateBackupHotelItem()
    fetchMore()
  }

  const fetchMore = () => {
    if (hotelAvailabilityResponse.hotelItem.length - hotelItems.length > 0)
      fetchHotels()
  }

  const replaceImage = (error: any) => {
    error.target.src = mainImage
  }

  return (
    <div className="box-container mt-8">
      {hotelAvailabilityResponse.responseStatus.status != 1 && (
        <div className="text-2xl md:text-3xl font-medium">
          No properties found
        </div>
      )}
      {hotelAvailabilityResponse.hotelItem.length > 0 && (
        <div className="text-2xl md:text-3xl font-medium">
          {hotelAvailabilityResponse.hotelItem[0].address.cityName}:{' '}
          {hotelAvailabilityResponse.hotelItem.length} properties found
        </div>
      )}
      <div className="my-5">
        {hotelBackupItems.map((hotel, i) => {
          return (
            <div className="hotel-container grid grid-cols-2 md:flex" key={i}>
              {/* col-1 image */}
              <div className="md:flex-none">
                <picture>
                  <img
                    className="hotel-image"
                    src={hotel.mediaUrl.toString()}
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
                  <button className="btn-availability font-medium">
                    {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {hotelAvailabilityResponse.hotelItem.length !=
        hotelBackupItems.length && (
        <div>
          <button onClick={displayMore}>Load more</button>
        </div>
      )}
    </div>
  )
}
