import {
  getAuthState,
  getCodeChallenge,
  getIsAuthorized,
  getVerifier,
} from '../../../../store/selectors/Selectors'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { act, render } from '@testing-library/react'
import AuthorizeUser from './AuthorizeUser'
import { sleep } from '../../../../util/testUtils/TestUtils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('../../../../store/selectors/Selectors')

const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>
const getAuthStateMock = getAuthState as jest.MockedFunction<
  typeof getAuthState
>
const getVerifierMock = getVerifier as jest.MockedFunction<typeof getVerifier>
const getIsAuthorizedMock = getIsAuthorized as jest.MockedFunction<
  typeof getIsAuthorized
>
const getCodeChallengeMock = getCodeChallenge as jest.MockedFunction<
  typeof getCodeChallenge
>
const dispatch = jest.fn()
const navigate = jest.fn()
const realWindow = { ...window.location }
describe('Authorize User testing', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch)
    useNavigateMock.mockReturnValue(navigate)
    getAuthStateMock.mockReturnValue('authState')
    getVerifierMock.mockReturnValue('verifier')
    getIsAuthorizedMock.mockReturnValue(true)
    getCodeChallengeMock.mockReturnValue('codeChallenge')
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://dummy.com',
      },
      writable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(window, 'location', { ...realWindow })
  })
  test('should call authorize API for user authentication', () => {
    render(
      <MemoryRouter initialEntries={['/authorized']}>
        <AuthorizeUser />
      </MemoryRouter>,
    )
    expect(window.location.href).toEqual(
      'http://localhost:9000/auth-server/oauth2/authorize?response_type=code&client_id=client&scope=openid&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2F' +
        'authorized&state=authState&code_challenge=codeChallenge&code_challenge_method=S256',
    )
  })
  test('should call token API for token generation', async () => {
    render(
      <MemoryRouter initialEntries={['/authorized?code=code&state=authState']}>
        <AuthorizeUser />
      </MemoryRouter>,
    )
    await act(() => sleep(500))
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/')
  })
  test('should handle token API failure', async () => {
    render(
      <MemoryRouter initialEntries={['/authorized?code=error&state=authState']}>
        <AuthorizeUser />
      </MemoryRouter>,
    )
    await act(() => sleep(500))
    expect(dispatch).not.toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/signin')
  })
})
