import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../../store/reducers/rootReducer'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import RoomAvailabilityService from '../../../../../services/hotel/RoomAvailabilityService'
import { AxiosResponse } from 'axios'
import Hotel from './Hotel'

const HotelDescription = () => {
  const [, setRoomAvailabilityResponseAvailable] = useState(false)
  const [roomAvailabilityResponse, setRoomAvailabilityResponse] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
  const { hotelCode } = useParams()
  const hotel: HotelDescriptionResponse | undefined = useSelector(
    (state: IRootState) => {
      if (hotelCode) {
        return state.hotel.descriptionResponse.hotelDescriptionResponsesPerCode[
          hotelCode
        ]
      }
    },
  )
  const hotelAvailabilityRequest: HotelAvailabilityRequest = useSelector(
    (state: IRootState) =>
      state.hotel.availabilityRequest.hotelAvailabilityRequest,
  )
  const days: number = useSelector(
    (state: IRootState) => state.hotel.nightCount.days,
  )
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
        />
      ) : (
        ''
      )}
    </>
  )
}

export default HotelDescription
