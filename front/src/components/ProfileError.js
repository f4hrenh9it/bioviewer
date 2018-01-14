import React from 'react';
import {Jumbotron, Glyphicon} from 'react-bootstrap';

export const ErrorBar = props => (
    <div>
        <Jumbotron>
            <p className="text-center">
                <Glyphicon glyph="remove"/>&nbsp;Ошибка: {props.error}
            </p>
        </Jumbotron>
    </div>
);