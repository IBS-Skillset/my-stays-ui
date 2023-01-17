import renderer from 'react-test-renderer'
import FinalConfirmation from '../../../../../pages/hotel/booking/final-confirmation/FinalConfirmation'
import {
  getBookResponse,
  getDays,
} from '../../../../../pages/common/selectors/Selectors'
import bookResponse from '../../../../../mocks/responses/bookResponse'

import { BookResponse } from '../../../../../models/hotel/book-models/bookResponse'

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
jest.mock('../../../../../pages/common/selectors/Selectors', () => ({
  getBookResponse: jest.fn(),
  getDays: jest.fn(),
}))

const getBookResponseMock = getBookResponse as jest.MockedFunction<
  typeof getBookResponse
>
const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const mockBookRes: BookResponse = bookResponse.bookResponse

beforeEach(() => {
  getBookResponseMock.mockImplementation(() => {
    return mockBookRes
  })
  getDaysMock.mockReturnValue(1)
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('Final Confirmation Page : <FinalConfirmation /> page', () => {
  test('renders correctly', () => {
    const component = renderer.create(<FinalConfirmation />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
