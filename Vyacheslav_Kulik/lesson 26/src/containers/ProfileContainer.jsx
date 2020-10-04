import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Profile} from 'components/Profile'
import {changeProfileAction, loadProfileAction} from 'actions/profile'
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid, Button} from '@material-ui/core'


class ProfileClass extends Component {

    getProfileData = (profile) => {
        this.props.changeProfileAction(profile)
    }
    handleReloadProfile = () => {
        this.props.loadProfileAction()
    }


    render() {
        //console.log(this.props.profile)
        if(this.props.isLoading) {
            return (
                <Grid container justify="center" alignItems="center">
                    <CircularProgress/>
                </Grid>
            )
        }
        if(this.props.isError) {
            return (
                <Grid container justify="center" alignItems="center">
                    <Button onClick={this.handleReloadProfile}>Попробовать еще раз</Button>
                </Grid>
            )
        }
        return (<Profile getProfileData={this.getProfileData} profile={this.props.profile}/>)
    }

}

function mapStateToProps(state, ownProps) {
    return {
        profile: state.profile.entries,
        isLoading: state.profile.loading,
        isError: state.profile.error,
    }


}

function mapDispatchToProps(dispatch) {
    return {
        changeProfileAction: (profile) => dispatch(changeProfileAction(profile)),
        loadProfileAction: () => dispatch(loadProfileAction())

    }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileClass)