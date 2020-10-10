import React, { useState } from 'react'

import { ListItem, ListItemIcon, ListItemText, TextField, Fab, Icon } from '@material-ui/core'

import './ChatForm.scss'

export const ChatForm = (props) => {
  const [dataForm, setDataForm] = useState({ name: '' })

  const onAdd = () => {
    const { onAdd } = props
    if (!dataForm.name) {
      return
    }
    onAdd(dataForm.name)
    setDataForm({ ...dataForm, name: '' })
  }

  const onInput = (event) => {
    setDataForm({ ...dataForm, name: event.target.value })
  }

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      onAdd()
    }
  }

  return (
    <ListItem className="chat__form">
      <ListItemText>
        <TextField
          label="Название"
          variant="outlined"
          placeholder="Название"
          color="primary"
          value={dataForm.name}
          onChange={onInput}
          onKeyUp={onKeyUp}
        />
      </ListItemText>
      <ListItemIcon>
        <Fab
          color="secondary"
          size="small"
          onClick={onAdd}
        >
          <Icon>add</Icon>
        </Fab>
      </ListItemIcon>
    </ListItem>
  )
}
