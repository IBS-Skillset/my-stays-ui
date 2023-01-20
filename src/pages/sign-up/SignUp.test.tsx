import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SignUp from './SignUp'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const dispatch = jest.fn()
const navigate = jest.fn()
describe('SignUp Page testing', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should perform sign up action correctly', async () => {
    render(<SignUp />)
    expect(screen.getAllByRole('textbox')).toHaveLength(3)
    expect(screen.getAllByRole('spinbutton')).toHaveLength(1)
    const email = screen.getByPlaceholderText('Email Address')
    await userEvent.type(email, 'arjun@gmail.com')
    const firstName = screen.getByPlaceholderText('First Name')
    await userEvent.type(firstName, 'arjun')
    const lastName = screen.getByPlaceholderText('Last Name')
    await userEvent.type(lastName, 'test')
    const phoneNumber = screen.getByPlaceholderText('Phone Number')
    await userEvent.type(phoneNumber, '919293949596')
    const password = screen.getByPlaceholderText('Password')
    await userEvent.type(password, 'test')
    await userEvent.click(
      screen.getByRole('button', {
        name: /Continue/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/signin')
  })
  test('should render SignUp component correctly', () => {
    render(<SignUp />)
    expect(screen.getByText('Create an account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Continue/i,
      }),
    ).toBeInTheDocument()
  })
  test('should perform validations correctly', async () => {
    render(<SignUp />)
    await userEvent.click(
      screen.getByRole('button', {
        name: /Continue/i,
      }),
    )
    await screen.findByText('*Email is required')
    expect(screen.getByText('Please enter first name')).toBeInTheDocument()
    expect(screen.getByText('Please enter last name')).toBeInTheDocument()
    expect(screen.getByText('Phone number is required')).toBeInTheDocument()
    expect(screen.getByText('*Password is required')).toBeInTheDocument()
  })
  test('should show password with onclick functionality', async () => {
    render(<SignUp />)
    const password = screen.getByPlaceholderText('Password')
    const button = screen.getByRole('button', { name: '' })
    await userEvent.type(password, 'test')
    await userEvent.click(button)
    expect(password).toHaveAttribute('type', 'text')
    await fireEvent.keyDown(button)
    expect(password).toHaveAttribute('type', 'Password')
  })
  test('should properly handle incorrect email', async () => {
    render(<SignUp />)
    const email = screen.getByPlaceholderText('Email Address')
    await userEvent.type(email, 'arjun')
    await userEvent.click(
      screen.getByRole('button', {
        name: /Continue/i,
      }),
    )
    await screen.findByText('Invalid email')
  })
  test('should properly handle phone number validation', async () => {
    render(<SignUp />)
    const email = screen.getByPlaceholderText('Phone Number')
    await userEvent.type(email, '123')
    await userEvent.click(
      screen.getByRole('button', {
        name: /Continue/i,
      }),
    )
    await screen.findByText('Phone number must be 12 digits with country code')
  })
})
