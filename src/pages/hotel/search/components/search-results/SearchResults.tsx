import { useTranslation } from 'react-i18next'
import mainImage from '../../../../../assets/images/download.webp'
import starSVG from '../../../../../assets/svg/star.svg'
import { Hotel } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import './SearchResults.scss'

interface SearchResult {
  hotelBackupItems: Hotel[]
  hotelDescriptionResponse: any
  days: number | undefined
}

export const SearchResults = ({
  hotelBackupItems,
  hotelDescriptionResponse,
  days,
}: SearchResult) => {
  const { t } = useTranslation()

  const replaceImage = (error: any) => {
    error.target.src = mainImage
  }

  function handleClick(hotelCode: string) {
    console.log('response : ', hotelDescriptionResponse.get(hotelCode))
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
    </div>
  )
}

export default SearchResults
