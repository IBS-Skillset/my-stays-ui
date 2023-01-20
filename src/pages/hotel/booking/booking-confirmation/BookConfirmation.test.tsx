import {
  getHotelAvailabilityRequest,
  getHotelDescriptionResponses,
  getInitialRoomPrice,
  getNightlyPrice,
  getRepriceResponse,
  getUserDetails,
  getDays,
} from '../../../../store/selectors/Selectors'
import { render, screen } from '@testing-library/react'
import { HotelAvailabilityRequest } from '../../../../models/hotel/search-models/hotelAvailabilityRequest'
import hotelDescription from '../../../../mocks/responses/hotelDescriptionResponse'
import { HotelRepriceResponse } from '../../../../models/hotel/reprice-models/hotelRepriceResponse'
import userDetails from '../../../../mocks/responses/userDetailsResponse'
import { HotelDescriptionResponse } from '../../../../models/hotel/description-models/hotelDescriptionResponse'
import { UserDetails } from '../../../../models/user-model/userDetails'
import hotelAvailabilityRequest from '../../../../mocks/request/hotelAvailabilityRequest'
import rateRule from '../../../../mocks/responses/rateRuleResponse'
import BookConfirmation from './BookConfirmation'
import userEvent from '@testing-library/user-event'
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
jest.mock('../../../../store/selectors/Selectors', () => ({
  getHotelAvailabilityRequest: jest.fn(),
  getHotelDescriptionResponses: jest.fn(),
  getInitialRoomPrice: jest.fn(),
  getNightlyPrice: jest.fn(),
  getRepriceResponse: jest.fn(),
  getUserDetails: jest.fn(),
  getDays: jest.fn(),
}))

const getHotelAvailabilityRequestMock =
  getHotelAvailabilityRequest as jest.MockedFunction<
    typeof getHotelAvailabilityRequest
  >
const getHotelDescriptionResponsesMock =
  getHotelDescriptionResponses as jest.MockedFunction<
    typeof getHotelDescriptionResponses
  >
const getInitialRoomPriceMock = getInitialRoomPrice as jest.MockedFunction<
  typeof getInitialRoomPrice
>
const getNightlyPriceMock = getNightlyPrice as jest.MockedFunction<
  typeof getNightlyPrice
>
const getRepriceResponseMock = getRepriceResponse as jest.MockedFunction<
  typeof getRepriceResponse
>
const getUserDetailsMock = getUserDetails as jest.MockedFunction<
  typeof getUserDetails
>
const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const mockAvailReq: HotelAvailabilityRequest =
  hotelAvailabilityRequest.hotelAvailabilityRequest
const mockDescRs = hotelDescription.hotelDescription
const mockRepriceRs: HotelRepriceResponse = rateRule.rateRule
const mockUserDetails: UserDetails = userDetails.userDetails

const mockHotelDescriptionRes: Record<string, HotelDescriptionResponse> = {
  '26322': mockDescRs,
}
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const dispatch = jest.fn()
const navigate = jest.fn()

describe('Book confirmation Page testing', () => {
  beforeEach(() => {
    getHotelAvailabilityRequestMock.mockImplementation(() => {
      return mockAvailReq
    })
    getRepriceResponseMock.mockImplementation(() => {
      return mockRepriceRs
    })
    getUserDetailsMock.mockImplementation(() => {
      return mockUserDetails
    })
    getHotelDescriptionResponsesMock.mockImplementation(() => {
      return mockHotelDescriptionRes
    })
    getInitialRoomPriceMock.mockReturnValue(50)
    getNightlyPriceMock.mockReturnValue(150)
    getDaysMock.mockReturnValue(2)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should load correctly', async () => {
    render(<BookConfirmation />)
    expect(
      screen.getByRole('form', {
        name: /book-confirm/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Your booking details/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Sat Feb 11 2023')).toBeInTheDocument()
    expect(screen.getByText('Sun Feb 12 2023')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Total length of stay :/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('2 Nights')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /€50/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /How much it will cost to cancel?/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Until Monday, December 19, 2022 23:59 : no fee'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('From Tuesday, December 20, 2022 00:00 : 20.00 €'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /IBIS/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('181 rue de Vaugirard 75015 Paris'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /France/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Enter your details/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('TestFirstName')).toBeInTheDocument()
    expect(screen.getByText('TestLastName')).toBeInTheDocument()
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('911234567891')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /BOOK NOW!/i }),
    ).toBeInTheDocument()
    const name = screen.getByRole('textbox', {
      name: /name/i,
    })
    await userEvent.type(name, 'rose')
    const number = screen.getByRole('textbox', {
      name: /number/i,
    })
    await userEvent.type(number, '4111111111111111')
    const date = screen.getByRole('textbox', {
      name: /date/i,
    })
    await userEvent.type(date, '09/26')
    const cvv = screen.getByRole('textbox', {
      name: /cvv/i,
    })
    await userEvent.type(cvv, '123')
    await userEvent.click(
      screen.getByRole('button', {
        name: /BOOK NOW/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/finalConfirmation')
    expect(screen.getAllByRole('img')).toHaveLength(12)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })
  test('should validate mandatory fields', async () => {
    render(<BookConfirmation />)
    await userEvent.click(
      screen.getByRole('button', {
        name: /BOOK NOW/i,
      }),
    )
    await screen.findByText('Card holder name is required')
    expect(screen.getByText('Expiry date is required')).toBeInTheDocument()
    expect(screen.getByText('Card number is required')).toBeInTheDocument()
    expect(screen.getByText('CVC is required')).toBeInTheDocument()
  })
  test('should validate fields', async () => {
    render(<BookConfirmation />)
    const number = screen.getByRole('textbox', {
      name: /number/i,
    })
    await userEvent.type(number, '41111')
    const date = screen.getByRole('textbox', {
      name: /date/i,
    })
    await userEvent.type(date, '90/26')
    const cvv = screen.getByRole('textbox', {
      name: /cvv/i,
    })
    await userEvent.type(cvv, '12')
    await userEvent.click(
      screen.getByRole('button', {
        name: /BOOK NOW/i,
      }),
    )
    await screen.findByText('Invalid card number')
    await screen.findByText('Invalid expiry date')
    await screen.findByText('CVC must be at least 3 characters')
  })
})
describe('Book confirmation Page testing with tolerance', () => {
  beforeEach(() => {
    getHotelAvailabilityRequestMock.mockImplementation(() => {
      return mockAvailReq
    })
    getRepriceResponseMock.mockImplementation(() => {
      return mockRepriceRs
    })
    getUserDetailsMock.mockImplementation(() => {
      return mockUserDetails
    })
    getHotelDescriptionResponsesMock.mockImplementation(() => {
      return mockHotelDescriptionRes
    })
    getInitialRoomPriceMock.mockReturnValue(10)
    getNightlyPriceMock.mockReturnValue(150)
    getDaysMock.mockReturnValue(2)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should load with a price change', async () => {
    render(<BookConfirmation />)
    expect(
      screen.getByText(
        'A price change is noticed from the selected price. Please confirm to book using the new price.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /price-change/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(13)
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
})
