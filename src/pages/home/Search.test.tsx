import { act, render, screen } from '@testing-library/react'
import Search from './Search'
import { sleep } from '../../util/testUtils/TestUtils'
import { getAccessToken, getEmail } from '../../store/selectors/Selectors'
import { useDispatch } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
jest.mock('../../store/selectors/Selectors')

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>
const getEmailMock = getEmail as jest.MockedFunction<typeof getEmail>
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const dispatch = jest.fn()

describe('Home Page testing', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getEmailMock.mockReturnValue('test@gmail.com')
    useDispatchMock.mockReturnValue(dispatch)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Home Page loaded', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Search Hotels')).toBeInTheDocument()
  })
})
