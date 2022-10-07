import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios, { AxiosResponse } from 'axios'
import HotelSearch from './HotelSearch'

//jest.mock(...) is used to automatically mock the axios
jest.mock('axios')
// Create an object of type of mocked Axios.
const mockedAxios = axios as jest.Mocked<typeof axios>

const hotelAvailabilityResponse = {
  responseStatus: {
    status: 1,
  },
  hotelItem: [
    {
      hotelCode: '26330',
      hotelName: 'ibis Styles Paris Bercy',
      hotelCategory: 3,
      address: {
        streetAddress: '77 rue de bercy',
        cityName: 'Paris',
        zipCode: '75012',
        countryName: 'France',
      },
      cityCode: 'FRPAR',
      latitude: 48.8386,
      longitude: 2.3809,
      minPrice: 144.88,
      currencyCode: 'EUR',
      breakfast: true,
    },
  ],
}

const geoPlace = {
  place: [
    { description: 'Paris', placeId: 'placeID' },
    { description: 'Paris1', placeId: 'placeID1' },
  ],
}
const geoLocation = {
  latitude: '48.856614',
  longitude: '2.3522219',
}
const geoPlaces: AxiosResponse = {
  data: geoPlace,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}
const geoLocations: AxiosResponse = {
  data: geoLocation,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const hotelAvailabilityResponses: AxiosResponse = {
  data: hotelAvailabilityResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}
describe('Hotel search', () => {
  test('success scenario testing the hotel search with input params', async () => {
    mockedAxios.get.mockResolvedValueOnce(geoPlaces)
    const { getByTestId } = render(<HotelSearch />)
    const searchText = screen.getByRole('searchTerm')
    fireEvent.change(searchText, { target: { value: 'Par' } })
    await new Promise((r) => setTimeout(r, 3500))
    expect(axios.get).toHaveBeenCalled()

    const places = screen.getByTestId('placeID')
    mockedAxios.get.mockResolvedValueOnce(geoLocations)
    await fireEvent.click(places)
    expect(axios.get).toHaveBeenCalled()
    await new Promise((r) => setTimeout(r, 500))
    mockedAxios.post.mockResolvedValueOnce(hotelAvailabilityResponses)
    fireEvent.submit(getByTestId('form'))
  })

  test('failure scenario for testing the hotel search with input params', async () => {
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(geoPlaces)
    render(<HotelSearch />)
    const searchText = screen.getByRole('searchTerm')
    fireEvent.change(searchText, { target: { value: 'Par' } })
    await new Promise((r) => setTimeout(r, 4000))
    expect(axios.get).toHaveBeenCalled()
    const places = screen.getByTestId('placeID')
    mockedAxios.get.mockRejectedValueOnce(geoLocations)
    await fireEvent.click(places)
    expect(axios.get).toHaveBeenCalled()
  })
  test('form submission without search field', async () => {
    const { getByTestId } = render(<HotelSearch />)
    const searchText = screen.getByRole('searchTerm')
    fireEvent.change(searchText, { target: { value: 'P' } })
    fireEvent.submit(getByTestId('form'))
    await waitFor(() => {
      expect(screen.getByText('Search a Location')).toBeInTheDocument()
    })
  })

  test('fail to load hotels', async () => {
    mockedAxios.get.mockResolvedValueOnce(geoPlaces)
    const { getByTestId } = render(<HotelSearch />)
    const searchText = screen.getByRole('searchTerm')
    fireEvent.change(searchText, { target: { value: 'Par' } })
    await new Promise((r) => setTimeout(r, 3500))
    expect(axios.get).toHaveBeenCalled()

    const places = screen.getByTestId('placeID')
    mockedAxios.get.mockResolvedValueOnce(geoLocations)
    await fireEvent.click(places)
    expect(axios.get).toHaveBeenCalled()
    await new Promise((r) => setTimeout(r, 500))
    mockedAxios.post.mockRejectedValueOnce(hotelAvailabilityResponses)
    fireEvent.submit(getByTestId('form'))
  })
})
