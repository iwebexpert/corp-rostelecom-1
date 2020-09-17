import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


import Messenger from 'components/Messenger';


ReactDom.render(
    <div>
        <Messenger />
    </div>,
    document.getElementById('root'));



