import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';

import './Header.css';
// import { Profile } from 'pages/Profile';
// import { profile } from '../../helpers/profileData';


export class Header extends Component {

    render() {
        const { profile } = this.props;
        return (

            <div className="header">
                <h3 className="logo">The messenger</h3>
                <Link to="/profile" ><Avatar src="https://avatars.mds.yandex.net/get-zen_doc/28532/pub_5968a9ca4ffd13f35c4fe669_5968aa7d8146c135aa12f621/scale_1200" />
                    Profile
                </Link>
            </div>

        );
    }
} 