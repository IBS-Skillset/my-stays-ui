import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Rendering loader component', () => {
  test('should render loader component correctly', () => {
    render(<Loader />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })
})
