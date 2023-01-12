import renderer from 'react-test-renderer'
import Search from '../../../pages/home/Search'
import { useSelector } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const mockedState = { state: { token: { accessToken: 'test' } } }
const useSelectorMock = useSelector as jest.MockedFunction<typeof useSelector>

beforeEach(() => {
  useSelectorMock(
    (
      callback: (arg0: { state: { token: { accessToken: string } } }) => any,
    ) => {
      return callback(mockedState)
    },
  )
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2023, 0, 11))
})

afterEach(() => {
  jest.clearAllMocks()
  jest.useRealTimers()
})

describe('Home Page : <Search /> Screen', () => {
  test('renders correctly', () => {
    const component = renderer.create(<Search />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
