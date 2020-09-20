import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {MessengerMUI} from '../MessengerMUI'
import {HeaderMUI} from '../HeaderMUI'
import {ChatListMUI} from '../ChatListMUI'



import './LayoutMUI.scss'

export class LayoutMUI extends Component {

    render() {

        return (
            <Container className="layout">

                <Grid>
                    <HeaderMUI/>
                </Grid>
                <Grid container style={{height: '100%'}}>
                        <Grid item xs={3}>
                            <ChatListMUI />
                        </Grid>
                        <Grid item xs>
                            <MessengerMUI />
                        </Grid>
                    </Grid>

            </Container>

            )

    }

}
