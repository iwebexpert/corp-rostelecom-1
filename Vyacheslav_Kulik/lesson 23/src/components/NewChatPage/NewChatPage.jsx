import React, {Component} from 'react'
import {nanoid} from "nanoid"
import {TextField, Button, Grid} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'
import keydown from 'react-keydown'

import './NewChatPage.scss'

export class NewChatPage extends Component {
    state = {
        title: 'Новый чат',
        redirect: false
    }

    handleForm = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    @keydown('enter')
    sendData = (event) => {
        this.sendTitle()
    }
    sendTitle = () => {
        this.props.getNewChatTitle(this.state.title)
        this.setState({
            redirect: true
        })
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to='/'/>) 
        }

        return (
            <Grid container
                  direction='column'
                  justify="center"
                  alignItems="center">
                <Grid item>
                    <TextField label="Введите название чата" value={this.state.title} onChange={this.handleForm} onKeyDown={this.sendData}/>
                </Grid>
                <Grid item>
                    <Link to='/' style={{textDecoration: 'none'}}><Button onClick={this.sendTitle}>Create</Button></Link>

                </Grid>

            </Grid>

        )
    }

}