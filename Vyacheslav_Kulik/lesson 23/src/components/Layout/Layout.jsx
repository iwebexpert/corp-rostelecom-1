import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {Messenger} from '../Messenger'
import {Header} from '../Header'
import {ChatList} from '../ChatList'



import './Layout.scss'

export class Layout extends Component {

    state = {
        chats: null
    }

     getChats = (chats) => {
         this.setState({
            chats: chats
        })
    }

    render() {
        return (
            <Container className="layout">

                <Grid>
                    <Header/>
                </Grid>
                <Grid container style={{height: '100%'}}>
                        <Grid item xs={3}>
                            <ChatList chats={this.state.chats} />
                        </Grid>
                        <Grid item xs>
                            <Messenger getChats={this.getChats} />
                        </Grid>
                    </Grid>

            </Container>

            )

    }

}
