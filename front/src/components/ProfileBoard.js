/**
 * Created by a1 on 11.08.17.
 */
/**
 *
 * Created by a1 on 11.08.17.
 */
import React from 'react';

import {connect} from 'react-redux'

import {Profile, ProfileEmpty} from "./Profile";
import ProfileNavBar from "./ProfileNavBar";
import './Profile.css';


function ProfileBoard({singleProfile, regProfile, verProfile}) {
    return (
        <div id="wrap">
            <ProfileNavBar/>
            <div className="container">
                {regProfile != null ? <Profile regProfile={regProfile}/> : <ProfileEmpty/>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    singleProfile: state.profile_reducer,
    regProfile: state.regProfile_reducer,
    verProfile: state.verProfile_reducer,
});

export default connect(mapStateToProps)(ProfileBoard);