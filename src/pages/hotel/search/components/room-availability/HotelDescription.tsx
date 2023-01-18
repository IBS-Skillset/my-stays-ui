import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import RoomAvailabilityService from '../../../../../services/hotel/RoomAvailabilityService'
import {
  getDays,
  getHotelAvailabilityRequest,
  getHotelDescriptionResponses,
} from '../../../../../store/selectors/Selectors'
import Hotel from './hotel/Hotel'

const HotelDescription = () => {
  const [, setRoomAvailabilityResponseAvailable] = useState(false)
  const [roomAvailabilityResponse, setRoomAvailabilityResponse] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
  const { hotelCode } = useParams()
  const hotelDescriptionResponses = useSelector(getHotelDescriptionResponses)
  let hotel: HotelDescriptionResponse | undefined
  if (hotelCode) {
    hotel = hotelDescriptionResponses[hotelCode]
  }

  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    getHotelAvailabilityRequest,
  )
  const days: number = useSelector(getDays)
  const getRoomAvailResponse = async (code: string) => {
    await RoomAvailabilityService.getRoomAvailabilitySearch(
      code,
      hotelAvailabilityRequest,
      days,
    )
      .then((response: AxiosResponse<RoomAvailabilityResponse>) => {
        setRoomAvailabilityResponse(response.data)
        console.log(roomAvailabilityResponse)
      })
      .catch((error) => {
        console.log(error)
      })
    return roomAvailabilityResponse
  }
  useEffect(() => {
    if (hotelCode && hotel && hotelAvailabilityRequest && days) {
      getRoomAvailResponse(hotelCode).then(() =>
        setRoomAvailabilityResponseAvailable(true),
      )
    }
  }, [hotelCode, hotelAvailabilityRequest, days])

  return (
    <>
      {hotel ? (
        <Hotel
          hotel={hotel}
          roomAvailabilityResponse={roomAvailabilityResponse}
          hotelAvailabilityRequest={hotelAvailabilityRequest}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default HotelDescription
