import React from 'react';
import './ProfileMetaInfo.css';
import {Panel, Row, Col, Glyphicon} from 'react-bootstrap';

export const ProfileRegisterInfo = (props) => (
    <div>
        <Panel header={<h4 className="text-center"><Glyphicon glyph={"info-sign"}/></h4>} bsStyle={"primary"}>
            <Row className="show-grid">
                <Col md={6}>
                    <div className="text-center"> Имя?: {props.regProfile.firstname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Idp id: {props.regProfile.idpid}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Фамилия?: {props.regProfile.lastname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Пол: {props.regProfile.gender}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Отчество?: {props.regProfile.secondname}</div>
                </Col>
                <Col md={6}>
                    <div className="text-center">Возраст?: {props.regProfile.age}</div>
                </Col>
            </Row>
        </Panel>
    </div>
);