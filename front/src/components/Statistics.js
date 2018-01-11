import React from 'react';
import {fetchUpdateProfile} from "../actions/index";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import './ProfileNavBar.css';

export const Statistics = props => (
    <div>
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
        STATISTICS
    </div>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    fetchUpdateProfile: (userid, useridp) => dispatch(fetchUpdateProfile(userid, useridp)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistics));