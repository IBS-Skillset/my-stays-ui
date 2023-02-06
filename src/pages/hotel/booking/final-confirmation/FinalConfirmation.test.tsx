import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import bookResponse from '../../../../mocks/responses/bookResponse'
import errorBookResponse from '../../../../mocks/responses/errorBookResponse'
import { BookResponse } from '../../../../models/hotel/book-models/bookResponse'
import { getBookResponse, getDays } from '../../../../store/selectors/Selectors'
import FinalConfirmation from './FinalConfirmation'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('../../../../store/selectors/Selectors')

const getDaysMock = getDays as jest.MockedFunction<typeof getDays>
const getBookResponseMock = getBookResponse as jest.MockedFunction<
  typeof getBookResponse
>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const navigate = jest.fn()
const bookResponseMock: BookResponse = bookResponse.bookResponse
const bookResponseErrorMock: BookResponse = errorBookResponse.bookResponseError

describe('Final Confirmation Page Success scenario testing', () => {
  beforeEach(() => {
    getBookResponseMock.mockImplementation(() => {
      return bookResponseMock
    })
    getDaysMock.mockReturnValue(1)
    useNavigateMock.mockReturnValue(navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render Final Confirmation page when booking is success', () => {
    render(<FinalConfirmation />)
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(
      screen.getByRole('heading', {
        name: /Your trip has been successfully booked. Thank you for your reservation./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /ibis/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /67890/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /CHECK-IN/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /CHECK-OUT/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /VIEW BOOKING/i,
      }),
    ).toBeInTheDocument()
  })
  test('should properly navigate to view booking page', async () => {
    render(<FinalConfirmation />)
    const button = screen.getByRole('button', {
      name: /VIEW BOOKING/i,
    })
    await userEvent.click(button)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/mytrips')
  })
})

describe('Final Confirmation Page Failure scenario testing', () => {
  beforeEach(() => {
    getBookResponseMock.mockImplementation(() => {
      return bookResponseErrorMock
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Final confirmation page when booking is failed', () => {
    render(<FinalConfirmation />)
    expect(screen.getAllByRole('img')).toHaveLength(1)
    expect(
      screen.getByRole('heading', {
        name: /Your booking has failed. Please try again./i,
      }),
    ).toBeInTheDocument()
  })
})
