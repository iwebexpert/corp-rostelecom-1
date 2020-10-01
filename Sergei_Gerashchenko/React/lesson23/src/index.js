import React from 'react';
import ReactDom from 'react-dom';

import {Layout} from 'components/Layout';
import {BrowserRouter} from 'react-router-dom';
import {store} from './store';
import {Provider} from 'react-redux';


ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);