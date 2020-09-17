import React from 'react';
import ReactDom from 'react-dom';

// import {App} from 'components/App';
// import {App2} from 'components/App2';

import { Messenger } from 'components/Messenger';


ReactDom.render(
    <div>

        <Messenger />
    </div>
    ,
    document.getElementById('root')
);