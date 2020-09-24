import React, {Component} from 'react'
import {TextField, Button, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './Profile.scss'

export class Profile extends Component {
    state = {
        author: 'Гость',
        age: ''
    }

    handleForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                    <Link to='/' style={{textDecoration: 'none'}}><Button>Save</Button></Link>

                </Grid>

            </Grid>

        )
    }

}