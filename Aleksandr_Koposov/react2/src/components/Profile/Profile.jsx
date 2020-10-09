import React, { useEffect, useState } from 'react'

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
  DialogTitle,
  CircularProgress
} from '@material-ui/core'

import './Profile.scss'

export const Profile = (props) => {
  const { user, isLoading } = props
  const { id, name, age, about, avatar } = user || {}
  const [profileState, setProfile] = useState(
    {
      init: false,
      dialog: false,
      id,
      name,
      age,
      about,
      avatar
    }
  )

  useEffect(() => {
    setProfile({
      ...profileState,
      init: true,
      ...props.user
    })
  }, [])

  const onInputChange = (event) => {
    setProfile({
      ...profileState,
      [event.target.name]: event.target.value
    })
  }

  const saveChanges = () => {
    const { onSave } = props
    const { id, name, age, about, avatar } = profileState
    onSave({ id, name, age, about, avatar })
  }

  const toggleDialog = () => {
    setProfile({
      ...profileState,
      dialog: !profileState.dialog
    })
  }

  const avatarSize = {
    width: 128,
    height: 128
  }

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
          onClick={toggleDialog}
        >
          {!isLoading ? (
            <Avatar
              style={avatarSize}
              alt="Аватар пользователя"
              src={profileState.avatar}
            />
          ) : (
              <Avatar style={avatarSize}>
                <CircularProgress />
              </Avatar>
            )}
        </Badge>
        <Dialog
          onClose={toggleDialog}
          open={profileState.dialog}
          className="avatar-dialog"
        >
          <DialogTitle>Выбор аватара</DialogTitle>
          <Card>
            <CardContent>
              <TextField
                name="avatar"
                label="Ссылка на аватар (можете изменять число в конце для теста)"
                variant="outlined"
                value={profileState.avatar}
                onChange={onInputChange}
                style={{ width: '550px' }}
              />
            </CardContent>
          </Card>
        </Dialog>
        {!isLoading ?
          (
            <div>
              <TextField
                name="name"
                label="Имя"
                variant="outlined"
                value={profileState.name}
                onChange={onInputChange}
              />
              <TextField
                name="age"
                label="Возраст"
                variant="outlined"
                type="number"
                value={profileState.age}
                onChange={onInputChange}
              />
              <TextField
                name="about"
                label="О себе"
                multiline
                variant="outlined"
                value={profileState.about}
                onChange={onInputChange}
              />
            </div>
          ) : (
            <div style={{
              width: '100%',
              textAlign: 'center'
            }}>
              <CircularProgress />
            </div>
          )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          onClick={saveChanges}
        >Сохранить</Button>
      </CardActions>
    </Card>
  )
}
