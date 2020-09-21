import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import './Header.css';

export class Header extends Component {
    render() {
        return (
            <Grid
                item xs={12}
                className="logo"
            >
                The messenger
            </Grid>
        );
    }
} 