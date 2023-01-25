import hotelDescriptionResponse from '../../../../../mocks/responses/hotelDescriptionResponse'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import HotelDescription from '../../../../../pages/hotel/search/components/room-availability/HotelDescription'
import {
  getDays,
  getHotelAvailabilityRequest,
  getHotelDescriptionResponses,
} from '../../../../../store/selectors/Selectors'
import hotelAvailabilityRequest from '../../../../../mocks/request/hotelAvailabilityRequest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { sleep } from '../../../../../util/testUtils/TestUtils'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn().mockReturnValue({ hotelCode: '26322' }),
}))

jest.mock('../../../../../store/selectors/Selectors', () => ({
  getLocationState: jest.fn(),
  getHotelAvailabilityRequest: jest.fn(),
  getHotelDescriptionResponses: jest.fn(),
  getDays: jest.fn(),
}))

const getHotelDescriptionResponseTokenMock =
  getHotelDescriptionResponses as jest.MockedFunction<
    typeof getHotelDescriptionResponses
  >
const getHotelAvailabilityRequestMock =
  getHotelAvailabilityRequest as jest.MockedFunction<
    typeof getHotelAvailabilityRequest
  >
const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>

const mockHotelDescriptionRes: Record<string, HotelDescriptionResponse> = {
  '26322': hotelDescriptionResponse.hotelDescription,
}
const mockHotelAvailReq = hotelAvailabilityRequest.hotelAvailabilityRequest
const navigate = jest.fn()
const dispatch = jest.fn()
beforeEach(() => {
  getHotelDescriptionResponseTokenMock.mockImplementation(() => {
    return mockHotelDescriptionRes
  })
  getHotelAvailabilityRequestMock.mockImplementation(() => {
    return mockHotelAvailReq
  })
  getDaysMock.mockReturnValue(1)
  useDispatchMock.mockReturnValue(navigate)
  useNavigateMock.mockReturnValue(dispatch)
  jest.spyOn(window, 'scroll').mockReturnValue()
})

afterEach(() => {
  jest.clearAllMocks()
})
jest.setTimeout(10000)

describe('RoomAvailability page testing', () => {
  test('room availability page should load correctly and select a fare', async () => {
    render(<HotelDescription />)
    expect(
      screen.getByRole('form', {
        name: /search-form/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(5)
    expect(screen.getAllByRole('presentation')).toHaveLength(8)
    expect(
      screen.getByRole('button', {
        name: /Overview/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Rooms/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /IBIS/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /181 rue de Vaugirard 75015 Paris/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Facilities/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Smoke-free property/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Elevator/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('row', {
        name: /Room Type Today's Price Your choice/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {
        name: /Room Type/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {
        name: /Today's Price/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', {
        name: /Your choice/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Reserve/i,
      }),
    ).toBeInTheDocument()
    await act(() => sleep(50))
    const select = screen.getByRole('cell', {
      name: /Breakfast included Refundable 1 room left/i,
    })
    await userEvent.click(select)
    const reserve = screen.getByRole('button', {
      name: /Reserve/i,
    })
    await userEvent.click(reserve)
    expect(screen.getAllByText('Breakfast included')).toHaveLength(2)
    expect(screen.getByText('Single bed')).toBeInTheDocument()
    expect(screen.getAllByText('Non Refundable')).toHaveLength(2)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith('/bookingConfirmation')
  })
  test('should show all image grid', async () => {
    render(<HotelDescription />)
    await act(() => sleep(100))
    expect(screen.getAllByRole('img')).toHaveLength(5)
    expect(screen.getAllByRole('presentation')).toHaveLength(8)
    const firstImage = screen.getByRole('presentation', {
      name: /first-image/i,
    })
    await userEvent.click(firstImage)
    expect(screen.getAllByRole('img')).toHaveLength(31)
    expect(
      screen.getByRole('button', {
        name: /close/i,
      }),
    ).toBeInTheDocument()
    const closeButton = screen.getByRole('button', {
      name: /close/i,
    })
    await userEvent.click(closeButton)
    expect(screen.getAllByRole('img')).toHaveLength(5)
    expect(
      screen.getByRole('presentation', {
        name: /more-photos/i,
      }),
    ).toBeInTheDocument()
    const morePhotos = screen.getByRole('presentation', {
      name: /more-photos/i,
    })
    await userEvent.click(morePhotos)
    expect(screen.getAllByRole('img')).toHaveLength(31)
    expect(
      screen.getByRole('button', {
        name: /close/i,
      }),
    ).toBeInTheDocument()
    const close = screen.getByRole('button', {
      name: /close/i,
    })
    await userEvent.click(close)
    expect(screen.getAllByRole('img')).toHaveLength(5)
    expect(screen.getAllByRole('presentation')).toHaveLength(8)
  })
  test('should able to navigate between overview and rooms', async () => {
    render(<HotelDescription />)
    await act(() => sleep(100))
    expect(
      screen.getByRole('button', {
        name: /Overview/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Rooms/i,
      }),
    ).toBeInTheDocument()
    const rooms = screen.getByRole('button', {
      name: /Rooms/i,
    })
    await userEvent.click(rooms)
    const overview = screen.getByRole('button', {
      name: /Overview/i,
    })
    await userEvent.click(overview)
    expect(screen.getAllByText('Breakfast included')).toHaveLength(2)
    expect(screen.getByText('Single bed')).toBeInTheDocument()
  })
})
describe('RoomAvailability page testing for reprice error', () => {
  test('should throw error from reprice', async () => {
    render(<HotelDescription />)
    await act(() => sleep(10))
    const select = screen.getByRole('cell', {
      name: /Breakfast included Non Refundable 2 room left/i,
    })
    await userEvent.click(select)
    const reserve = screen.getByRole('button', {
      name: /Reserve/i,
    })
    await userEvent.click(reserve)
    expect(screen.getByText('Single bed')).toBeInTheDocument()
  })
})
