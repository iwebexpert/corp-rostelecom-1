import React, { Component } from 'react'

import { Card, CardContent, CardActions, Badge, Icon, Avatar, TextField, Button, Dialog, DialogTitle } from '@material-ui/core'

import './Profile.scss'

export class Profile extends Component {
    state = {
        dialog: false,
        name: '',
        age: '',
        about: ''
    }

    componentDidMount() {
        this.setState(this.props.user)
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
            const { name, age, about, avatar } = this.state
            onSave({ name, age, about, avatar })
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
                        badgeContent={<Icon>add_a_photo</Icon>}
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
                                    label="Ссылка на аватар"
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
