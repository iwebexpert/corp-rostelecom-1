import React, { Component } from 'react'
import { Card, CardActions, CardContent } from '@material-ui/core'

export class Message extends Component {
  render() {
    const { text, author } = this.props
    const cssClass = `message ${author !== 'bot' ? 'right' : 'left'}`
    return (
      <Card className={cssClass}>
        <CardContent
          style={{ color: 'white' }}
          dangerouslySetInnerHTML={{ __html: text.replaceAll('\n', '<br/>') }}
        />
        <CardActions className='author'>
          {author !== 'bot' ? author : 'Бот'}
        </CardActions>
      </Card>
    )
  }
}
