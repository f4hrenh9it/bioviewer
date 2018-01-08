import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {ProfileOriginals} from "./ProfileOriginals";
import {ProfileStats} from "./ProfileStats";
import {ProfileError} from "./ProfileError";
import {Row, Col} from 'react-bootstrap'

export const Profile = (props) => (
    <div>
        {props.regProfile.error ? <ProfileError error={props.regProfile.error}/> :
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
        }
    </div>
);