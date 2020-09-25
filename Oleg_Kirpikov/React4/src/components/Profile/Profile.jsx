import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';

import './Profile.css';

export class Profile extends Component {
    render() {
        return (
            <form>
                <Grid className="profile" >
                    <TextField label="Имя" name="author" variant="outlined" margin="normal" fullWidth />
                    <TextField label="Email" name="email" variant="outlined" margin="normal" fullWidth />
                    <TextField label="Пароль" name="passwd" variant="outlined" margin="normal" fullWidth />
                    <Grid item className="panelButtons">
                        <Button variant="contained" color="primary">
                            Сохранить
                        </Button>
                        <Button variant="contained" color="primary">
                            Закрыть
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}