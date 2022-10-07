import { render } from '@testing-library/react'
import { SearchResults } from './SearchResults'

const mockResponeStatus = {
  status: 200,
}

const mockAddress = {
  streetAddress: 'street',
  cityName: 'PAR',
  zipCode: 'FR',
  countryName: 'France',
}

const mockHotel = {
  hotelCode: 'HC1234',
  hotelName: 'hotel',
  hotelCategory: 12,
  address: mockAddress,
  cityCode: 'PAR',
  latitude: 49.0212,
  longitude: 2.12,
  minPrice: 345,
  currencyCode: 'EUR',
  breakfast: true,
}
const newMockHotel = {
  hotelCode: 'HC1234',
  hotelName: 'hotel',
  hotelCategory: 12,
  address: mockAddress,
  cityCode: 'PAR',
  latitude: 49.0212,
  longitude: 2.12,
  minPrice: 345,
  currencyCode: 'EUR',
  breakfast: false,
}
const mockHotelAvailabilityResponse = {
  responseStatus: mockResponeStatus,
  hotelItem: [mockHotel],
}

const newMockHotelAvailabilityResponse = {
  responseStatus: mockResponeStatus,
  hotelItem: [newMockHotel],
}

describe('testing hotel search results', () => {
  test('check hotel name is present', () => {
    render(
      <SearchResults
        hotelAvailabilityResponse={mockHotelAvailabilityResponse}
        days={2}
      />,
    )
    const hotelName = document.getElementById('hotel-name')
    expect(hotelName).toHaveTextContent(
      mockHotelAvailabilityResponse.hotelItem[0].hotelName,
    )
  })

  test('check breakfast is disabled', () => {
    render(
      <SearchResults
        hotelAvailabilityResponse={mockHotelAvailabilityResponse}
        days={2}
      />,
    )
    expect(mockHotelAvailabilityResponse.hotelItem[0].breakfast).toBeTruthy()
    render(
      <SearchResults
        hotelAvailabilityResponse={newMockHotelAvailabilityResponse}
        days={2}
      />,
    )
    expect(mockHotelAvailabilityResponse.hotelItem[0].breakfast).toBeTruthy()
  })
})
