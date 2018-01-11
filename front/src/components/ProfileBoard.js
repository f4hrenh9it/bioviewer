import React from 'react';

import {connect} from 'react-redux'

import {Route, Switch} from 'react-router-dom'
import ProfileNavBar from "./ProfileNavBar";
import Statistics from "./Statistics";
import ProfilePad from "./ProfilePad";
import {withRouter} from "react-router-dom";
import './Profile.css';


function ProfileBoard({regProfile, verProfile, loading}) {
    return (
        <div id="wrap">
            <ProfileNavBar/>
            <div className="container">
                <Switch>
                    <Route exact path='/statistics' component={Statistics}/>
                    <Route exact path='/profile' component={ProfilePad}/>
                </Switch>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    regProfile: state.regProfile_reducer,
    verProfile: state.verProfile_reducer,
    loading: state.loading_reducer,
});

export default withRouter(connect(mapStateToProps)(ProfileBoard));