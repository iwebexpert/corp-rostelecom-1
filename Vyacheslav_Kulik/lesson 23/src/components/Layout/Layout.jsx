import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {Messenger} from '../Messenger'
import {Header} from '../Header'
import {ChatList} from '../ChatList'



import './Layout.scss'

export class Layout extends Component {

    render() {

        return (
            <Container className="layout">

                <Grid>
                    <Header/>
                </Grid>
                <Grid container style={{height: '100%'}}>
                        <Grid item xs={3}>
                            <ChatList />
                        </Grid>
                        <Grid item xs>
                            <Messenger />
                        </Grid>
                    </Grid>

            </Container>

            )

    }

}
