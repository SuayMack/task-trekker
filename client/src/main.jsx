import ReactDOM from 'react-dom/client'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { GlobalStyle } from './style/GlobalStyle.js'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <GlobalStyle />
    <App />
    </PersistGate>
  </Provider>,
)
