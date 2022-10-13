import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import './style.scss'
import i18nConf from './config/i18nConfig'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <I18nextProvider i18n={i18nConf.i18next}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </I18nextProvider>,
)
