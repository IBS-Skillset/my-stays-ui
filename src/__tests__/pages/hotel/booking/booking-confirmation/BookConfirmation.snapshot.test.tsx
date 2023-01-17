import renderer from 'react-test-renderer'
import {
  getHotelAvailabilityRequest,
  getHotelDescriptionResponses,
  getInitialRoomPrice,
  getNightlyPrice,
  getRepriceResponse,
  getUserDetails,
  getDays,
} from '../../../../../store/selectors/Selectors'
import { HotelAvailabilityRequest } from '../../../../../models/hotel/search-models/hotelAvailabilityRequest'
import hotelAvailabilityRequest from '../../../../../mocks/request/hotelAvailabilityRequest'
import { HotelDescriptionResponse } from '../../../../../models/hotel/description-models/hotelDescriptionResponse'
import hotelDescription from '../../../../../mocks/responses/hotelDescriptionResponse'
import { HotelRepriceResponse } from '../../../../../models/hotel/reprice-models/hotelRepriceResponse'
import rateRule from '../../../../../mocks/responses/rateRuleResponse'
import { UserDetails } from '../../../../../models/user-model/userDetails'
import userDetails from '../../../../../mocks/responses/userDetailsResponse'
import BookConfirmation from '../../../../../pages/hotel/booking/booking-confirmation/BookConfirmation'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
jest.mock('../../../../../store/selectors/Selectors', () => ({
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
  getInitialRoomPriceMock.mockReturnValue(100)
  getNightlyPriceMock.mockReturnValue(150)
  getDaysMock.mockReturnValue(2)
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('Booking Confirmation Page : <BookConfirmation /> page', () => {
  test('renders correctly', () => {
    const component = renderer.create(<BookConfirmation />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
