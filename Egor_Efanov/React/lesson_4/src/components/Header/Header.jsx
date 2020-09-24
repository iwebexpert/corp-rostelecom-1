import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Header.css';
import { Profile } from 'pages/Profile';

export class Header extends Component {
    render() {
        return (

            <div className="header">
                <h3 className="logo">The messenger</h3>
                <Link to="/profile" ><Avatar src="https://avatars.mds.yandex.net/get-zen_doc/28532/pub_5968a9ca4ffd13f35c4fe669_5968aa7d8146c135aa12f621/scale_1200" /></Link>
            </div>

        );
    }
} 