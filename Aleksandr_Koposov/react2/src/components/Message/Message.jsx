import React, { Component } from 'react'
import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { Card, CardActions, CardContent } from '@material-ui/core'

import './Message.scss'

export class Message extends Component {
  render() {
    const { text, author } = this.props
    const classes = classNames('message', {
      'by-author': author !== 'bot',
      'by-bot': author === 'bot',
    })
    return (
      <Card className={classes}>
        <CardContent className='message__text'>
          {text.split('\n').map(i => (
            <div key={nanoid()}>{i}</div>
          ))}
        </CardContent>
        <CardActions className='message__author'>
          {author !== 'bot' ? author : 'Бот'}
        </CardActions>
      </Card>
    )
  }
}
