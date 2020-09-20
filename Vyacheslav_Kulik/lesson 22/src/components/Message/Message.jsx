import React, {Component} from 'react'
import classNames from 'classnames'


import './Message.scss'

export class Message extends Component {

    get location() {
        return this.props.messages.author === 'Bot' ? 'start' : 'end'
    }

    render() {

        const {text, author, time} = this.props.messages
        const messageStyle = classNames('message-style', `message-style-${this.location}`)

        return (
            <div className={messageStyle}>
                <div className={`align-self-${this.location}`}>
                    <b>{author}</b>

                </div>
                <div>
                    <span dangerouslySetInnerHTML={{__html: text}}/>
                    <span className={'time-style'}>{time.format('HH:mm')}</span>
                </div>
            </div>
        )
    }

}
