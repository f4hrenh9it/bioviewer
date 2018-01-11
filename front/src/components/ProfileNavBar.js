import React from 'react';
import {Button, FormControl, Glyphicon, Navbar} from 'react-bootstrap';
import {addUserId, addUserIdp, fetchOriginalsRows, fetchUpdateProfile} from "../actions/index";
import {connect} from "react-redux";
import './ProfileNavBar.css';
import {Link} from "react-router-dom";

export function ProfileNavBar({addUserId, userid, addUserIdp, useridp, fetchUpdateProfile, fetchOriginalsRows}) {

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
                <FormControl className="btn-block" placeholder="IDP мнемоника" defaultValue="esia"
                             onChange={(e) => handleChangeIdp(e)}/>
            </div>
            <div className="col-xs-2">
                <Link to='/profile'>
                    <Button className="btn btn-primary btn-block"
                            onClick={() => fetchUpdateProfile(userid, useridp)}>
                        <Glyphicon glyph="search"/>&nbsp;Профиль
                    </Button>
                </Link>
            </div>
            <div className="col-xs-2">
                <Link to='/statistics'>
                    <Button className="btn btn-primary btn-block">
                        <Glyphicon glyph="stats"/>&nbsp;Статистика
                    </Button>
                </Link>
            </div>
            <div className="col-xs-2">
                <Button className="btn btn-success btn-block">
                    <Glyphicon glyph="cog"/>&nbsp;Настройки
                </Button>
            </div>
        </Navbar>
    );
}


const mapStateToProps = state => ({
    userid: state.userid_reducer,
    useridp: state.useridp_reducer,
    originalsRowsPhoto: state.originalsRows_reducer,
    originalsRowsSound: state.originalsRows_reducer,
});

const mapDispatchToProps = dispatch => ({
    fetchUpdateProfile: (userid, useridp) => dispatch(fetchUpdateProfile(userid, useridp)),
    fetchOriginalsRows: (userid, useridp) => dispatch(fetchOriginalsRows(userid, useridp)),
    addUserId: (userid) => dispatch(addUserId(userid)),
    addUserIdp: (useridp) => dispatch(addUserIdp(useridp))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileNavBar);