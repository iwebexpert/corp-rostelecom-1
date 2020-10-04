import React, {Component} from 'react'
import {TextField, Button, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './Profile.scss'

export class Profile extends Component {
    state = {
        author: this.props.profile.author,
        age: this.props.profile.age
    }


    handleForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    save = (event) => {
        this.props.getProfileData(this.state)
    }

    render() {


        return (
            <Grid container
                  direction='column'
                  justify="center"
                  alignItems="center">
                <Grid item>
                    <TextField name='author' label="Ваше имя" value={this.state.author} onChange={this.handleForm}/>
                </Grid>
                <Grid item>
                    <TextField name='age' label="Ваш возраст" value={this.state.age} onChange={this.handleForm}/>
                </Grid>
                <Grid item>
                    <Button onClick={this.save}>Save</Button>

                </Grid>

            </Grid>

        )
    }

}