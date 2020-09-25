import React, {Component} from 'react';
import {Button, TextField, Fab, withStyles} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


const styles = {
    // root: {
    //     backgroundColor: 'orange',
    //     borderRadius: 10, //px
    // },
    // btn: {
    //     fontSize: '18px',
    // }
};

class MessageFormClass extends Component {
    state = {
        text: '',
        author: '',

    }

    handleMessageSend = () => {
        const {text, author} = this.state;
        const {onSend} = this.props;
        
        if(text && author ){
            if(typeof(onSend) === 'function'){
                onSend(this.state);
                this.setState({
                    text: ''
                });
            }
        } else{
            alert('Заполните все поля формы.')
        }
    }

    handleMessageSendKey = (event) => {
        if (event.keyCode == 13 && event.ctrlKey)
            this.handleMessageSend();
    }
    
    handleInputChange = (event) => {
        const fildName = event.target.name;
        //console.log(fildName, event.target.value);
        this.setState({
            [fildName]: event.target.value
        });
    }

    render(){
        const {text, author} = this.state;
        const {classes} = this.props;
        // console.log('Form', classes);
        return (
        <div className={classes.root}>
            <TextField label=" Введите автора " name="author" value={author} onChange={this.handleInputChange} />
            <TextField 
            label=" Введите сообщение " 
            name="text" 
            value={text} 
            onChange={this.handleInputChange}
            multiline
            autoFocus
            onKeyUp={this.handleMessageSendKey}
             />
            {/* <Fab variant="extended" color="secondary" onClick={this.handleMessageSend} ><SendIcon /></Fab> */}
            <Button variant="contained" color="default" style={{ marginTop: 10 }} onClick={this.handleMessageSend} >Отправить<SendIcon style={{ marginLeft: 10 }} /></Button>
        </div>
        );
    }
}

export const MessageForm = withStyles(styles)(MessageFormClass);