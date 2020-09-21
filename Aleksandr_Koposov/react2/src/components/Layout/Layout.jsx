import React, { Component } from 'react'
import { Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { MessagesBlock } from 'components/MessagesBlock'
import { ChatsList } from 'components/ChatsList'
import { Header } from 'components/Header'

import './Layout.scss'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7700ff'
        }
    }
})

export class Layout extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Header>Мессенджер</Header>
                <Container maxWidth="xl" className="app__container">
                    <Grid container spacing={3}>
                        <Grid item xs={4} className="chats">
                            <ChatsList />
                        </Grid>
                        <Grid item xs={8} className="messages">
                            <MessagesBlock />
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        )
    }
}
