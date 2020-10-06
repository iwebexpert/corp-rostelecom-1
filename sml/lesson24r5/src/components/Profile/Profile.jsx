import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Grid, Container, List, ListItem, ListItemText } from '@material-ui/core';

import './Profile.css';

export class Profile extends Component {

  render() {
    const profile = this.props.profile;
    const { isLoading, isError, handleReloadProfile } = this.props;
    if (isError) {
      return (<Grid container direction="row" justify="center">
        <Grid item>
          <div>Не удалось загрузить... <button onClick={handleReloadProfile}>Загрузить повторно</button></div></Grid>
      </Grid>);
    }

    if (isLoading) {

      return (
        <Grid container direction="row" justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>);

    }
    return (
      <Grid container direction="row" justify="center">
        <Grid item>
          <Card className="root">
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={profile.image}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {profile.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {profile.about}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
        </Button>
              <Button size="small" color="primary">
                Learn More
        </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}