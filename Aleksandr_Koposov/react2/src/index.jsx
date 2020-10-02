import React from 'react'
import ReactDOM from 'react-dom'

import { Layout } from 'components/Layout'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'
import { initStore, history } from 'store'

const { store, persist } = initStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persist}>
      <ConnectedRouter history={history}>
        <Layout/>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
