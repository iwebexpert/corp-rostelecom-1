import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { Grid, Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { MessageBlockContainer } from 'containers/MessageBlockContainer'
import { ChatsListContainer } from 'containers/ChatsListContainer'
import { ProfileContainer } from 'containers/ProfileContainer'
import { HeaderContainer } from 'containers/HeaderContainer'

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

const chatsRoutes = [
  '/',
  '/chats',
  '/chats/:id',
  '/profile'
]

class MainLayout extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <HeaderContainer>Мессенджер</HeaderContainer>
        <Container maxWidth="xl" className="app__container">
          <Grid container spacing={3}>
            <Grid item xs={4} className="chats">
              <Switch>
                {chatsRoutes.map(i => <Route
                  key={i}
                  path={i}
                  exact
                  render={(props) => <ChatsListContainer {...props} />}
                />)}
              </Switch>
            </Grid>
            <Grid item xs={8} className="messages">
              <Switch>
                <Route path="/profile" exact>
                  <ProfileContainer/>
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
                  render={(props) => <MessageBlockContainer {...props} />}
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
