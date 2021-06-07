import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import registerServiceWorker from './serviceWorkerRegistration'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </HashRouter>
  </Provider>
  ,document.getElementById('root')
)

registerServiceWorker()
