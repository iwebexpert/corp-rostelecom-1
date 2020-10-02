import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';


import './Header.css';

export class Header extends Component {
    render() {
        const { profile } = this.props.profile;
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="logo">
                        The messenger
                    </Typography>
                    <Typography variant="subtitle1" edge="end">
                        <Grid className="profile"
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Avatar alt="James Bond" src={profile.avatar} />
                            {(typeof profile['avatar'] !== "undefined") ?
                                <Link to={"/profile"} className="menu" >{`${profile.firstName} ${profile.lastName}`}</Link>
                                : <Link to={"/profile"} className="menu" >Профиль</Link>
                            }
                        </Grid>
                    </Typography>
                </Toolbar>
            </AppBar >
        );
    }
}