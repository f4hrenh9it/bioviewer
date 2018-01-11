import React from 'react';
import {withRouter} from "react-router-dom";
import {fetchUpdateProfile} from "../actions/index";
import {connect} from "react-redux";
import {ProfileLoading} from "./ProfileLoading";
import {Profile} from "./Profile";

export const ProfilePad = ({regProfile, verProfile, loading}) => (
    <div>
        {loading || regProfile == null ? <ProfileLoading loading={loading}/> :
            <Profile regProfile={regProfile}/>}
    </div>
);

const mapStateToProps = state => ({
    regProfile: state.regProfile_reducer,
    verProfile: state.verProfile_reducer,
    loading: state.loading_reducer,
});

const mapDispatchToProps = dispatch => ({
    fetchUpdateProfile: (userid, useridp) => dispatch(fetchUpdateProfile(userid, useridp)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePad));