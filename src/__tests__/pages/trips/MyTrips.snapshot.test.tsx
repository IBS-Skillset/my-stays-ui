import renderer from 'react-test-renderer'
import {
  getAccessToken,
  getIsAuthorized,
} from '../../../store/selectors/Selectors'
import MyTrips from '../../../pages/trips/MyTrips'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useSelector: jest.fn((fn) => fn()),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
}))

jest.mock('../../../store/selectors/Selectors', () => ({
  getAccessToken: jest.fn(),
  getIsAuthorized: jest.fn(),
}))
jest.useFakeTimers()
jest.setSystemTime(new Date(2023, 0, 11))

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>

const getIsAuthorizedeMock = getIsAuthorized as jest.MockedFunction<
  typeof getIsAuthorized
>

beforeEach(() => {
  getAccessTokenMock.mockReturnValue('test')
  getIsAuthorizedeMock.mockReturnValue(true)
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('MyTrips Page Page : <MyTrips /> page', () => {
  test('renders correctly', () => {
    const component = renderer.create(<MyTrips />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
