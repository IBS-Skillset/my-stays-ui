import renderer from 'react-test-renderer'
import SignIn from '../../../pages/sign-in/SignIn'
import {
  getAccessToken,
  getAutoFillEmail,
  getIsLoggedOut,
  getIsSessionOut,
} from '../../../store/selectors/Selectors'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const searchParams = { name: 'test' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams(searchParams)],
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))
jest.mock('../../../store/selectors/Selectors', () => ({
  getAccessToken: jest.fn(),
  getAutoFillEmail: jest.fn(),
  getIsLoggedOut: jest.fn(),
  getIsSessionOut: jest.fn(),
}))

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>

const getAutoFillEmailMock = getAutoFillEmail as jest.MockedFunction<
  typeof getAutoFillEmail
>
const getIsLoggedOutMock = getIsLoggedOut as jest.MockedFunction<
  typeof getIsLoggedOut
>

const getIsSessionOutMock = getIsSessionOut as jest.MockedFunction<
  typeof getIsSessionOut
>

beforeEach(() => {
  getAccessTokenMock.mockReturnValue('test')
  getAutoFillEmailMock.mockReturnValue('test@gmail')
  getIsLoggedOutMock.mockReturnValue(false)
  getIsSessionOutMock.mockReturnValue(false)
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('SignIn Page : <SignIn /> page', () => {
  test('renders correctly', () => {
    const component = renderer.create(<SignIn />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
