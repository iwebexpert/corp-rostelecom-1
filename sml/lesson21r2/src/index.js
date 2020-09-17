import React from 'react'
import ReactDom from 'react-dom'
import './styles/styles.css'

import { Messenger } from 'components/Messenger'


ReactDom.render(
    <div>
        <Messenger />
    </div>
    ,
    document.getElementById('root')
)