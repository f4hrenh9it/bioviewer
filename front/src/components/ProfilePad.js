import React from 'react';
import {withRouter} from "react-router-dom";
import {fetchUpdateProfile} from "../actions/fetchUpdateProfile";
import {connect} from "react-redux";
import {LoadingBar} from "./ProfileLoading";
import {Profile} from "./Profile";
import {ErrorBar} from "./ProfileError";

export const ProfilePad = ({regProfile, verProfile, loading}) => (
    <div>
        {loading || regProfile == null ? <LoadingBar loading={loading}/> :
            regProfile.error ? <ErrorBar error={regProfile.error}/> :
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