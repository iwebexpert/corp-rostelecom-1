import React, { useState } from 'react';
import { Button, TextField, Fab, withStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

export const MessageForm = (props) => {
    const [dataForm, setDataForm] = useState(
        {
            text: '',
            author: '',
        }
    );

    const handleMessageSend = () => {
        const { text, author } = dataForm;
        const { onSend } = props;

        if (text && author) {
            if (typeof (onSend) === 'function') {
                onSend(dataForm);
                setDataForm({ ...dataForm, text: '' });
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
        <div>
            <TextField
                label="Введите автора"
                name="author"
                value={dataForm.author}
                onChange={handleInputChange}
                variant="outlined"
                style={{ margin: 10 }}
            />{" "}
            <TextField
                label="Введите текст сообщения"
                name="text"
                value={dataForm.text}
                onChange={handleInputChange}
                multiline
                autoFocus
                variant="outlined"
                style={{ margin: 10, width: 250 }}
            />{" "}
            <Button
                variant="contained"
                color="primary"
                style={{ margin: 10, marginTop: 18 }}
                onClick={handleMessageSend}>
                Отправить<SendIcon style={{ marginLeft: 15 }} />
            </Button>
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

// class MessageFormClass extends Component {
//     state = {
//         text: '',
//         author: '',
//     }

//     handleMessageSend = () => {
//         const {text, author} = this.state;
//         const {onSend} = this.props;

//         if(text && author){
//             if(typeof(onSend) === 'function'){
//                 onSend(this.state);
//                 this.setState({text: ''});
//             }
//         } else{
//             alert('Заполните все поля формы.')
//         }
//     }

//     handleInputChange = (event) => {
//         const fildName = event.target.name;
//         //console.log(fildName, event.target.value);

//         this.setState({
//             [fildName]: event.target.value,
//         });
//     }

//     render(){
//         const {text, author} = this.state;
//         const {classes} = this.props;
//         return (
//         <div className={classes.root}>
//             <TextField label="Введите автора" name="author" value={author} onChange={this.handleInputChange} />
//             <TextField 
//             label="Введите текст сообщения" 
//             name="text" 
//             value={text} 
//             onChange={this.handleInputChange}
//             multiline
//             autoFocus
//              />
//             <Fab variant="extended" color="secondary" onClick={this.handleMessageSend} className={classes.btn}><SendIcon /></Fab>
//         </div>
//         );
//     }
// }

// export const MessageForm = withStyles(styles)(MessageFormClass);