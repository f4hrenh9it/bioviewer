import React from 'react';
import {Button, FormControl, Glyphicon, Navbar} from 'react-bootstrap';
import {addUserId, addUserIdp} from "../actions/index";
import {fetchUpdateProfile} from "../actions/fetchUpdateProfile";
import {fetchOperationsStats} from "../actions/fetchOperationsStats";
import {connect} from "react-redux";
import './ProfileNavBar.css';
import {Link} from "react-router-dom";
import {OPERATIONS_PAGE_SIZE} from "../constants/RenderingConstants";

export function ProfileNavBar({addUserId, userid, addUserIdp, useridp,
                                  fetchUpdateProfile, fetchOperationsStatsForUser}) {

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
                    {console.log("OPER = " + OPERATIONS_PAGE_SIZE)}
                    <Button className="btn btn-primary btn-block"
                        onClick={() => fetchOperationsStatsForUser(userid, useridp, OPERATIONS_PAGE_SIZE)}>
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
    fetchOperationsStatsForUser: (userid, useridp, OPERATIONS_PAGE_SIZE) =>
        dispatch(fetchOperationsStats(userid, useridp, OPERATIONS_PAGE_SIZE)),
    addUserId: (userid) => dispatch(addUserId(userid)),
    addUserIdp: (useridp) => dispatch(addUserIdp(useridp))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileNavBar);