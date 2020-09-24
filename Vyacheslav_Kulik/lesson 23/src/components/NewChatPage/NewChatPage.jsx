import React, {Component} from 'react'
import {nanoid} from "nanoid"
import {TextField, Button, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './NewChatPage.scss'

export class NewChatPage extends Component {
    state = {
        title: 'Новый чат'
    }

    handleForm = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    sendTitle = () => {
        this.props.getNewChatTitle(this.state.title)
    }

    render() {

        return (
            <Grid container
                  direction='column'
                  justify="center"
                  alignItems="center">
                <Grid item>
                    <TextField label="Введите название чата" value={this.state.title} onChange={this.handleForm}/>
                </Grid>
                <Grid item>
                    <Link to='/' style={{textDecoration: 'none'}}><Button onClick={this.sendTitle}>Create</Button></Link>

                </Grid>

            </Grid>

        )
    }

}