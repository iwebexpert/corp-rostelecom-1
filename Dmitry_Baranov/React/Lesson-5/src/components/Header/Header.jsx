import React, {Component} from 'react';
import {Avatar, List, ListItemAvatar, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';

import './Header.css';
import {profile} from '../../helpers/profilesData';

export class Header extends Component {
    render() {
        return (
            <div>
                <h3 className="logo">The messenger</h3>
                <List className="profile">
                    <ListItemAvatar>
                        <Link to="/profile"><Avatar src="/broken-image.jpg"/></Link>
                    </ListItemAvatar>
                    <ListItemText primary={profile[0].name}/>
                </List>
            </div>
        );
    }
}
