import React from 'react'
import { IoIosCheckmark, IoIosDesktop, IoIosVolumeOff } from 'react-icons/io'
import { IoBed, IoBedOutline, IoCafe, IoWifiOutline } from 'react-icons/io5'
import './ModalPopup.scss'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'

interface roomList {
    roomAvailabilityResponse: RoomAvailabilityResponse
    setShow: Function
}

function ModalPopup({ roomAvailabilityResponse, setShow }: roomList) {

    return (
        <>
            <div className='modal-popup '>
                <div className=''>
                    <table className="modal-table bg-white rounded-lg ">
                        <thead className=' '>

                            <tr className=''>
                                <th className='w-40 rounded-tl-lg p-3 text-white modal-thead text-sm font-semibold tracking-wide '>Room Type</th>
                                <th className='w-28  p-3 text-white text-sm modal-thead1 font-semibold tracking-wide '>Todays Price</th>
                                <th className='w-32 rounded-tr-lg p-3 text-white modal-thead text-sm font-semibold tracking-wide '>
                                    <div className='flex justify-between'><span>Your choice</span>
                                        <button onClick={() => { setShow(false) }} className='bg-red-500 sm:px-2 sm:py-1 px-1  rounded-sm text-xl 
                            cursor-pointer  shadow-black shadow-sm hover:bg-red-700 hover:shadow-md hover:shadow-black  border-red-800'>&times;</button>
                                    </div></th>

                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                roomAvailabilityResponse.rateList.map((room, index) => {
                                    return (<>
                                        <tr className='border-b-2 border-gray-100 hover:border-blue-200'>
                                            <td className='p-3 text-sm text-gray-700 modal-roomtype '>
                                                <div className='flex-col justify-center p-2'>
                                                    <IoBed className='text-3xl'></IoBed>
                                                    <span className='font-semibold flex-row '>{room.available ? <>{room.available}{room.rateCategory}
                                                        
                                                        <IoIosCheckmark className='text-green-600 text-lg'></IoIosCheckmark></> : ""}</span>
                                                </div>
                                                
                                            </td>
                                            <td className='p-3 text-sm text-gray-700 font-semibold'>{room.totalAmount}{room.currency}</td>
                                           <td className='p-3 text-sm flex-col text-gray-700'>
                                                <div>{room.isBreakfastIncluded && room.breakFastDetails[0].breakfast !== "ROOM ONLY" ? <><IoCafe className='text-lg mr-5 text-green-600 '></IoCafe>
                                                    <span className=' text-green-600 '>Breakfast included</span></> : <span className='text-red-500'>breakfast Excluded</span>}</div>
                                                
                                                {room.isCancellable ? <span className='text-green-500'><li className='listdisc'>Refundable</li></span> : <span><li className='listdisc'>Not Refundable</li></span>}

                                            </td>
                                        </tr >
                                    </>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-overlay"></div>
        </>
    )
}

export default ModalPopup