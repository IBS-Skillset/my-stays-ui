import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAccessToken,
  getIsAuthorized,
} from '../../store/selectors/Selectors'
import MyTrips from './MyTrips'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
  useNavigate: jest.fn(),
}))
jest.mock('../../store/selectors/Selectors')

jest.mock('../../setup/oauth2/components/authorize/AuthorizeUser', () => {
  return function DummyAuthorizeUser() {
    const navigate = useNavigate()
    useEffect(() => {
      navigate('/signin')
    })
    return <></>
  }
})

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>
const getIsAuthorizedMock = getIsAuthorized as jest.MockedFunction<
  typeof getIsAuthorized
>
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const dispatch = jest.fn()
const navigate = jest.fn()

describe('My Trips Page Success scenario testing', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getIsAuthorizedMock.mockReturnValue(true)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render mytrips page successfully', () => {
    render(<MyTrips />)
    expect(
      screen.getByRole('button', {
        name: /Check-in date/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Booking date/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Cancelled/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Completed/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Upcoming/i,
      }),
    ).toBeInTheDocument()
  })
  test('should perform actions on different tabs on mytrips page successfully', async () => {
    render(<MyTrips />)
    expect(
      screen.getByRole('img', {
        name: /loading.../i,
      }),
    ).toBeInTheDocument()
    await userEvent.click(
      screen.getByRole('button', {
        name: /Completed/i,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /Booking ID - 12345678/i,
      }),
    ).toBeInTheDocument()
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    await userEvent.click(
      screen.getByRole('button', {
        name: /Upcoming/i,
      }),
    )
    expect(
      screen.getByRole('heading', {
        name: /Booking ID - 987654321/i,
      }),
    ).toBeInTheDocument()
  })
})
describe('My trips page testing Authorization', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('')
    getIsAuthorizedMock.mockReturnValue(false)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should navigate to sign in page for new login', () => {
    render(<MyTrips />)
    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/signin')
  })
})
