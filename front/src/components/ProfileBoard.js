import React from 'react';

import {connect} from 'react-redux'

import {Profile} from "./Profile";
import {ProfileLoading} from "./ProfileLoading";
import ProfileNavBar from "./ProfileNavBar";
import './Profile.css';


function ProfileBoard({regProfile, verProfile, loading}) {
    return (
        <div id="wrap">
            <ProfileNavBar/>
            <div className="container">
                {loading || regProfile == null ? <ProfileLoading loading={loading}/> : <Profile regProfile={regProfile}/>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    singleProfile: state.profile_reducer,
    regProfile: state.regProfile_reducer,
    verProfile: state.verProfile_reducer,
    loading: state.loading_reducer,
});

export default connect(mapStateToProps)(ProfileBoard);