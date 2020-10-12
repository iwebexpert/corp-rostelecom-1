import React from 'react'
import {Typography, Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'

import './Header.scss'
//
// export class Header extends Component {
//
//     render() {
//
//         return (
//                     <Grid container direction="column" alignItems="center" className="header">
//                         <Grid item>
//                             <Link to='/profile' style={{textDecoration: 'none', color: 'white'}}>
//                                 <Typography>Your Profile</Typography>
//                             </Link>
//                         </Grid>
//                     </Grid>
//         )
//
//     }
//
// }

export const Header = () => {

    return (
                    <Grid container direction="column" alignItems="center" className="header">
                        <Grid item>
                            <Link to='/profile' style={{textDecoration: 'none', color: 'white'}}>
                                <Typography>Your Profile</Typography>
                            </Link>
                        </Grid>
                    </Grid>
        )
}
