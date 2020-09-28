import React, {Component} from 'react'
import moment from 'moment'
import keydown from 'react-keydown'
import {Input, Button, Grid} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'


import './MessageForm.scss'

export class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            author: this.props.author,
            errorMessage: false,
            errorAuthor: false,
        }
    }

    @keydown('ctrl+enter')
    sendForm(event) {
        this.sendData()
    }

    handleChange = (event) => {
        if (event.target.name === 'author' && event.target.value.length > 15) {
            return
        }
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        }
    }

    sendData = () => {
        const {text, author} = this.state
        const {onSend} = this.props

        if (typeof onSend === 'function') {
            if (text && author) {
                onSend(this.state, moment())
                this.setState({text: ''})
                this.setState({
                    errorMessage: false,
                    errorAuthor: false
                })
            } else {
                if (!text) {
                    this.setState({
                        errorMessage: true
                    })
                }
                if (!author) {
                    this.setState({
                        errorAuthor: true
                    })
                }
            }
        }
    }

    render() {

        const {text, author} = this.state

        return (
            <Grid container item direction="row"  alignItems="center" className='message-form'>
                {/* <Grid item xs={1}>
                    <Input fullWidth error={this.state.errorAuthor} type="text" name="author" value={author}
                           onChange={this.handleChange} onKeyDown={this.sendForm}
                           placeholder="Введите ваше имя"/>
                </Grid> */}
                <Grid item xs>
                    <Input fullWidth autoFocus error={this.state.errorMessage} multiline name="text" value={text}
                           onChange={this.handleChange}
                           onKeyDown={this.sendForm} placeholder="Написать сообщение..."/>
                </Grid>
                <Grid item container justify="center" xs={1}>
                    <Button onClick={this.sendData}><SendIcon color="primary"/></Button>
                </Grid>
            </Grid>
        )
    }

}
