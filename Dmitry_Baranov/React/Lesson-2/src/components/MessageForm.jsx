import React, {Component} from 'react';

export class MessageForm extends Component {
    state = {
        text: '',
        author: '',
    }

    handleMessageSend = () => {
        const {text, author} = this.state;
        const {onSend} = this.props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                onSend(this.state);
                this.setState({text: ''});
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    handleInputChange = (event) => {
        const fildName = event.target.name;
        //console.log(fildName, event.target.value);

        this.setState({
            [fildName]: event.target.value,
        });
    }

    render() {
        const {text, author} = this.state;
        return (
            <div>
                <div>
                    <input name="author" type="text" value={author} placeholder="Введите автора"
                           onChange={this.handleInputChange}/>
                </div>
                <div>
                    <textarea name="text" value={text} placeholder="Введите текст сообщения"
                              onChange={this.handleInputChange}/>
                </div>
                <div>
                    <button onClick={this.handleMessageSend}>Отправить сообщение</button>
                </div>
            </div>
        );
    }
}