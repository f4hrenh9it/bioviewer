/**
 * Created by a1 on 11.08.17.
 */
/**
 *
 * Created by a1 on 11.08.17.
 */
import React from 'react';

import {FormControl, Button, Navbar} from 'react-bootstrap';

import * as log from 'loglevel';

import {connect} from 'react-redux'
import {
    addLastAppendCollection,
    addLastRangeMultiple,
    fetchSingleCollection,
    refreshNReceiveMultipleCollections,
    addUserId,
    addUserIdp,
    fetchSingleProfile
} from '../actions/index'

import {Profile, ProfileEmpty} from "./Profile";
import './Profile.css';


function ProfileBoard({last_range_multiple, refreshNReceiveMultipleCollections,
                       addUserId, userid, addUserIdp, useridp, fetchSingleProfile, singleProfile}) {

    function handleChangeIds(event) {
        event.preventDefault();
        addUserId(event.target.value)
    }

    function handleChangeIdp(event) {
        event.preventDefault();
        addUserIdp(event.target.value)
    }

    return (
        <div id="wrap">
            <Navbar className="navbar-fixed-top">
                <a className="navbar-brand brand-marg" href="#">BioViewer</a>
                <div className="col-xs-2">
                    <FormControl className="btn-block" placeholder="IDP ID пользователя" defaultValue="240631324"
                                 onChange={(e) => handleChangeIds(e)}/>
                </div>
                <div className="col-xs-2">
                    <FormControl className="btn-block" placeholder="IDP name" defaultValue="esia"
                                 onChange={(e) => handleChangeIdp(e)}/>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-primary btn-block"
                            onClick={() => fetchSingleProfile(userid, useridp)}>
                        Fetch Profile
                    </Button>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-danger btn-block" onClick={() => refreshNReceiveMultipleCollections(last_range_multiple)}>
                        Fetch multiple
                    </Button>
                </div>
            </Navbar>
            <div className="container">
                {singleProfile != null ? <Profile profile={singleProfile}/> : <ProfileEmpty/>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    deck_multiple: state.cards_multiple_reducer,
    last_range_multiple: state.last_range_multiple_reducer,
    last_append_collection: state.last_collection_reducer,
    userid: state.userid_reducer,
    useridp: state.useridp_reducer,
    singleProfile: state.profile_reducer,
});

const mapDispatchToProps = dispatch => ({
    addLastRangeMultiple: (last_range_multiple) => dispatch(addLastRangeMultiple(last_range_multiple)),
    addLastAppendCollection: (last_append_collection) => dispatch(addLastAppendCollection(last_append_collection)),
    fetchSingleCollection: (amount) => dispatch(fetchSingleCollection(amount)),
    refreshNReceiveMultipleCollections: (colRange) => dispatch(refreshNReceiveMultipleCollections(colRange)),

    //new
    fetchSingleProfile: (userid, useridp) => dispatch(fetchSingleProfile(userid, useridp)),
    addUserId: (userid) => dispatch(addUserId(userid)),
    addUserIdp: (useridp) => dispatch(addUserIdp(useridp))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileBoard);