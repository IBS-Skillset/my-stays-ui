import React from 'react'
import { IoIosCheckmark, IoIosDesktop, IoIosVolumeOff } from 'react-icons/io'
import { IoBed, IoBedOutline, IoCafe, IoWifiOutline } from 'react-icons/io5'
import './ModalPopup.scss'
import { RoomAvailabilityResponse } from '../../../../../models/hotel/roomavailability-models/roomAvailabilityResponse'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'

interface roomList {
    roomAvailabilityResponse: RoomAvailabilityResponse
    setShow: Function
    descItems: HotelDescriptionResponse
}

function ModalPopup({ roomAvailabilityResponse, setShow, descItems }: roomList) {
    

    let limit = descItems.services.service ? descItems.services.service.slice(0, 5) : []
    let service = <>{limit ? limit.map((service,index) => {
        return (
            <div key={Math.random()} className='flex'>
                <div className='flex items-center'> <IoIosCheckmark className='text-green-600 text-sm'></IoIosCheckmark><span className='modal-roomtype'>
                    {
                       service

                    }&nbsp;</span></div>
            </div>)
    }) : ""}</>



    return (
        <>
            <div className='modal-popup '>
                <div className=''>
                    <table className="modal-table bg-white rounded-lg ">
                        <thead className=' '>

                            <tr className='modal-header'>
                                <th className='w-40 rounded-tl-lg p-3 text-white modal-thead text-sm font-semibold tracking-wide '>Room Type</th>
                                <th className='w-28  p-3 text-white text-sm modal-thead1 font-semibold tracking-wide '>Todays Price</th>
                                <th className='w-32 rounded-tr-lg p-3 text-white modal-thead text-sm font-semibold tracking-wide '>
                                    <div className=''><span>Your choice</span></div></th>

                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                roomAvailabilityResponse.rateList.map((room, index) => {
                                    return (<>
                                        <tr className='border-b-2 border-gray-100 hover:border-blue-200'>
                                            <td className='p-3 text-sm text-gray-700 modal-roomtype '>
                                                <div className='flex-col text-sm justify-center p-2'>
                                                    <div className=''>
                                                        {room.available ? <><IoBed className='text-3xl'></IoBed>{room.available}&nbsp;{room.rateCategory}</> : ""}
                                                    </div>
                                                    <div className=''>
                                                        {service}

                                                    </div>
                                                </div>

                                            </td>
                                            <td className='p-3 text-sm text-gray-700 font-semibold'><div className='flex justify-center items-center'>{room.totalAmount}&nbsp;{room.currency}</div></td>
                                            <td className='p-3 text-sm flex-col  text-gray-700'>
                                                <div className='flex justify-center items-center'>{room.isBreakfastIncluded && room.breakFastDetails[0].breakfast !== "ROOM ONLY" ? <><IoCafe className='text-lg  text-green-600 '></IoCafe>
                                                    <span className=' text-green-600 '>Breakfast included</span></> : <span className='text-red-500'>Breakfast Excluded</span>}</div>

                                                <div className='flex justify-center'>{room.isCancellable ? <span className='flex '><li className='listdisc'>Refundable</li></span> : <span><li className='listdisc'>Not Refundable</li></span>}</div>



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
            <button onClick={() => { setShow(false) }} className="modal-close text-white hover:text-gray-300 hover:bg-red-700">&times;</button>
        </>
    )
}

export default ModalPopup