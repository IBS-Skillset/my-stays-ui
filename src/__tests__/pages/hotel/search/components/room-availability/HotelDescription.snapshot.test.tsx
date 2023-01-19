import renderer from 'react-test-renderer'
import hotelDescriptionResponse from '../../../../../../mocks/responses/hotelDescriptionResponse'
import { HotelDescriptionResponse } from '../../../../../../models/hotel/description-models/hotelDescriptionResponse'
import HotelDescription from '../../../../../../pages/hotel/search/components/room-availability/HotelDescription'
import {
  getDays,
  getHotelDescriptionResponses,
} from '../../../../../../store/selectors/Selectors'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}))

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
  useParams: jest.fn().mockReturnValue({ hotelCode: '123456' }),
}))

jest.mock('../../../../../../store/selectors/Selectors', () => ({
  getLocationState: jest.fn(),
  getHotelAvailabilityRequest: jest.fn(),
  getHotelDescriptionResponses: jest.fn(),
  getDays: jest.fn(),
}))

const getHotelDescriptionResponseTokenMock =
  getHotelDescriptionResponses as jest.MockedFunction<
    typeof getHotelDescriptionResponses
  >
const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const mockHotelDescriptionRes: Record<string, HotelDescriptionResponse> = {
  '123456': hotelDescriptionResponse.hotelDescription,
}

beforeEach(() => {
  getHotelDescriptionResponseTokenMock.mockImplementation(() => {
    return mockHotelDescriptionRes
  })
  getDaysMock.mockReturnValue(1)
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2023, 0, 11))
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})
describe('RoomAvailability Page : <HotelDescription /> Screen', () => {
  test('renders correctly', () => {
    const component = renderer.create(<HotelDescription />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
