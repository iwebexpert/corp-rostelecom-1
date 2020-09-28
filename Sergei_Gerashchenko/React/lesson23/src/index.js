import React from 'react';
import ReactDom from 'react-dom';

import {Layout} from 'components/Layout';
import {BrowserRouter} from 'react-router-dom';

ReactDom.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>,
    document.getElementById('root')
);