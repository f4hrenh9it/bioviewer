import React from 'react';
import './Profile.css';
import {ProfileRegisterInfo} from "./ProfileRegisterInfo";
import {Jumbotron} from 'react-bootstrap'

export const Profile = (props) => (
    <ProfileRegisterInfo profile={props.profile}/>
);

export const ProfileEmpty = () => (
    <Jumbotron>
        <h3 className="text-center">
            Нет данных!
        </h3>
    </Jumbotron>
);