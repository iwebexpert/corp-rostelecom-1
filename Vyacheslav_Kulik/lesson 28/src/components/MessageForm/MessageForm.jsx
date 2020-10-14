import React, {useState} from 'react'
import moment from 'moment'
import {Input, Button, Grid} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'


import './MessageForm.scss'


export const MessageForm = (props) => {

    const initialState = {
        text: '',
        author: props.author,
        errorMessage: false,
        errorAuthor: false
    }
    const [state, setState] = useState(initialState)

    const {text} = state

    const handleChange = (event) => {
        if (event.target.name === 'author' && event.target.value.length > 15) {
            return
        }
        setState({...state,
            [event.target.name]: event.target.value
        })

    }


    const sendData = () => {
        const {text, author} = state
        const {onSend} = props

        if (typeof onSend === 'function') {
            if (text && author) {
                onSend({text, author}, moment())
                setState({
                    ...state,
                    errorMessage: false,
                    errorAuthor: false,
                    text: ''

                })
            } else {
                if (!text) {
                    setState({
                        ...state,
                        errorMessage: true
                    })
                }
                if (!author) {
                    setState({
                        ...state,
                        errorAuthor: true
                    })
                }
            }
        }
    }

    const sendForm = (event) => {

        if(event.key === 'Enter' && event.ctrlKey) {
            sendData()
        }

    }


    return (
        <Grid container item direction="row"  alignItems="center" className='message-form'>
            {/* <Grid item xs={1}>
                    <Input fullWidth error={this.state.errorAuthor} type="text" name="author" value={author}
                           onChange={this.handleChange} onKeyDown={this.sendForm}
                           placeholder="Введите ваше имя"/>
                </Grid> */}
            <Grid item xs>
                <Input fullWidth autoFocus error={state.errorMessage} multiline name="text" value={text}
                       onChange={handleChange}
                       onKeyDown={sendForm}
                       placeholder="Написать сообщение..."/>
            </Grid>
            <Grid item container justify="center" xs={1}>
                <Button onClick={sendData}><SendIcon color="primary"/></Button>
            </Grid>
        </Grid>
    )
}

//
// export class MessageForm extends Component {
//
//
//
//
//
//     render() {
//
//
//
//         return (
//             <Grid container item direction="row"  alignItems="center" className='message-form'>
//                 {/* <Grid item xs={1}>
//                     <Input fullWidth error={this.state.errorAuthor} type="text" name="author" value={author}
//                            onChange={this.handleChange} onKeyDown={this.sendForm}
//                            placeholder="Введите ваше имя"/>
//                 </Grid> */}
//                 <Grid item xs>
//                     <Input fullWidth autoFocus error={this.state.errorMessage} multiline name="text" value={text}
//                            onChange={this.handleChange}
//                            onKeyDown={this.sendForm} placeholder="Написать сообщение..."/>
//                 </Grid>
//                 <Grid item container justify="center" xs={1}>
//                     <Button onClick={this.sendData}><SendIcon color="primary"/></Button>
//                 </Grid>
//             </Grid>
//         )
//     }
//
// }
