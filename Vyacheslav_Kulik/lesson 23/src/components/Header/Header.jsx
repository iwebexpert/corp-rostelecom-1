import React, {Component} from 'react'
import {AppBar, Toolbar, Typography, Grid} from '@material-ui/core'
import './Header.scss'

export class Header extends Component {

    render() {

        return (
                    <Grid container direction="column" alignItems="center" className="header">
                        <Grid item>
                            <Typography >Bot</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>Online</Typography>
                        </Grid>
                    </Grid>
        )

    }

}
