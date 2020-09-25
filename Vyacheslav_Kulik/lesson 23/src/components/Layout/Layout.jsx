import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {Messenger} from '../Messenger'
import {NewChatPage} from '../NewChatPage'
import {Profile} from '../Profile'
import {Header} from '../Header'
import {ChatList} from '../ChatList'
import {NonExistChat} from '../NonExistChat'
import {Switch, Route} from  'react-router-dom'
import {chats} from 'helpers/chats'
import moment from "moment";



import './Layout.scss'

export class Layout extends Component {

    state = {
        chats,
        profile: {
            author: 'Гость',
            age: ''
        }
    }


    getMessage = (chats) => {
        this.setState({
            chats: chats
        })

    }

    addChat = (title) => {
        this.setState({
            chats: [
                ...this.state.chats,
                {
                    id: this.state.chats.length + '',
                    title: title,
                    srcAvatar: 'src/img/bot.svg',
                    messages: [{
                        id: '0',
                        author: 'Bot',
                        time: moment(),
                        text: 'Привет, это новый чат!'
                    }]
                }
            ]

        })
    }

    getNewChatTitle =  (title) =>  {
        this.addChat(title)
    }

    getProfileData = (profile) => {
        this.setState({
            profile: profile
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
                        <Grid  container item xs>
                            <Switch>
                                <Route path='/'  component={NonExistChat} exact/>
                                <Route path='/chats/:id' exact render={routeProps  => (<Messenger author={this.state.profile.author} chats={this.state.chats} getMessage={this.getMessage} {...routeProps} />)} />
                                <Route path='/new/chats' exact render={()  => (<NewChatPage getNewChatTitle={this.getNewChatTitle}/>)} />
                                <Route path='/profile' exact render={()  => (<Profile profile={this.state.profile} getProfileData={this.getProfileData} />)} />
                            </Switch>
                        </Grid>
                    </Grid>

            </Container>

            )

    }

}
