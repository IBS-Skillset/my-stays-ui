import React from 'react'
import mainImage from '../../../../../assets/images/27119008.webp'
import breakFastSVG from '../../../../../assets/svg/breakfast.svg'
import starSVG from '../../../../../assets/svg/star.svg'
import { HotelAvailabilityResponse } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'

import './SearchResults.scss'

interface SearchResult {
  hotelAvailabilityResponse: HotelAvailabilityResponse
}

export const SearchResults = ({ hotelAvailabilityResponse }: SearchResult) => {
  return (
    <div className="box-container mt-8">
      <div className="my-5">
        {hotelAvailabilityResponse.hotelItem.map((hotel, i) => {
          return (
            <div
              className="hotel-container grid grid-cols-2 md:grid-cols-4"
              key={i}
            >
              <div>
                <picture>
                  <img className="hotel-image" src={mainImage} alt="" />
                </picture>
              </div>
              <div className="col-span-1 md:col-span-2">
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
                    <div className="grid grid-cols-2 font-medium text-sm text-blue-900 underline">
                      <div id="hotel-name">{hotel.address.countryName}</div>
                      <div id="hotel-city_name">{hotel.address.cityName}</div>
                      <div id="hotel-street_address">
                        {hotel.address.streetAddress}
                      </div>
                      <div id="hotel-zip_code">{hotel.address.zipCode}</div>
                    </div>
                  </div>
                </div>
                <div>
                  {hotel.breakfast ? (
                    <div className="w-6 mb-auto">
                      <img src={breakFastSVG} alt="" />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 text-left md:text-right">
                <span className="text-xl font-bold text-gray-900">
                  €{hotel.minPrice}
                </span>
                <div className="text-left md:text-right">
                  <button className="btn-availability font-medium">
                    See availability &#62;
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
