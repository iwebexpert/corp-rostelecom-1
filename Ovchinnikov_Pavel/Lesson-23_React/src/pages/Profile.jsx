import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import Save from '@material-ui/icons/Save';


export class Profile extends Component {
    state = {
        name: '',
        family: '',
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;

        this.setState({
            [fildName]: event.target.value,
        });
    }

    render() {
        const { name, family } = this.state;
        return (
            <div>
                <div>
                    <TextField label="Введите Имя" name="name" value={name} onChange={this.handleInputChange} />
                </div>

                <div>
                    <TextField label="Введите фамилию" name="family" value={family} onChange={this.handleInputChange} />
                </div>

                <Button variant="contained" color="primary" style={{ marginTop: 10 }} >Сохранить профиль<Save style={{ marginLeft: 10 }} /></Button>

            </div >
        );
    }
}
