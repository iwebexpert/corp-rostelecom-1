import React, { Component } from 'react'
import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { Card, CardActions, CardContent, Avatar, Grid } from '@material-ui/core'

import './Message.scss'

export class Message extends Component {
  render() {
    const { text, bot, user } = this.props
    const classes = classNames('message', {
      'by-author': !bot,
      'by-bot': bot,
    })
    return (
      <Card className={classes}>
        <CardContent className='message__text'>
          <Grid container spacing={3}>
            {bot ? '' : <Grid item xs={2}>
              <Avatar
                style={{
                  width: 32,
                  height: 32
                }}
                alt="Аватар пользователя"
                src={user.avatar}
              />
            </Grid>}
            <Grid item xs={bot ? 12 : 10}>
              {text.split('\n').map(i => (
                <div key={nanoid()}>{i}</div>
              ))}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className='message__author'>
          {!bot ? user.name : 'Бот'}
        </CardActions>
      </Card>
    )
  }
}
