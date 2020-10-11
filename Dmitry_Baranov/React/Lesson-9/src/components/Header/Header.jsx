import React from 'react';
import {Avatar, ListItemAvatar} from '@material-ui/core';
import {Link} from 'react-router-dom';

import './Header.css';

export const Header = () => {

    return (
        <div className="logo">
            <div>The messenger</div>
            <ListItemAvatar>
                <Link to="/profile"><Avatar src="/broken-image.jpg"/></Link>
            </ListItemAvatar>
        </div>
    );
};