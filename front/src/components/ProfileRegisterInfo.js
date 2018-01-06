import React from 'react';
import './ProfileMetaInfo.css';
import {Jumbotron, Panel, Row, Col} from 'react-bootstrap';

export const ProfileRegisterInfo = (props) => (
    <div>
        <Panel header={<h4>Данные регистрации</h4>} bsStyle={"primary"}>
            <Row className="show-grid">
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
        </Panel>
    </div>
);