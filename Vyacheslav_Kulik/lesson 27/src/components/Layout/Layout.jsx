import React, {Component} from 'react'
import {Container, Grid} from '@material-ui/core'
import {MessengerContainer as Messenger} from 'containers/MessengerContainer.jsx'
import {ChatListContainer as ChatList} from 'containers/ChatListContainer.jsx'
import {NewChatPageContainer as NewChatPage} from 'containers/NewChatPageContainer.jsx'
import {ProfileContainer as Profile} from 'containers/ProfileContainer.jsx'
import {Header} from '../Header'
import {NonExistChat} from '../NonExistChat'
import {Switch, Route} from 'react-router-dom'
import {chats} from 'helpers/chats'
import moment from "moment";


import './Layout.scss'

export const Layout = () => {
    return (
        <Container className="layout">

            <Grid>
                <Header/>
            </Grid>
            <Grid container style={{height: '100%'}}>
                <Grid item xs={3}>
                    <ChatList/>
                </Grid>
                <Grid container item xs>
                    <Switch>
                        <Route path='/' component={NonExistChat} exact/>
                        <Route path='/chats/:id' component={Messenger} exact/>
                        <Route path='/new/chats' component={NewChatPage} exact/>
                        <Route path='/profile' exact component={Profile}/>
                    </Switch>
                </Grid>
            </Grid>

        </Container>

    )
}
//
// export class Layout extends Component {
//
//     render() {
//         return (
//             <Container className="layout">
//
//                 <Grid>
//                     <Header/>
//                 </Grid>
//                 <Grid container style={{height: '100%'}}>
//                     <Grid item xs={3}>
//                         <ChatList/>
//                     </Grid>
//                     <Grid container item xs>
//                         <Switch>
//                             <Route path='/' component={NonExistChat} exact/>
//                             <Route path='/chats/:id' component={Messenger} exact/>
//                             <Route path='/new/chats' component={NewChatPage} exact/>
//                             <Route path='/profile' exact component={Profile}/>
//                         </Switch>
//                     </Grid>
//                 </Grid>
//
//             </Container>
//
//         )
//
//     }
//
// }
