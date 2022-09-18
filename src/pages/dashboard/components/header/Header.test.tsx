import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  test('Header click event', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )
    const image = document.getElementsByClassName(
      'flex justify-between items-center mr-7 ',
    )[0]
    expect(image).toBeTruthy()
  })

  test('displaying navbar on mobile screen', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )
    const element = screen.getByRole('presentation')
    fireEvent.click(element)
    fireEvent.click(element)
    expect(element).toBeTruthy()
  })
})
