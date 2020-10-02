import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Save from '@material-ui/icons/Save';


export class Profile extends Component {

    render() {
        const profile = this.props.profile;
        return (
            <div>
                <div>
                    <TextField label="Введите Имя" name="name" value={profile ? profile.name : value = ""} />
                </div>

                <div>
                    <TextField label="Введите фамилию" name="family" value={profile ? profile.family : value = ""} />
                </div>

                <Button variant="contained" color="primary" style={{ marginTop: 10 }} >Сохранить профиль<Save style={{ marginLeft: 10 }} /></Button>

            </div >
        );
    }
}