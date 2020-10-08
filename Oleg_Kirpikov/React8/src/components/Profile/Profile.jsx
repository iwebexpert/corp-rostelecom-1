import React from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export const Profile = (props) => {
    const classes = styles(props);

    const { profile } = props.profile;

    if (profile == undefined) {
        return (
            <Card variant="outlined">
            </Card>
        )
    };

    return (
        <Card variant="outlined" className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={` ${profile.firstName} ${profile.lastName} `} src={profile.avatar} />
                }
                title={` ${profile.firstName} ${profile.lastName} `}
            />
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {profile.email}
                </Typography>
                <Typography variant="h5" component="h2">
                    {profile.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {profile.title}
                </Typography>
                <Typography variant="body2" component="p">

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Закрыть</Button>
            </CardActions>
        </Card>
    )
}