import React, {Component} from 'react'

import './NonExistChat.scss'
import {Grid, Typography} from "@material-ui/core";

export const NonExistChat = () => {
    return (<Grid container item alignItems="center" justify="center" xs>
        <Typography className='text-non-chat'>Выберите, кому хотели написать</Typography>
    </Grid>)
}

// export class NonExistChat extends Component {
//
//     render() {
//         return (<Grid container item alignItems="center" justify="center" xs>
//             <Typography className='text-non-chat'>Выберите, кому хотели написать</Typography>
//         </Grid>)
//     }
// }