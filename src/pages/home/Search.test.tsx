import { act, render, screen, waitFor } from '@testing-library/react'
import Search from './Search'
import { sleep } from '../../util/testUtils/TestUtils'
import { getAccessToken, getEmail } from '../../store/selectors/Selectors'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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
const getEmailMock = getEmail as jest.MockedFunction<typeof getEmail>
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const dispatch = jest.fn()
const navigate = jest.fn()
jest.setTimeout(10000)
describe('Home Page testing', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getEmailMock.mockReturnValue('test@gmail.com')
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render Search component correctly', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Search Hotels')).toBeInTheDocument()
    expect(
      screen.getByRole('form', {
        name: /Search Hotels/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(4)
    expect(screen.getAllByRole('textbox')).toHaveLength(3)
    expect(
      screen.getByRole('textbox', {
        name: /GOING TO/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: /CHECK IN/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: /CHECK IN/i,
      }),
    ).toHaveValue(format(new Date(), 'MM/dd/yyyy'))
    expect(
      screen.getByRole('textbox', {
        name: /CHECK OUT/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: /CHECK OUT/i,
      }),
    ).toHaveValue(
      format(new Date(+new Date() + 24 * 60 * 60 * 1000), 'MM/dd/yyyy'),
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /1 adult/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    ).toBeInTheDocument()
  })
  test('should select location correctly', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'par')
    await act(() => sleep(3000))
    expect(location).toHaveValue('par')
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
    expect(screen.getByText('Pari Chowk, NRI City')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Paris, France'))
    expect(location).toHaveValue('Paris, France')
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
  test('should select check in and checkout dates correctly', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    const checkInDate = screen.getByRole('textbox', {
      name: /CHECK IN/i,
    })
    await userEvent.click(checkInDate)
    await userEvent.click(screen.getByText('Next Month'))
    await userEvent.click(screen.getByText('10'))
    expect(checkInDate).toHaveValue(
      (new Date().getMonth() + 2).toString().padStart(2, '0') +
        '/10/' +
        new Date().getFullYear(),
    )
    const checkOutDate = screen.getByRole('textbox', {
      name: /CHECK OUT/i,
    })
    await userEvent.click(checkOutDate)
    await userEvent.click(screen.getByText('11'))
    await act(() => sleep(100))
    expect(checkOutDate).toHaveValue(
      (new Date().getMonth() + 2).toString().padStart(2, '0') +
        '/11/' +
        new Date().getFullYear(),
    )
  })
  test('should perform a hotel search correctly', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'par')
    await act(() => sleep(3000))
    await userEvent.click(screen.getByText('Paris, France'))
    expect(dispatch).toHaveBeenCalledTimes(2)
    await userEvent.click(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(5)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/search')
  })
  test('should perform location validation correctly', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    await userEvent.click(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(1)
    await waitFor(async () => {
      expect(screen.getByText('*Location is required')).toBeInTheDocument()
    })
  })
  test('should properly handle incorrect location', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'xxxyyyzzz')
    await act(() => sleep(3000))
    expect(location).toHaveValue('xxxyyyzzz')
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
  test('should properly handle autocomplete API failure', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'error')
    await act(() => sleep(3000))
    expect(location).toHaveValue('error')
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
  test('should properly handle placeId API failure', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'par_error')
    await act(() => sleep(3000))
    await userEvent.click(screen.getByText('Paris, France'))
    expect(dispatch).toHaveBeenCalledTimes(2)
    await userEvent.click(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(2)
    await waitFor(async () => {
      expect(screen.getByText('Search a Location')).toBeInTheDocument()
    })
  })
  test('should properly handle no hotel availability', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'no_availability')
    await act(() => sleep(3000))
    await userEvent.click(screen.getByText('Paris, France'))
    expect(dispatch).toHaveBeenCalledTimes(2)
    await userEvent.click(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(4)
    await waitFor(async () => {
      expect(
        screen.getByText(
          'No available hotels matching your request were found. Please amend your search criteria.',
        ),
      ).toBeInTheDocument()
    })
  })
  test('should properly handle hotel availability failure', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).toHaveBeenCalledTimes(1)
    const location = screen.getByRole('textbox', {
      name: /GOING TO/i,
    })
    await userEvent.type(location, 'avail_error')
    await act(() => sleep(3000))
    await userEvent.click(screen.getByText('Paris, France'))
    expect(dispatch).toHaveBeenCalledTimes(2)
    await userEvent.click(
      screen.getByRole('button', {
        name: /Search/i,
      }),
    )
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})
describe('Home Page testing Failure : User Details', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getEmailMock.mockReturnValue('')
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should failure user details fetch', async () => {
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).not.toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/signin')
  })
  test('should handle incorrect user details data from backend', async () => {
    getEmailMock.mockReturnValue('test@test.com')
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(<Search />)
    await act(() => sleep(3000))
    expect(dispatch).not.toHaveBeenCalled()
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
describe('Home Page testing Authorization', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('')
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should navigate to sign in page for new login', async () => {
    render(<Search />)
    expect(dispatch).toHaveBeenCalledTimes(4)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/signin')
  })
})
