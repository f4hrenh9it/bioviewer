import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {ProfileOriginals} from "./ProfileOriginals";
import {ProfileStats} from "./ProfileStats";
import {Jumbotron, Row, Col} from 'react-bootstrap'

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
        <h3 className="text-center">
            Нет данных!
        </h3>
    </Jumbotron>
);