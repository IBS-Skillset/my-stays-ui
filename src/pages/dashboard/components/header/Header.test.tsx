import { fireEvent, render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import i18nConf from '../../../../config/i18nConfig'
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

  test('select header test', () => {
    const { getByTestId, getAllByTestId } = render(
      <I18nextProvider i18n={i18nConf.i18next}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </I18nextProvider>,
    )
    fireEvent.change(getByTestId('select'), { target: { value: 'fr_fr' } })
    const options = getAllByTestId('select-option')
    expect(options[1]).toBeTruthy()
  })
})
