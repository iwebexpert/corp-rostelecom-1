import React, { Component } from 'react';

export class MessageForm extends Component {
    state = {
        text: '',
        author: '',
        isError: false,
        txtEror: '',
    }

    handleMessageSend = () => {
        const { text, author } = this.state;
        const { onSend } = this.props;

        if (text && author && author.trim().length > 0 && text.trim().length > 0) {

            this.setState({
                isError: false,
                txtEror: ''
            });

            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({ text: '' });
            }
        } else {
            //alert('Заполните все поля формы.')
            this.setState({
                isError: true,
                txtEror: 'Заполните все поля формы'
            });
        }
    }

    handleMessageSendKey = (event) => {
        if (event.keyCode == 13)
            this.handleMessageSend();
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;

        this.setState({
            [fildName]: event.target.value,
        });
    }

    render() {
        const { text, author } = this.state;
        const { isError } = this.state;
        const divError = isError ? <p>Ошибка: {this.state.txtEror}</p> : "";
        return (
            <div>
                <div>
                    <input name="author" type="text" value={author} placeholder="Введите автора" onChange={this.handleInputChange} />
                </div>
                <div>
                    <textarea name="text" value={text} placeholder="Введите текст сообщения" onChange={this.handleInputChange} onKeyUp={this.handleMessageSendKey} />
                </div>
                <div>
                    <button onClick={this.handleMessageSend}>Отправить сообщение</button>
                </div>
                {divError}
            </div>
        );
    }
}
