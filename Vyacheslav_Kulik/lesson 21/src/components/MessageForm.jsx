import React, {Component} from 'react'
import moment from 'moment'

export default class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            author: 'Гость'
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    sendData = () => {
        const {text, author} = this.state
        const {onSend} = this.props

        if (typeof onSend === 'function') {
            if(text && author) {
                onSend(this.state, moment())
                this.setState({text:''})
            } else {
                alert('Введите текст сообщения')
            }
        }
    }



    render() {

        const {text, author} = this.state

        return (
            <div>
                <div>
                    <input type="text" name="author" value={author} onChange={this.handleChange} placeholder="Введите ваше имя"/>
                </div>
                <div>
                    <textarea name="text" cols="30" rows="10" value={text} onChange={this.handleChange} placeholder="Написать сообщение..."/>
                </div>
                <div>
                    <button onClick={this.sendData}>Send</button>
                </div>
            </div>
        )
    }

}
