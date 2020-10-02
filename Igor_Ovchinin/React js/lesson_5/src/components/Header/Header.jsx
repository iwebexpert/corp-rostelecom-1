import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <h3 className="logo">The messenger</h3>
                <Link to="/profile">Профиль</Link>
            </div>
        );
    }
}