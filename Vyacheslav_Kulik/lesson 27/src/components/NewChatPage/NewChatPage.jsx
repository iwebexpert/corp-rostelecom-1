import React, {useState} from 'react'
import {nanoid} from "nanoid"
import {TextField, Button, Grid} from '@material-ui/core'
import {Link, Redirect} from 'react-router-dom'

import './NewChatPage.scss'

export const NewChatPage = (props) => {
    const initialState = {
        title: 'Новый чат'
    }
    const [state, setState] = useState(initialState)

    const handleForm = (event) => {
        setState({
            ...state,
            title: event.target.value
        })
    }

    const sendData = (event) => {
        if(event.key === 'Enter') {
            sendTitle()
        }

    }
    const sendTitle = () => {
        props.getNewChatTitle(state.title)
    }

    return (
        <Grid container
              direction='column'
              justify="center"
              alignItems="center">
            <Grid item>
                <TextField label="Введите название чата" value={state.title} onChange={handleForm}
                           onKeyDown={sendData}/>
            </Grid>
            <Grid item>
                <Button onClick={sendTitle}>Create</Button>

            </Grid>

        </Grid>

    )
}
//
// export class NewChatPage extends Component {
//     state = {
//         title: 'Новый чат'
//     }
//
//     handleForm = (event) => {
//         this.setState({
//             title: event.target.value
//         })
//     }
//
//     @keydown('enter')
//     sendData(event) {
//         this.sendTitle()
//     }
//
//     sendTitle = () => {
//         this.props.getNewChatTitle(this.state.title)
//     }
//
//     render() {
//
//
//         return (
//             <Grid container
//                   direction='column'
//                   justify="center"
//                   alignItems="center">
//                 <Grid item>
//                     <TextField label="Введите название чата" value={this.state.title} onChange={this.handleForm}
//                                onKeyDown={this.sendData}/>
//                 </Grid>
//                 <Grid item>
//                     <Button onClick={this.sendTitle}>Create</Button>
//
//                 </Grid>
//
//             </Grid>
//
//         )
//     }
//
// }