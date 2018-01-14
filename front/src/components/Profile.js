import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {ProfileOriginals} from "./ProfileOriginals";
import {ProfileStats} from "./ProfileStats";
import {Col, Row} from 'react-bootstrap'

export const Profile = (props) => (
    <div>
        <div>
            <Row>
                <ProfileStats {...props}/>
            </Row>
            <Col md={6}>
                <ProfileRegisterInfo {...props}/>
            </Col>
            <Col md={6}>
                <ProfileOriginals {...props}/>
            </Col>
        </div>
    </div>
);