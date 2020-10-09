import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Header } from 'components/Header';
import { profileLoadAction } from '../actions/profile';


export const HeaderContainer = (props) => {

    const dispacth = useDispatch();
    const [isLoading, isError] = useSelector((state) => ([state.profile.loading, state.profile.error]));
    // console.log(chats);
    const profile = useSelector((state) => state.profile.entries);
    const text = "Messanger";

    const handleRedirect = () => {
        dispacth(push(`/profile`));
    }
    const handleReloadProfile = () => {
        dispacth(profileLoadAction());
    };
    useEffect(() => {
        dispacth(profileLoadAction());

    }, []);




    return <Header profile={profile} text={text} handleRedirect={handleRedirect} handleReloadProfile={handleReloadProfile}
        isError={isError}
        isLoading={isLoading} />
};

/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { push } from 'connected-react-router';
import { Header } from 'components/Header';
import { profileLoadAction } from '../actions/profile';

class HeaderContainerClass extends Component {
    componentDidMount() {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    }
    handleReloadProfile = () => {
        const { profileLoadAction } = this.props;
        profileLoadAction();
    };

    render() {
        const { profile, text, isError, isLoading, handleRedirect } = this.props;

        return <Header profile={profile} text={text} handleRedirect={this.handleRedirect} handleReloadProfile={this.handleReloadProfile}
            isError={isError}
            isLoading={isLoading} />
    }
    handleRedirect = () => {
        const { redirect } = this.props;
        redirect(`/profile`);
    }
}


function mapStateToProps(state, ownProps) {

    const { match } = ownProps;
    const profile = state.profile.entries;
    return {

        profile,
        isError: state.profile.error,
        isLoading: state.profile.loading,
    };
}

function mapDispatchToProps(dispacth) {
    return {
        profileLoadAction: () => dispacth(profileLoadAction()),
        redirect: (path) => dispacth(push(path))
    };
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderContainerClass);*/