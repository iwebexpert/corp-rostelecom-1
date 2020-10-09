import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import './MessageForm.css';

export const MessageForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            text: '',
            author: '',
            my: true,
        }
    );

    const handleMessageSendKey = (event) => {
        if (event.keyCode == 13 && event.ctrlKey)
            handleMessageSend();
    }

    const handleMessageSend = () => {
        const { text, author, isError, txtEror } = dataForm;
        const { onSend } = props;

        if (text && author && author.trim().length > 0 && text.trim().length > 0) {

            if (typeof (onSend) === 'function') {
                onSend(dataForm);
                setDataForm({ ...dataForm, isError: false, text: '' });
            }
        }
        else {
            setDataForm({ ...dataForm, isError: true, txtEror: 'Заполните все поля формы' });
        }
    }

    const handleInputChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value,
            my: true,
        });
    }

    const divError = dataForm.isError ? <p style={{ color: "red" }}>Ошибка: {dataForm.txtEror}</p> : "";
    return (
        <div className="messageform">
            <div>
                <TextField label="Введите автора" name="author" value={dataForm.author} onChange={handleInputChange} />
            </div>
            <div>
                <TextField
                    label="Введите текст сообщения"
                    name="text"
                    value={dataForm.text}
                    onChange={handleInputChange}
                    onKeyUp={handleMessageSendKey}
                    multiline
                    autoFocus
                    rows="4"
                    style={{ width: 500 }}
                />
            </div>
            <Button variant="contained" color="primary" style={{ marginTop: 10 }} onClick={handleMessageSend} >Отправить сообщение<SendIcon style={{ marginLeft: 10 }} /></Button>
            {divError}
        </div>
    );
};