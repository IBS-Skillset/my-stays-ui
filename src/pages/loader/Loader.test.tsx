import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('<Loader/>', () => {
  test('Loader testing', () => {
    render(<Loader />)
    const element = screen.getByText('Loading')
    expect(element).toBeInTheDocument()
  })
})
