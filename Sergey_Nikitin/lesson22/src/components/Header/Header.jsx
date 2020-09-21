import React, { Component } from 'react';
import { Grid } from '@material-ui/core';


import './Header.css';

export class Header extends Component {

    render() {
        const { text } = this.props;
        return (
            <Grid item xs={12} className="logo">
                {text}
            </Grid>
        );
    }
}