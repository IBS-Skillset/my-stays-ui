import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import mainImage from '../../../../../assets/images/27119008.webp'
import starSVG from '../../../../../assets/svg/star.svg'
import { HotelAvailabilityResponse } from '../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import './SearchResults.scss'
import './RoomList.scss'

import { Button, Modal } from 'react-bootstrap'
import data from './data.json'

type Data = typeof data

type SortKeys = keyof Data[0]

// type SortOrder = 'ascn' | 'desc'

interface SearchResult {
  hotelAvailabilityResponse: HotelAvailabilityResponse
  days: number | undefined
}

// function sortData({
//   tableData,
//   sortKey,
//   reverse,
// }: {
//   tableData: Data
//   sortKey: SortKeys
//   reverse: boolean
// }) {
//   if (!sortKey) return tableData
//
//   const sortedData = data.sort((a, b) => {
//     return a[sortKey] > b[sortKey] ? 1 : -1
//   })
//
//   if (reverse) {
//     return sortedData.reverse()
//   }
//
//   return sortedData
// }

export const SearchResults = ({
  hotelAvailabilityResponse,
  days,
}: SearchResult) => {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)

  // const [sortKey, setSortKey] = useState<SortKeys>('TotalAmount')
  // const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const headers: { key: SortKeys; label: string }[] = [
    { key: 'RoomTypeCode', label: 'RoomType' },
    { key: 'TotalAmount', label: "Today's Price" },
    { key: 'Amenities', label: 'Your Choices' },
  ]

  // const sortedData = useCallback(
  //   () => sortData({ tableData: data, sortKey, reverse: sortOrder === 'desc' }),
  //   [data, sortKey, sortOrder],
  // )

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
        {hotelAvailabilityResponse.hotelItem.map((hotel, i) => {
          return (
            <div className="hotel-container grid grid-cols-2 md:flex" key={i}>
              {/* col-1 image */}
              <div className="md:flex-none">
                <picture>
                  <img className="hotel-image" src={mainImage} alt="" />
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
                    className="btn-availability font-medium"
                    onClick={handleShow}
                  >
                    {t('HOTEL_SEARCH.BUTTON.AVAILABILITY')} &#62;
                  </button>
                  <Modal className="modal" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Rooms Available!
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                      <div className="container">
                        <div className="row">
                          <table className="rooms">
                            <thead>
                              <tr>
                                {headers.map((row) => {
                                  return (
                                    <th key={row.key}>
                                      {row.label}{' '}
                                      {/*<SortButton
                                                    columnKey={row.key}
                                                    onClick={() => changeSort(row.key)}
                                                    {...{
                                                        sortOrder,
                                                        sortKey,
                                                    }}
                                                />*/}
                                    </th>
                                  )
                                })}
                              </tr>
                            </thead>

                            <tbody>
                              {data.map((room) => {
                                return (
                                  <tr key={room.RoomTypeCode}>
                                    <td>{room.RoomTypeCode}</td>
                                    <td>{room.TotalAmount}</td>
                                    <td>{room.Amenities}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
