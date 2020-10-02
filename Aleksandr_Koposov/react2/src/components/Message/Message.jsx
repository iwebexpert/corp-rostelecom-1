import React, { Component } from 'react'
import classNames from 'classnames'
import { nanoid } from 'nanoid'
import { Tooltip, Avatar, Icon } from '@material-ui/core'

import './Message.scss'

export class Message extends Component {
  state = {
    hovered: false
  }

  onHover = () => {
    if (this.props.bot) {
      return
    }
    this.setState({
      hovered: !this.state.hovered
    })
  }

  onClick = () => {
    this.props.onDelete()
  }

  render() {
    const { text, bot, user } = this.props
    const classes = classNames('message', {
      'by-author': !bot,
      'by-bot': bot,
    })
    const avatarStyle = {
      width: 32,
      height: 32
    }
    const botAvatarPicture = 'data:image/png;base64,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'
    return (
      <div className={classes}>
        <Tooltip title={!bot ? user.name : 'Бот'}>
          {!bot && this.state.hovered ? (<Avatar
            style={avatarStyle}
            onMouseLeave={this.onHover}
            onClick={this.onClick}
          >
            <Icon>close</Icon>
          </Avatar>) : (<Avatar
            style={avatarStyle}
            onMouseOver={this.onHover}
            alt="Аватар пользователя"
            src={bot ? botAvatarPicture : user.avatar}
          />)}
        </Tooltip>
        <div className="bubble">
          {text.split('\n').map(i => (
            <div key={nanoid()}>{i}</div>
          ))}
        </div>
      </div>
    )
  }
}
