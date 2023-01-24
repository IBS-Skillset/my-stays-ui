import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Rendering footer component', () => {
  test('should render footer component correctly', () => {
    render(<Footer />)
    expect(
      screen.getByText('Copyright © 2023. All rights reserved.'),
    ).toBeInTheDocument()
    expect(screen.getByText('HappyStays')).toBeInTheDocument()
  })
})
