import React, { Component } from 'react';

import MessageList from './MessageList';
//import {MessageForm} from './MessageForm';

class Messenger extends Component {
    constructor() {
        super();
        this.state = {
            messages: [
                // {message:'Сообщение', author: 'Анна'} ,
            ],
            pageTitle: 'Messenger App',
            showMessages: true,
            author: '',
            message: '',
        }
    }

    // toggleMessagesHandler = () => {
    //     this.setState({
    //       showMessages: !this.state.showMessages
    //     })
    //   }

    handleChangeAuthor(event) {
        // console.log(event.target); //инпут;
        // console.log(event.target.value) //значение инпута;  
        this.setState({ author: event.target.value })
    }

    handleChangeMessage(event) {
        this.setState({ message: event.target.value })
    }

    sendMessagesHandler = () => {
        const { message, author } = this.state
        if (message && author) {
            this.state.messages.push({ message, author })
            //console.log(this.state.messages)
            this.setState(this.state.messages)
        } else
            alert('Заполните все поля формы.')
    }

    componentDidUpdate() {
        if (this.state.messages.length % 2 === 1) {
            setTimeout(() => {
                this.state.messages.push({ message: 'Не приставай ко мне, я робот!', author: 'Робот' })
                this.setState(this.state.messages)
            }, 1000)
        }
    }

    render() {
        const divStyle = {
            textAlign: 'center'
        }

        let messageList = null

        if (this.state.showMessages) {
            messageList = this.state.messages.map((item, index) => {
                return (
                    <MessageList
                        key={index}
                        num={index}
                        message={item.message}
                        author={item.author}
                    />
                )
            })
        }


        return (
            <div style={divStyle}>
                <h2>{this.state.pageTitle}</h2>
                { messageList}
                <input value={this.state.author} placeholder="Введите автора" onChange={this.handleChangeAuthor.bind(this)} />
                <input value={this.state.message} placeholder="Введите текст сообщения" onChange={this.handleChangeMessage.bind(this)} />
                {/* <button onClick={this.toggleMessagesHandler}>Toggle Messages</button> */}
                <button onClick={this.sendMessagesHandler}>Send Messages</button>
            </div>
        );
    }
}

export default Messenger;