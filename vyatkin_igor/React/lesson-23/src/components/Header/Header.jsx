import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Button } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Switch, Route, Link } from 'react-router-dom';

import { ProfilePage } from '../../pages/Profile';

export class Header extends Component {

    render() {

        const handleClick = () => {
          const profile =  <Route path="/profile" component={ProfilePage} exact />
          console.log(profile)
        };

        return (
            <AppBar position="static">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography style={{ marginLeft: 300 }} variant="h6" noWrap>

                            <Grid container justify-content="space-between" spacing={10}>
                                <Grid item >
                                    Messenger
                                </Grid>
                                <Grid item>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                        <AccountCircle />Profile
                                     </Button>
                                </Grid>
                            </Grid>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>

        );
    }
}