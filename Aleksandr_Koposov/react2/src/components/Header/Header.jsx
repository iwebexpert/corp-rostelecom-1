import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import './Header.scss'

export class Header extends Component {

    render() {
        const { children } = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {children}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}


