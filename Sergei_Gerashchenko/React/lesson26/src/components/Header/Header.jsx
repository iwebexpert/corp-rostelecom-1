import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './Hader.css';

export class Header extends Component {
    render(){
        return (
            <div><div className="logo">Messanger app</div>
            <div><Link to="/">Главная</Link></div>
            <div><Link to="/profile">Профиль</Link></div>
            </div>
        );
    }
}