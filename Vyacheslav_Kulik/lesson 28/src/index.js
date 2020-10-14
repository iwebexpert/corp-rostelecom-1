import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {store, history, persistor} from './store'
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'
import {Layout} from 'components/Layout';


ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <Layout/>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    ,
    document.getElementById('root'));



