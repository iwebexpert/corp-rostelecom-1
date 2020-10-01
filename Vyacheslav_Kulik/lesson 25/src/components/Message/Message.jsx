import React, {Component} from 'react'
import classNames from 'classnames'
import {Grid, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'

import './Message.scss'

export class Message extends Component {

    get location() {
        return this.props.messages.author === 'Bot' ? 'start' : 'end'
    }

    handleClose  = () => {
        this.props.handleDeleteMessage()
    }

    render() {

        const {text, author} = this.props.messages
        let {time} = this.props.messages
        if (typeof time === 'string') {
            time = moment(time, 'HH:mm')
        }

        const messageStyle = classNames('message-style', `message-style-${this.location}`)
        const messageStyleText = classNames('message-style-text', `message-style-color-${this.location}`)

        return (
            <Grid className={messageStyle} item>
                <Grid container direction="column">
                    <Grid  onClick={this.handleClose} item className='message-style-close'>
                        <IconButton size="small">
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    </Grid>
                    <Grid container direction="column" className={messageStyleText}>
                        <Grid item style={{alignSelf: `flex-${this.location}`}}>
                            <b >{author}</b>
                        </Grid>
                        <Grid item>
                            <span dangerouslySetInnerHTML={{__html: text}}/>
                        </Grid>
                    </Grid>
                    <Grid className="message-style-time">
                        <span>{time.format('HH:mm')}</span>
                    </Grid>
                </Grid>
            </Grid>

        )
    }

}
