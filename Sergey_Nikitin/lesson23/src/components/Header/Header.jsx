import React, { Component } from 'react';
import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';
import { Link, } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import FaceIcon from '@material-ui/icons/Face';


import './Header.css';

export class Header extends Component {

    render() {
        const { text } = this.props;
        return (
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="baseline"
                className="logo">
                <Grid item xs={3}>
                    {text}
                </Grid>
                <Grid item xs={3}>
                    <Link to={`/profile/`}>
                        <Grid container
                            direction="row"
                            justify="flex-end"
                            alignItems="baseline"
                        >
                            <Grid item>
                                <Avatar>
                                    <FaceIcon />
                                </Avatar></Grid>
                            <Grid item>
                                <p>Профиль</p></Grid>
                        </Grid>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}