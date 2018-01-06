import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {ProfileOriginals} from "./ProfileOriginals";
import {ProfileStats} from "./ProfileStats";
import {Jumbotron, Row, Col} from 'react-bootstrap'

export const Profile = (props) => (
    <div>
        <Row>
            <ProfileStats profile={props.profile}/>
        </Row>
        <Col md={6}>
            <ProfileRegisterInfo profile={props.profile}/>
        </Col>
        <Col md={6}>
            <ProfileOriginals profile={props.profile}/>
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