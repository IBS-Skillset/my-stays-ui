import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('Footer component testing', () => {
    render(<Footer />)
    const element = screen.getByText('Copyright © 2022. All rights reserved.')
    expect(element).toBeInTheDocument()
  })
})
