import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  getAccessToken,
  getEmail,
  getFirstName,
  getLastName,
} from '../../../../store/selectors/Selectors'
import { sleep } from '../../../../util/testUtils/TestUtils'
import Header from './Header'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: jest.fn(),
}))

jest.mock('i18next', () => ({
  changeLanguage: jest.fn(),
}))
jest.mock('../../../../store/selectors/Selectors')

const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>
const getEmailidMock = getEmail as jest.MockedFunction<typeof getEmail>
const getFirstNameMock = getFirstName as jest.MockedFunction<
  typeof getFirstName
>
const getLastNameMock = getLastName as jest.MockedFunction<typeof getLastName>

describe('Header Component Testing', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    )
    getEmailidMock.mockReturnValue('john@gmail.com')
    getFirstNameMock.mockReturnValue('John')
    getLastNameMock.mockReturnValue('Doe')
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render header component correctly', async () => {
    render(
      <Router>
        <Header />
      </Router>,
    )
    expect(screen.getByRole('option', { name: /English/i })).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /Français/i }),
    ).toBeInTheDocument()

    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, ['Français'])
    const fre_lan = screen.getByRole('option', { name: /Français/i })
    await act(() => sleep(1000))
    expect((fre_lan as HTMLOptionElement).selected).toBe(true)
  })
  test('should render profile dropdown correctly', async () => {
    render(
      <Router>
        <Header />
      </Router>,
    )
    await userEvent.click(
      screen.getByRole('button', {
        name: /John/i,
      }),
    )
    expect(screen.getByText('john@gmail.com')).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(screen.queryByText('john@gmail.com')).not.toBeInTheDocument()
  })
})
describe('Header Component Testing with no token', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('')
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should validate header component when token is empty', () => {
    render(
      <Router>
        <Header />
      </Router>,
    )
    expect(screen.queryByText('john@gmail.com')).not.toBeInTheDocument()
  })
})
