import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NavBar } from './NavBar'

describe('testing Navbar component', () => {
  test('image to be loaded', () => {
    render(
      <BrowserRouter>
        <NavBar display="block" />
      </BrowserRouter>,
    )
    const image = document.getElementsByClassName('w-10')
    expect(image).toBeTruthy()
  })
})
