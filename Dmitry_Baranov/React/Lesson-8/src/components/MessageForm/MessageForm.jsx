import React, {useState} from 'react';
import {TextField, Fab} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import './MessageForm.css';

export const MessageForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            text: '',
            author: '',
        }
    );
    const handleMessageSend = () => {

        const {text, author} = dataForm;
        const {onSend} = props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                onSend(dataForm);
                setDataForm({...dataForm, text: ''});
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
    return (
        <div className="root">
            <TextField label="Ваше имя" name="author" value={dataForm.author} onChange={handleInputChange}/>
            <TextField
                label="Ваш текст"
                name="text"
                value={dataForm.text}
                onChange={handleInputChange}
                multiline
                autoFocus
            />
            <Fab variant="extended" color="secondary" onClick={handleMessageSend} className="btn"><SendIcon/></Fab>
        </div>
    );
};


// const styles = {
//     root: {
//         backgroundColor: 'orange',
//         borderRadius: 10, //px
//     },
//     btn: {
//         fontSize: '18px',
//     }
// };
