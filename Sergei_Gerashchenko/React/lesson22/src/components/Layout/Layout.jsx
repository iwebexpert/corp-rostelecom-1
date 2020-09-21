import React, {Component} from 'react';
import {Grid, Container} from '@material-ui/core';

import {Messenger} from 'components/Messenger';
import {Header} from 'components/Header';

import './Layout.css';
import {ChatList} from "../ChatList";

export class Layout extends Component {
    render(){
        return (
            <Grid container >
                <Grid item xs={12} className="logo">
                    <Header />
                </Grid>
                    <Grid container item xs={12} alignItems={"stretch"} >
                        <Grid item xs={2}>
                            <ChatList />
                        </Grid>
                        <Grid item xs={10} >
                            <Messenger />
                        </Grid>
                    </Grid>
             </Grid>
        );
    }
}