import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import i18nConf from './config/i18nConfig'
import CustomRouter from './setup/routes/CustomRouter'
import { store } from './store'
import './style.scss'
import history from './models/actionModels/history'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18nConf.i18next}>
      <Provider store={store}>
        <CustomRouter history={history}>
          <App />
        </CustomRouter>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
)
