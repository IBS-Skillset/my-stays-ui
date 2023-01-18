import renderer from 'react-test-renderer'
import SignUp from '../../../pages/sign-up/SignUp'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('SignUp Page : <SignUp /> Screen', () => {
  test('renders correctly', () => {
    const component = renderer.create(<SignUp />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
