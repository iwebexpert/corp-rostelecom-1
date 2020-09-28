import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Profile} from 'components/Profile'
import {changeProfileAction} from 'actions/profile'

class ProfileClass extends Component {

    getProfileData = (profile) => {
        this.props.changeProfileAction(profile)
    }

    render() {
        return <Profile getProfileData={this.getProfileData} profile={this.props.profile}/>
    }

}

function mapStateToProps(state, ownProps) {

    return {
        profile: state.profile.entries
    }


}

function mapDispatchToProps(dispatch) {
    return {
        changeProfileAction: (profile) => dispatch(changeProfileAction(profile))
    }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileClass)