import { IoCafe } from 'react-icons/io5'
import { RoomAvailabilityResponse } from '../../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import './RoomList.scss'
import React, { useEffect, useState } from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { rateAction } from '../../../../../../store/actions/hotelSearchAction'
import HotelRepriceService from '../../../../../../services/hotel/HotelRepriceService'
import { HotelAvailabilityRequest } from '../../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import { AxiosResponse } from 'axios'
import { HotelRepriceResponse } from '../../../../../../models/hotel/reprice-models/hotelRepriceResponse'
import { useNavigate } from 'react-router-dom'

export type Props = {
  roomAvailabilityResponse: React.SetStateAction<RoomAvailabilityResponse>
  hotelAvailabilityRequest: HotelAvailabilityRequest
}
function RoomList({
  roomAvailabilityResponse,
  hotelAvailabilityRequest,
}: Props) {
  const [roomAvailability, setRoomAvailability] =
    useState<RoomAvailabilityResponse>({
      responseStatus: { status: -1 },
      hotelCode: '',
      rateList: [],
    })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    setRoomAvailability(roomAvailabilityResponse)
  }, [roomAvailabilityResponse])

  const [select, setSelect] = useState(-1)

  const getRepriceResponse = () => {
    HotelRepriceService.getHotelRepriceInfo(
      roomAvailability.hotelCode,
      hotelAvailabilityRequest,
      roomAvailability.rateList[select].bookingCode,
    )
      .then((response: AxiosResponse<HotelRepriceResponse>) => {
        console.log('reprice response : ', response.data)
        dispatch(
          rateAction(
            response.data,
            roomAvailability.rateList[select].totalAmount,
            roomAvailability.rateList[select].amount,
          ),
        )
        navigate('/bookingConfirmation')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <h1 className="heading-select-room">Select your room</h1>
      <div className="room-list">
        <table className="modal-table bg-white">
          <thead className="table-header">
            <tr className="">
              <th className="w-40 text-white text-sm font-semibold tracking-wide border-white border-solid border-r heading-room">
                Room Type
              </th>
              <th className="w-28 p-3 text-white text-sm font-semibold tracking-wide border-white border-solid border-r">
                Todays Price
              </th>
              <th className="w-32 p-3 text-white modal-thead text-sm font-semibold tracking-wide border-solid border-r">
                <div className="flex justify-center">
                  <span>Your choice</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {roomAvailability.rateList.map((room, index) => {
              return (
                <tr
                  key={index}
                  className="border-b-2 border-gray-100 cursor-pointer selected"
                  style={{ backgroundColor: select === index ? '#BFDBFE' : '' }}
                  onClick={() => setSelect(index)}
                >
                  <td className="p-3 text-sm text-gray-700 roomtype ">
                    <div className="flex-col text-sm justify-center p-2">
                      <div className="">
                        {room.available ? <>{room.rateCategory}</> : ''}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 font-semibold">
                    <div className="flex justify-center items-center">
                      {'\u20AC'}&nbsp;{room.totalAmount}
                    </div>
                  </td>
                  <td className="p-3 text-sm flex-col text-gray-700">
                    <div className="flex">
                      {room.isBreakfastIncluded &&
                        room.breakFastDetails[0].breakfast !== 'ROOM ONLY' && (
                          <>
                            <IoCafe className="text-lg text-green-600 ml-2"></IoCafe>
                            <h1 className="text-green-600 ml-2">
                              Breakfast included
                            </h1>
                          </>
                        )}
                    </div>

                    <div className="flex ">
                      <IoIosCheckmark className="text-lg text-green-600 ml-2 mt-2"></IoIosCheckmark>
                      {room.iscancellable ? (
                        <h1 className="refund ml-2 mt-2">Refundable</h1>
                      ) : (
                        <h1 className="refund ml-2 mt-2">Non Refundable</h1>
                      )}
                    </div>
                    <div className="flex">
                      <IoIosCheckmark className="text-lg text-green-600 ml-2 mt-2"></IoIosCheckmark>
                      {room.available && (
                        <h1 className="refund ml-2 mt-2">
                          {room.available} room left
                        </h1>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="reserve">
          <div className="button-head"></div>
          <button className="reserve-button" onClick={getRepriceResponse}>
            Reserve
          </button>
        </div>
      </div>
    </>
  )
}

export default RoomList
