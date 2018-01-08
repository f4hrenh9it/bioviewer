import React from 'react';
import {Jumbotron, Glyphicon} from 'react-bootstrap';

export const ProfileError = props => (
    <div>
        <Jumbotron>
            <p className="text-center">
                <Glyphicon glyph="error" className="blink"/>&nbsp;Ошибка: {props.error}
            </p>
        </Jumbotron>
    </div>
);