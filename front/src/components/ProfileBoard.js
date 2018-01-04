/**
 * Created by a1 on 11.08.17.
 */
/**
 *
 * Created by a1 on 11.08.17.
 */
import React from 'react';
import CollectionError from './CollectionError';

import './ProfileBoard.css';

import {FormControl, Button, Navbar} from 'react-bootstrap';

import * as log from 'loglevel';

import {connect} from 'react-redux'
import {
    addLastAppendCollection,
    addLastRangeMultiple,
    fetchSingleCollection,
    refreshNReceiveMultipleCollections,
    addUserId,
    fetchSingleProfile
} from '../actions/index'
import Profile from "./Profile";


function ProfileBoard({deck_multiple, last_range_multiple, last_append_collection,
                       addLastRangeMultiple, addLastAppendCollection,
                       fetchSingleCollection, refreshNReceiveMultipleCollections,
                       addUserId, userid, fetchSingleProfile, singleProfile}) {

    function handleChangeLastRange(event) {
        event.preventDefault();
        addLastRangeMultiple(event.target.value);
    }

    function handleChangeAppendCollection(event) {
        event.preventDefault();
        addLastAppendCollection(event.target.value);
    }

    function handleChangeIds(event) {
        event.preventDefault();
        addUserId(event.target.value)
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
                    <FormControl className="btn-block" placeholder="IDP name" onChange={(e) => handleChangeLastRange(e)}/>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-primary btn-block"
                            onClick={() => fetchSingleProfile(userid)}>
                        Fetch Profile
                    </Button>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-danger btn-block" onClick={() => refreshNReceiveMultipleCollections(last_range_multiple)}>
                        Fetch multiple
                    </Button>
                </div>
            </Navbar>
            {/*Masonry imitation using bootstrap styles for .row .item .well*/}
            <div className="container">
                <Profile profile={singleProfile}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    deck_multiple: state.cards_multiple_reducer,
    last_range_multiple: state.last_range_multiple_reducer,
    last_append_collection: state.last_collection_reducer,
    userid: state.userid_reducer,
    singleProfile: state.profile_reducer,
});

const mapDispatchToProps = dispatch => ({
    addLastRangeMultiple: (last_range_multiple) => dispatch(addLastRangeMultiple(last_range_multiple)),
    addLastAppendCollection: (last_append_collection) => dispatch(addLastAppendCollection(last_append_collection)),
    fetchSingleCollection: (amount) => dispatch(fetchSingleCollection(amount)),
    refreshNReceiveMultipleCollections: (colRange) => dispatch(refreshNReceiveMultipleCollections(colRange)),

    //new
    fetchSingleProfile: (userid) => dispatch(fetchSingleProfile(userid)),
    addUserId: (userid) => dispatch(addUserId(userid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileBoard);