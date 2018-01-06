import React from 'react';
import './ProfileMetaInfo.css';
import {Jumbotron, Row, Col} from 'react-bootstrap';

export const ProfileRegisterInfo = (props) => (
    <div>
        <Jumbotron>
            <Row className="show-grid">
                <h3 className="text-center">Данные регистрации</h3>
                <hr/>
                <Col md={6}>
                    <div className="text-center"> Имя?: {props.profile.firstname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Idp id: {props.profile.idpid}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Фамилия?: {props.profile.lastname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Пол: {props.profile.gender}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Отчество?: {props.profile.secondname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Возраст?: {props.profile.age}</div>
                </Col>
            </Row>
        </Jumbotron>
    </div>
);