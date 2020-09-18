import React from 'react';
import ReactDom from 'react-dom';
import { Messenger } from 'components/Messenger';
import "./index.css";


ReactDom.render(
    <div>
        <Messenger />
    </div>
    ,
    document.getElementById('root')
);