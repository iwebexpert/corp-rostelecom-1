import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Header.css';
import { Profile } from 'pages/Profile';

export class Header extends Component {
    render() {
        return (

            <div >
                <h3 className="logo">The messenger</h3>
                <Link to="/profile" className="profile"><Avatar src="/broken-image.jpg" /></Link>
            </div>

        );
    }
}