import { getBookResponse } from '../../../../store/selectors/Selectors'
import bookResponse from '../../../../mocks/responses/bookResponse'
import { render, screen } from '@testing-library/react'
import BookHeader from './BookHeader'
import routeData from 'react-router'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
}))
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(),
}))
jest.mock('../../../../store/selectors/Selectors', () => ({
  getBookResponse: jest.fn(),
}))
const getBookResponseMock = getBookResponse as jest.MockedFunction<
  typeof getBookResponse
>
const mockBookResponse = bookResponse.bookResponse

describe('Book Header testing for final confirmation', () => {
  const useLocation = jest.spyOn(routeData, 'useLocation')
  beforeEach(() => {
    getBookResponseMock.mockImplementation(() => {
      return mockBookResponse
    })
    useLocation.mockReturnValue({ pathname: '/finalConfirmation' } as any)
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })
  test('should load correctly for final confirmation', async () => {
    render(<BookHeader />)
    expect(screen.getByText('Customer Information')).toBeInTheDocument()
    expect(screen.getByText('Payment Information')).toBeInTheDocument()
    expect(screen.getByText('Booking is confirmed')).toBeInTheDocument()
  })
})
describe('Book Header testing for book confirmation', () => {
  const useLocation = jest.spyOn(routeData, 'useLocation')
  beforeEach(() => {
    getBookResponseMock.mockImplementation(() => {
      return mockBookResponse
    })
    useLocation.mockReturnValue({ pathname: '/bookConfirmation' } as any)
  })
  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })
  test('should load correctly for book confirmation', async () => {
    render(<BookHeader />)
  })
})
