import React, { useState } from 'react';
import { Button, TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { nanoid } from 'nanoid';

export const ChatsForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            title: '',
        }
    );
    /*state = {
        title: '',
    }*/

    const handleAddChatSend = () => {
        const { title } = dataForm;
        const { onSend } = props;

        if (title) {
            if (typeof (onSend) === 'function') {
                onSend({ title: dataForm.title });
                setDataForm({ title: '' });
            }
        } else {
            alert('Заполните все поля формы.')
        }
    }
    const handleKeyPress = (event) => {
        //console.log(event.ctrlKey);
        // console.log(event.key);
        if (event.key === "Enter") {

            handleAddChatSend();
        }
    }

    const handleInputChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value,
        });
    }


    return (
        <div>
            <TextField label="Введите название" name="title" onChange={handleInputChange} onKeyDown={handleKeyPress} />
            <Fab variant="extended" color="secondary" onClick={handleAddChatSend} ><SendIcon /></Fab>
        </div>
    );

}