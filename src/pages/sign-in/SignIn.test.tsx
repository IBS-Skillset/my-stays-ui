import {
  getAccessToken,
  getAutoFillEmail,
  getIsLoggedOut,
  getIsSessionOut,
} from '../../store/selectors/Selectors'
import { act, render, screen } from '@testing-library/react'
import SignIn from './SignIn'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { sleep } from '../../util/testUtils/TestUtils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

const searchParams = { name: 'test' }
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams(searchParams)],
  useNavigate: jest.fn(),
  Link: jest.fn(),
}))
jest.mock('../../store/selectors/Selectors', () => ({
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

const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const dispatch = jest.fn()

const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const navigate = jest.fn()
jest.setTimeout(10000)

describe('SignIn Page testing', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getAutoFillEmailMock.mockReturnValue('test@gmail.com')
    getIsLoggedOutMock.mockReturnValue(false)
    getIsSessionOutMock.mockReturnValue(false)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should properly load', async () => {
    render(<SignIn />)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(
      screen.getByText(
        'User successfully created. Enter the password to proceed',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /Sign in/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('form', { name: /sign-in/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@gmail.com')
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    const pass = screen.getByPlaceholderText('Password')
    await userEvent.type(pass, 'pass')
    expect(screen.getByPlaceholderText('Password')).toHaveValue('pass')
    expect(screen.getByLabelText('eye-icon')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Sign in/i,
      }),
    ).toBeInTheDocument()
    expect(navigate).toHaveBeenCalledTimes(6)
  })
  test('should show the password', async () => {
    render(<SignIn />)
    await act(() => sleep(3000))
    const pass = screen.getByPlaceholderText('Password')
    const eyeIcon = screen.getByLabelText('eye-icon')
    await userEvent.type(pass, '***')
    await userEvent.click(eyeIcon)
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(screen.getByLabelText('eye-icon-open')).toBeInTheDocument()
  })
})
describe('SignIn Page while logging out', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getAutoFillEmailMock.mockReturnValue('')
    getIsLoggedOutMock.mockReturnValue(true)
    getIsSessionOutMock.mockReturnValue(false)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should able to logout successfully', async () => {
    render(<SignIn />)
    await act(() => sleep(3000))
    expect(
      screen.getByText('User logout. Please Sign in again!'),
    ).toBeInTheDocument()
  })
})
describe('SignIn Page while session out', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getAutoFillEmailMock.mockReturnValue('test')
    getIsLoggedOutMock.mockReturnValue(false)
    getIsSessionOutMock.mockReturnValue(true)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should properly handle session out', async () => {
    render(<SignIn />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(
      screen.getByText('Session has expired. Please Sign in again!'),
    ).toBeInTheDocument()
  })
})
describe('SignIn Page with entered email, not auto populated', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getAutoFillEmailMock.mockReturnValue('')
    getIsLoggedOutMock.mockReturnValue(false)
    getIsSessionOutMock.mockReturnValue(false)
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should able to enter the email', async () => {
    render(<SignIn />)
    expect(dispatch).toHaveBeenCalledTimes(1)
    const mail = screen.getByPlaceholderText('Email')
    await userEvent.type(mail, 'mail@gmail.com')
    expect(screen.getByPlaceholderText('Email')).toHaveValue('mail@gmail.com')
    expect(screen.getByPlaceholderText('Password')).toHaveValue('')
    expect(screen.getAllByRole('textbox')).toHaveLength(1)
  })
})
