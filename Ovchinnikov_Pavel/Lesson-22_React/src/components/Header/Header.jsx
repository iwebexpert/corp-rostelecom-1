import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";

export class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Container maxWidth="md">
                    <Toolbar>
                        <Typography variant="h6">
                            MyChat (Material UI)
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}
