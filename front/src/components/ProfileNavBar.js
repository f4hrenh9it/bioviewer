import React from 'react';
import {Button, FormControl, Navbar} from 'react-bootstrap';
import {addUserId, addUserIdp, fetchSingleProfile, fetchUpdateProfile} from "../actions/index";
import {connect} from "react-redux";
import './ProfileNavBar.css';

export function ProfileNavBar({addUserId, userid, addUserIdp, useridp, fetchSingleProfile, fetchUpdateProfile}) {

    function handleChangeIds(event) {
        event.preventDefault();
        addUserId(event.target.value);
    }

    function handleChangeIdp(event) {
        event.preventDefault();
        addUserIdp(event.target.value);
    }

    return (
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
                        onClick={() => fetchUpdateProfile(userid, useridp)}>
                    Fetch Profile
                </Button>
            </div>
            <div className="col-xs-2">
                <Button className="btn btn-danger btn-block">
                    Fetch multiple
                </Button>
            </div>
        </Navbar>
    );
}


const mapStateToProps = state => ({
    userid: state.userid_reducer,
    useridp: state.useridp_reducer,
});

const mapDispatchToProps = dispatch => ({
    fetchSingleProfile: (userid, useridp) => dispatch(fetchSingleProfile(userid, useridp)),
    fetchUpdateProfile: (userid, useridp) => dispatch(fetchUpdateProfile(userid, useridp)),
    addUserId: (userid) => dispatch(addUserId(userid)),
    addUserIdp: (useridp) => dispatch(addUserIdp(useridp))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileNavBar);