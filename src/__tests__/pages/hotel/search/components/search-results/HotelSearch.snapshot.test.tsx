import renderer from 'react-test-renderer'
import hotelAvailabilityResponse from '../../../../../../mocks/responses/hotelAvailabilityResponse'
import { HotelAvailabilityResponse } from '../../../../../../models/hotel/search-models/hotelAvailabilityResponse'
import HotelSearch from '../../../../../../pages/hotel/search/components/search-results/HotelSearch'
import {
  getAccessToken,
  getDays,
  getHotelAvailabilityResponse,
} from '../../../../../../store/selectors/Selectors'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))
const searchParams = { name: 'test' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useSearchParams: () => [new URLSearchParams(searchParams)],
}))
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}))

jest.mock('../../../../../../store/selectors/Selectors', () => ({
  getAccessToken: jest.fn(),
  getIsAuthorized: jest.fn(),
  getLocationState: jest.fn(),
  getHotelAvailabilityRequest: jest.fn(),
  getHotelAvailabilityResponse: jest.fn(),
  getDays: jest.fn(),
}))

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>
const getHotelAvailabilityResponseTokenMock =
  getHotelAvailabilityResponse as jest.MockedFunction<
    typeof getHotelAvailabilityResponse
  >
const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const mockHotelAvailRes: HotelAvailabilityResponse =
  hotelAvailabilityResponse.hotelAvailability

beforeEach(() => {
  getAccessTokenMock.mockReturnValue('test')
  getHotelAvailabilityResponseTokenMock.mockImplementation(() => {
    return mockHotelAvailRes
  })
  getDaysMock.mockReturnValue(1)
})

afterEach(() => {
  jest.clearAllMocks()
})
describe('SearchResults Page : <HotelSearch /> Screen', () => {
  test('renders correctly', () => {
    const component = renderer.create(<HotelSearch />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
