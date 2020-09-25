import React, { Component } from 'react';
import { Link, AppBar, Toolbar, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './Header.css';

export class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="logo">
                        The messenger
                    </Typography>
                    <Typography variant="subtitle1" edge="end">
                        <Link href="/profile" color="inherit">Профиль</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}