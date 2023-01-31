import { act, render, screen } from '@testing-library/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  getAccessToken,
  getRefreshToken,
} from '../../../../store/selectors/Selectors'
import { sleep } from '../../../../util/testUtils/TestUtils'
import LogoutUser from './LogoutUser'
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(),
}))

jest.mock('react-idle-timer', () => ({
  ...jest.requireActual('react-idle-timer'),
  useIdleTimer: jest.fn(({ onMessage }) => {
    return { message: jest.fn((fn) => onMessage(fn)) }
  }),
}))

jest.mock('../../../../store/selectors/Selectors')
const getAccessTokenMock = getAccessToken as jest.MockedFunction<
  typeof getAccessToken
>
const getRefreshTokenMock = getRefreshToken as jest.MockedFunction<
  typeof getRefreshToken
>
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const dispatch = jest.fn()
const ref = React.createRef<HTMLFormElement>()
window.HTMLFormElement.prototype.submit = () => {
  /**/
}
describe('Testing logout functionality', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getRefreshTokenMock.mockReturnValue('testing')
    useDispatchMock.mockReturnValue(dispatch)
    jest.spyOn(React, 'useRef').mockImplementation(() => ref)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render logout functionality correctly', async () => {
    render(<LogoutUser />)
    expect(screen.getByRole('button', { hidden: true })).toBeInTheDocument()
    await act(() => sleep(200))
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})
describe('Testing Session out functionality', () => {
  beforeEach(() => {
    getAccessTokenMock.mockReturnValue('test')
    getRefreshTokenMock.mockReturnValue('')
    useDispatchMock.mockReturnValue(dispatch)
    jest.spyOn(React, 'useRef').mockImplementation(() => ref)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render session out functionality correctly', async () => {
    render(<LogoutUser />)
    expect(screen.getByRole('button', { hidden: true })).toBeInTheDocument()
    await act(() => sleep(200))
    expect(dispatch).toHaveBeenCalledTimes(2)
  })
})
