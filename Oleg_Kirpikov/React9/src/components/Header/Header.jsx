import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = (props) => {
    const { loading, error, profile } = props.profile;
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
                        {loading ?
                            <CircularProgress value={100} color="secondary" /> :
                            error ?
                                <div></div> :
                                <Grid container direction="row">
                                    <Avatar alt="James Bond" src={profile.avatar} />
                                    {(typeof profile['avatar'] !== "undefined") ?
                                        <Link to={"/profile"} className="menu" >{`${profile.firstName} ${profile.lastName}`}</Link>
                                        : <Link to={"/profile"} className="menu" >Профиль</Link>
                                    }

                                </Grid>
                        }
                    </Grid>
                </Typography>
            </Toolbar>
        </AppBar >
    );

}
