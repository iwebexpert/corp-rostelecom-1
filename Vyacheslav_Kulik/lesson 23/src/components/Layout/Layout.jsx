import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {Messenger} from '../Messenger'
import {NewChatPage} from '../NewChatPage'
import {Profile} from '../Profile'
import {Header} from '../Header'
import {ChatList} from '../ChatList'
import {Switch, Route} from  'react-router-dom'



import './Layout.scss'

export class Layout extends Component {

    state = {
        chats: null,
        titleNewChat: ''
    }

     getChats = (chats) => {
        //console.log('this', this.state.chats)

         this.setState({
            chats: chats
        })
    }

    getNewChatTitle =  (title) =>  {

        this.setState({
            titleNewChat: title
        })
    }

    componentWillUpdate() {
        //console.log(this.state.titleNewChat,'titleNewChat' )
        if(this.state.titleNewChat){
            this.setState({
                titleNewChat: ''
            })
        }

    }

    render() {
        //console.log(this.state.titleNewChat)
        return (
            <Container className="layout">

                <Grid>
                    <Header/>
                </Grid>
                <Grid container style={{height: '100%'}}>
                        <Grid item xs={3}>
                            <ChatList chats={this.state.chats} />
                        </Grid>
                        <Grid  container item xs>
                            <Switch>
                                <Route path='/' exact>
                                    <Messenger newChat={this.state.titleNewChat} getChats={this.getChats} />
                                </Route>
                                <Route path='/chats/:id' exact render={routeProps  => (<Messenger getChats={this.getChats} {...routeProps} />)} />
                                <Route path='/newchats' exact render={routeProps  => (<NewChatPage getNewChatTitle={this.getNewChatTitle}/>)} />
                                <Route path='/profile' exact component={Profile} />
                            </Switch>
                        </Grid>
                    </Grid>

            </Container>

            )

    }

}
