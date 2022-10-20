import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import {
  Hotel,
  HotelAvailabilityResponse,
} from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import HotelDescriptionService from '../../../../../services/hotel/HotelDescriptionService'
import './HotelAvailability.scss'
import SearchResults from './SearchResults'

interface HotelAvailabilityDetails {
  hotelAvailabilityResponse: HotelAvailabilityResponse
  days: number | undefined
}

export const HotelAvailability = ({
  hotelAvailabilityResponse,
  days,
}: HotelAvailabilityDetails) => {
  const [hotelItems, setHotelItems] = useState<Hotel[]>([])
  const [hotelBackupItems, setHotelBackupItems] = useState<Hotel[]>([])
  const [hotelDescriptionResponse, setHotelDescriptionResponse] = useState(
    new Map<string, HotelDescriptionResponse>(),
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

  const updateMap = (hotelcode: string, response: HotelDescriptionResponse) => {
    setHotelDescriptionResponse(
      hotelDescriptionResponse.set(hotelcode, response),
    )
  }
  const getHotelDescription = (hotelDescriptionDetails: Hotel) => {
    HotelDescriptionService.getHotelDescription(
      hotelDescriptionDetails.hotelCode,
    )
      .then(async (response: AxiosResponse<HotelDescriptionResponse>) => {
        if (
          typeof response.data != 'undefined' &&
          typeof response.data.media != 'undefined'
        ) {
          updateMap(hotelDescriptionDetails.hotelCode, response.data)
          console.log(response.data)
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
      <SearchResults
        hotelBackupItems={hotelBackupItems}
        hotelDescriptionResponse={hotelDescriptionResponse}
        days={days}
      ></SearchResults>

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

export default HotelAvailability