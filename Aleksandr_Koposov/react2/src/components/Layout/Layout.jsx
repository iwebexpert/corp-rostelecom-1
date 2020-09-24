import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { Switch, Route, withRouter } from 'react-router-dom'

import { Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { MessagesBlock } from 'components/MessagesBlock'
import { ChatsList } from 'components/ChatsList'
import { Header } from 'components/Header'
import { Profile } from 'components/Profile'

import './Layout.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7700ff'
        },
        secondary: {
            main: '#ff4f12'
        }
    }
})

class MainLayout extends Component {
    state = {
        init: false,
        user: {
            id: nanoid(),
            name: 'Иванов Иван',
            age: 37,
            about: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam repellat officia odio reiciendis delectus, vero dicta a, sapiente consequatur suscipit, expedita nostrum pariatur perspiciatis repellendus.',
            avatar: 'https://material-ui.com/static/images/avatar/1.jpg'
        },
        chats: [
            {
                id: 1,
                name: 'Chat 1',
                users: [1, 2, 3],
                messages: []
            },
            {
                id: 2,
                name: 'Chat 2',
                users: [1],
                messages: []
            },
            {
                id: 3,
                name: 'Chat 3',
                users: [1],
                messages: []
            }
        ],
        messages: [
            {
                id: nanoid(),
                text: 'Message 1.1',
                author: 'User 1'
            },
            {
                id: nanoid(),
                text: 'Message 1.2',
                author: 'bot'
            },
            {
                id: nanoid(),
                text: 'Message 1.3',
                author: 'User 1'
            },
            {
                id: nanoid(),
                text: 'Message 2.1',
                author: 'User 1'
            },
            {
                id: nanoid(),
                text: 'Message 2.2',
                author: 'User 1'
            }
        ]
    }

    componentDidMount() {
        if (this.state.init) {
            return
        }
        const messages = [
            {
                id: nanoid(),
                text: 'Message 1.1',
                author: this.state.user.id
            },
            {
                id: nanoid(),
                text: 'Message 1.2',
                author: 'bot'
            },
            {
                id: nanoid(),
                text: 'Message 1.3',
                author: this.state.user.id
            },
            {
                id: nanoid(),
                text: 'Message 2.1',
                author: this.state.user.id
            },
            {
                id: nanoid(),
                text: 'Message 2.2',
                author: this.state.user.id
            }
        ]
        this.setState({
            init: true,
            messages,
            chats: [
                {
                    id: 1,
                    name: 'Chat 1',
                    users: [1, 2, 3],
                    messages: messages.filter((i, index) => [0, 1, 2].includes(index)).map(i => i.id)
                },
                {
                    id: 2,
                    name: 'Chat 2',
                    users: [1],
                    messages: messages.filter((i, index) => [3, 4].includes(index)).map(i => i.id)
                },
                {
                    id: 3,
                    name: 'Chat 3',
                    users: [1],
                    messages: []
                }
            ]
        })
    }

    onChatAdd = (name) => {
        const charts = this.state.chats || []
        const id = charts.length + 1
        this.setState({
            chats: charts.concat({
                id,
                name,
                users: [1],
                messages: []
            })
        })
        if (!this.props.history) {
            return
        }
        this.props.history.push(`/chats/${id}`)
    }

    onMessageAdd = (chatId, message) => {
        const { chats, messages } = this.state
        const chat = chats.find(i => i.id === chatId) || null
        if (!chat) {
            return
        }
        chat.messages = chat.messages.concat([message.id])
        this.setState({
            chats,
            messages: messages.concat([message])
        })
    }

    onUserSave = (user) => {
        this.setState({
            user
        })
    }

    render() {
        const { chats, messages, user } = this.state
        return (
            <ThemeProvider theme={theme}>
                <Header>Мессенджер</Header>
                <Container maxWidth="xl" className="app__container">
                    <Grid container spacing={3}>
                        <Grid item xs={4} className="chats">
                            <Switch>
                                <Route
                                    path="/"
                                    render={(props) => <ChatsList
                                        chats={chats || []}
                                        messages={messages || []}
                                        onAdd={this.onChatAdd}
                                        {...props}
                                    />}
                                />
                            </Switch>
                        </Grid>
                        <Grid item xs={8} className="messages">
                            <Switch>
                                <Route path="/profile" exact>
                                    <Profile
                                        user={user}
                                        onSave={this.onUserSave}
                                    />
                                </Route>
                                <Route path="/" exact>
                                    <div>Выберите чат для просмотра сообщений.</div>
                                </Route>
                                <Route path="/chats" exact>
                                    <div>Выберите чат для просмотра сообщений.</div>
                                </Route>
                                <Route
                                    path="/chats/:id"
                                    exact
                                    render={(props) => <MessagesBlock
                                        chats={chats || []}
                                        messages={messages || []}
                                        user={user}
                                        onAdd={this.onMessageAdd}
                                        {...props}
                                    />}
                                />
                                <Route path="*">Страница не найдена.</Route>
                            </Switch>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        )
    }
}

export const Layout = withRouter(MainLayout)
