import React, {Component} from 'react'
import classNames from 'classnames'
import {Grid, Box} from '@material-ui/core'

import './MessageMUI.scss'

export class MessageMUI extends Component {

    get location() {
        return this.props.messages.author === 'Bot' ? 'start' : 'end'
    }

    render() {

        const {text, author, time} = this.props.messages
        const messageStyle = classNames('message-style', `message-style-${this.location}`)
        const messageStyleText = classNames('message-style-text', `message-style-color-${this.location}`)

        return (
            <Grid className={messageStyle} item>
                <Grid container direction="column">
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
