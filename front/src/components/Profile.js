import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {ProfileOriginals} from "./ProfileOriginals";
import {ProfileStats} from "./ProfileStats";
import {Jumbotron, Row, Col} from 'react-bootstrap'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const Profile = (props) => (
    <div>
        <Row>
            <ProfileStats regProfile={props.regProfile}/>
        </Row>
        <Col md={6}>
            <ProfileRegisterInfo regProfile={props.regProfile}/>
        </Col>
        <Col md={6}>
            <ProfileOriginals regProfile={props.regProfile}/>
        </Col>
    </div>
);

export const ProfileEmpty = () => (
    <Jumbotron>
        <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={3000} transitionEnter={true} transitionLeave={true}>
            <h4 className="text-center">Нет данных</h4>
        </ReactCSSTransitionGroup>
    </Jumbotron>
);