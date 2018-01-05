import React from 'react';
import './ProfileMetaInfo.css';
import {Jumbotron, Row, Col} from 'react-bootstrap';

export const ProfileRegisterInfo = (props) => (
    <div>
        <Jumbotron>
            <Row className="show-grid">
                <h3 className="text-center">Данные регистрации</h3>
                <hr/>
                <Col md={6} mdPush={6}>
                    <p className="text-center">Имя: {props.profile.firstname}</p>
                </Col>
                <Col md={6} mdPull={6}>
                    <p className="text-center">Idp идентификатор: {props.profile.idpid}</p>
                </Col>
                <Col md={6} mdPush={6}>
                    <p className="text-center">Фамилия: {props.profile.lastname}</p>
                </Col>
                <Col md={6} mdPull={6}>
                    <p className="text-center">Пол: {props.profile.gender}</p>
                </Col>
                <Col md={6} mdPush={6}>
                    <p className="text-center">Отчество: {props.profile.secondname}</p>
                </Col>
                <Col md={6} mdPull={6}>
                    <p className="text-center">Возраст: {props.profile.age}</p>
                </Col>
            </Row>
        </Jumbotron>
    </div>
);