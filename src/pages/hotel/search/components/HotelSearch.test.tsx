import { render } from '@testing-library/react'
import HotelSearch from './HotelSearch'

describe('Hotel search', () => {
  test('<HotelSearch/>', () => {
    render(<HotelSearch />)
    const locationInputBox = document.getElementsByClassName(
      'h-full w-full outline-none pl-3',
    )
    expect(locationInputBox).toBeTruthy()
  })
})
