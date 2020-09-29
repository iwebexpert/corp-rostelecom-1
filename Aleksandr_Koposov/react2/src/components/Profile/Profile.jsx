import React, { Component } from 'react'

import {
  Card,
  CardContent,
  CardActions,
  Badge,
  Icon,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle
} from '@material-ui/core'

import './Profile.scss'

export class Profile extends Component {
  state = {
    dialog: false,
    id: this.props.user.id,
    name: this.props.user.name,
    age: this.props.user.age,
    about: this.props.user.about,
    avatar: this.props.user.avatar
  }

  componentDidMount() {
    this.setState({
      ...this.props.user
    })
  }

  onInputChange = (event) => {
    const name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  saveChanges = () => {
    const { onSave } = this.props
    if (typeof (onSave) === 'function') {
      const { id, name, age, about, avatar } = this.state
      onSave({ id, name, age, about, avatar })
    }
  }

  toggleDialog = () => {
    this.setState({
      dialog: !this.state.dialog
    })
  }

  render() {
    const { name, age, about, avatar, dialog } = this.state
    return (
      <Card className="profile" elevation={3}>
        <CardContent>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            badgeContent={<Icon>edit</Icon>}
            onClick={this.toggleDialog}
          >
            <Avatar
              style={{
                width: 128,
                height: 128
              }}
              alt="Аватар пользователя"
              src={avatar}
            />
          </Badge>
          <Dialog
            onClose={this.toggleDialog}
            open={dialog}
            className="avatar-dialog"
          >
            <DialogTitle>Выбор аватара</DialogTitle>
            <Card>
              <CardContent>
                <TextField
                  name="avatar"
                  label="Ссылка на аватар (можете изменять число в конце для теста)"
                  variant="outlined"
                  value={avatar}
                  onChange={this.onInputChange}
                  style={{ width: '550px' }}
                />
              </CardContent>
            </Card>
          </Dialog>
          <div>
            <TextField
              name="name"
              label="Имя"
              variant="outlined"
              value={name}
              onChange={this.onInputChange}
            />
            <TextField
              name="age"
              label="Возраст"
              variant="outlined"
              type="number"
              value={age}
              onChange={this.onInputChange}
            />
          </div>
          <div>
            <TextField
              name="about"
              label="О себе"
              multiline
              variant="outlined"
              value={about}
              onChange={this.onInputChange}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={this.saveChanges}
          >Сохранить</Button>
        </CardActions>
      </Card>
    )
  }
}
