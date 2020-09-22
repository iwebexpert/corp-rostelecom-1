import React, {Component} from 'react'
import moment from 'moment'
import keydown from 'react-keydown'

import './MessageForm.scss'

export class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            author: 'Гость'
        }
    }

    @keydown( 'enter' )
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
        if(event.key === 'Enter'){
        }
    }

    sendData = () => {
        const {text, author} = this.state
        const {onSend} = this.props

        if (typeof onSend === 'function') {
            if(text && author) {
                onSend(this.state, moment())
                this.setState({text:''})
            } else {
                if(!text) alert('Введите текст сообщения')
                if(!author) alert('Введите имя')

            }
        }
    }



    render() {

        const {text, author} = this.state

        return (
            <div className='shadow-form'>
                <div className=''>
                    <input className="guest-name" type="text" name="author" value={author} onChange={this.handleChange} onKeyDown={this.sendForm} placeholder="Введите ваше имя"/>
                </div>
                <div className='flex-grow-1'>
                    <input className="w-100" name="text" value={text} onChange={this.handleChange} onKeyDown={this.sendForm} placeholder="Написать сообщение..."/>
                </div>
                <div>
                    <button className="w-100" onClick={this.sendData}>Send</button>
                </div>
            </div>
        )
    }

}
