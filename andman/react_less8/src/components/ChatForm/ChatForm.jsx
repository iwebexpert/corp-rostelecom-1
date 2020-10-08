import React, { useState } from 'react';
//import React, { Component } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './ChatForm.css';

export const ChatForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            title: '',
        }
    );

    const handleChatSend = () => {
        const { title } = dataForm;
        const { onSend } = props;

        if (title) {
            if (typeof (onSend) === 'function') {
                // this.setState({ chat: chat });
                onSend({ title });
                setDataForm({ ...dataForm, title: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }

    const handleInputChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value,
        });
    }
    const handleMessagePressKey = (event) => {
        if (event.keyCode == 13 && event.ctrlKey) {
            handleChatSend();
        }
    }

    return (
        <div className="chat-input-list">
            <TextField
                label="Введите название"
                name="title"
                value={dataForm.title}
                onChange={handleInputChange}
                onKeyUp={handleMessagePressKey}
                autoFocus
            />
            <Fab
                variant="extended"
                size="small"
                color="primary"
                onClick={handleChatSend} >Добавить чат<AddCircleIcon /></Fab>
        </div >
    );
};



// export class ChatForm extends Component {
//     state = {
//         title: '',
//     }

//     handleChatSend = () => {
//         const { title } = this.state;
//         const { onSend } = this.props;

//         if (title) {
//             if (typeof (onSend) === 'function') {
//                 // this.setState({ chat: chat });
//                 onSend({ title });
//                 this.setState({ title: '' });
//             }
//         } else {
//             alert('Заполните все поля формы.')
//         }
//     }

//     handleInputChange = (event) => {
//         const fildName = event.target.name;

//         this.setState({
//             [fildName]: event.target.value,
//         });
//     }
//     handleMessagePressKey = (event) => {
//         if (event.keyCode == 13 && event.ctrlKey) {
//             this.handleMessageSend();
//         }
//     }

//     render() {
//         const { title } = this.state;
//         return (
//             <div className="chat-input-list">
//                 <TextField
//                     label="Введите название"
//                     name="title"
//                     value={title}
//                     onChange={this.handleInputChange}
//                     onKeyUp={this.handleMessagePressKey}
//                     autoFocus
//                 />
//                 <Fab
//                     variant="extended"
//                     size="small"
//                     color="primary"
//                     onClick={this.handleChatSend} >Добавить чат<AddCircleIcon /></Fab>
//             </div >
//         );
//     }
// }