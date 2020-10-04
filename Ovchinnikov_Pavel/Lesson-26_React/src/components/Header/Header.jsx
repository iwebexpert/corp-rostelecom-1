import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, withStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';

//import './Header.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    a: {
        textDecoration: "none",
        color: "white",
        fontSize: "1.25rem",
        fontFamily: "Roboto, Helvetica, Arial, sansserif",
        fontWeight: "500",
        lineHeight: "1.6",
        letterSpacing: "0.0075em",
    },
    menu_btn: {
        marginLeft: 0,
    },
};

class HeaderForm extends Component {
    render() {
        console.log("this.props", this.props);
        const { classes, profile } = this.props;
        console.log("profile", profile);
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container maxWidth={false}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                MyChat (Material UI)
                           </Typography>

                            <div className={classes.menu_btn}>
                                <Button >
                                    <Link to="/chats" className={classes.a}>Чаты</Link>
                                </Button>

                                <Button >
                                    <Link to="/profile" className={classes.a}> {profile ? profile.family + " " + profile.name : "Профиль"}</Link>
                                </Button>
                            </div>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

export const Header = withStyles(styles)(HeaderForm);