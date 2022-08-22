import { Location as LocationSVG } from '../../../../assets/svg/location'
import { Calendar as CalendarSVG } from '../../../../assets/svg/calendar'
import DateRangePicker from '../../../../common/datePicker/DateRangePicker'
import './HotelSearch.scss'
import HotelSearchService from '../../../../services/hotel/HotelSearchService'
import React, { useEffect, useState } from 'react'
import locationList from '../../../../util/locations.json'

import { Range } from 'react-date-range'
import format from 'date-fns/format'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { GeoLocation } from '../../../../models/locations/geoLocation'
import { HotelAvailabilityResponse } from '../../../../models/hotel/search-models/hotelAvailabilityResponse'
import { AxiosResponse } from 'axios'
import { SearchResults } from './search-results/SearchResults'

function HotelSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [geolocations, setGeolocations] = useState<GeoLocation[]>([])
  const [hotelAvailabilityResponse, setHotelAvailabilityResponse] =
    useState<HotelAvailabilityResponse>()

  const [hotelAvailabilityRequest, setHotelAvailabilityRequest] =
    useState<HotelAvailabilityRequest>({
      latitude: '',
      longitude: '',
      checkInDate: '',
      checkOutDate: '',
    })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length > 2 && !searchTerm.includes('Location:')) {
        setGeolocations(searchGeoLocations(searchTerm))
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  const getHotelAvailability = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    console.log(hotelAvailabilityRequest)
    HotelSearchService.getHotelAvailabilitySearch(hotelAvailabilityRequest)
      .then((response: AxiosResponse<HotelAvailabilityResponse>) => {
        //Todo
        setHotelAvailabilityResponse(response.data)
        console.log(response)
      })
      .catch((error) => {
        //Todo
        console.log(error)
      })
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeolocations([])
    setSearchTerm(event.target.value)
  }

  const handleLocationCahange = (geoLoaction: GeoLocation) => {
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      latitude: geoLoaction.latitude,
      longitude: geoLoaction.longitude,
    })
    setSearchTerm('Location: ' + geoLoaction.description)
    setGeolocations([])
  }

  const readDateChange = (dateRange: Range) => {
    if (typeof dateRange === 'undefined') {
      return
    }
    if (
      typeof dateRange.startDate === 'undefined' ||
      typeof dateRange.endDate === 'undefined'
    ) {
      return
    }
    setHotelAvailabilityRequest({
      ...hotelAvailabilityRequest,
      checkInDate: format(dateRange.startDate, 'yyyyMMdd'),
      checkOutDate: format(dateRange.endDate, 'yyyyMMdd'),
    })

    console.log(hotelAvailabilityRequest)
  }

  return (
    <>
      <div className="main-panel">
        <div className="front-header">
          <div className="box-container text-container h-full">
            {/* <div className="main-text">Find your next stay</div>
            <div className="text-2xl font-light text-white">
              Search low prices on hotels, homes and much more...
            </div> */}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="box-container search-panel">
          <div className="search-container w-full">
            <div className="col-span-2 outline outline-none h-full">
              <div className="flex justify-around h-full">
                <div className="h-full">
                  <LocationSVG />
                </div>
                <input
                  onChange={handleSearch}
                  value={searchTerm}
                  className="h-full w-full outline-none pl-3"
                  placeholder="Search"
                  type="text"
                />
                <div
                  className="absolute z-50 p-6 max-w-sm grid bg-white rounded-sm border border-gray-200 shadow-md dark:bg-slate-50 dark:border-gray-400"
                  style={{
                    display: geolocations.length > 0 ? 'block' : 'none',
                  }}
                >
                  {geolocations.map((geoLoaction) => {
                    return (
                      <div
                        className="location-items"
                        onClickCapture={() =>
                          handleLocationCahange(geoLoaction)
                        }
                        id={geoLoaction.location}
                        key={geoLoaction.location}
                      >
                        {geoLoaction.description}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="h-full w-full flex flex-row">
              <DateRangePicker
                handleDateChange={readDateChange}
              ></DateRangePicker>
              <div className="calenderIcon">
                <CalendarSVG />
              </div>
            </div>
            <div className="h-full search-action">
              <button onClick={getHotelAvailability} className="search-button">
                Search
              </button>
            </div>
          </div>
        </div>
        {typeof hotelAvailabilityResponse != 'undefined' &&
        typeof hotelAvailabilityResponse.hotelItem != 'undefined' &&
        hotelAvailabilityResponse.hotelItem.length > 0 ? (
          <SearchResults
            hotelAvailabilityResponse={hotelAvailabilityResponse}
          ></SearchResults>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default HotelSearch
function searchGeoLocations(searchTerm: string): GeoLocation[] {
  let geolocations: GeoLocation[] = locationList
  geolocations = geolocations.filter((element) => {
    if (element.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return element
    }
  })

  return geolocations
}
