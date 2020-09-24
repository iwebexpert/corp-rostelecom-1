import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export class Header extends Component {

    render() {
        return (
            <div className="menu">
                Messenger
                <div>
                    <Link to="/profile">Профиль</Link>
                </div>
            </div>
        );
    }
}