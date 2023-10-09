import ReactDOM from 'react-dom/client'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'

import { GlobalStyle } from './style/GlobalStyle.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
)
