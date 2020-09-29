import React, { Component } from 'react'

import { ListItem, ListItemIcon, ListItemText, TextField, Fab, Icon } from '@material-ui/core'

import './ChatForm.scss'

export class ChatForm extends Component {
  state = {
    name: ''
  }

  onAdd = () => {
    const { name } = this.state
    const { onAdd } = this.props

    if (!name) {
      return
    }
    if (typeof (onAdd) === 'function') {
      onAdd(name)
      this.setState({ name: '' })
    }
  }

  onInput = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      this.onAdd()
    }
  }

  render() {
    const { name } = this.state
    return (
      <ListItem className="chat__form">
        <ListItemText>
          <TextField
            label="Название"
            variant="outlined"
            placeholder="Название"
            color="primary"
            value={name}
            onChange={this.onInput}
            onKeyUp={this.onKeyUp}
          />
        </ListItemText>
        <ListItemIcon>
          <Fab
            color="secondary"
            size="small"
            onClick={this.onAdd}
          >
            <Icon>add</Icon>
          </Fab>
        </ListItemIcon>
      </ListItem>
    )
  }
}
