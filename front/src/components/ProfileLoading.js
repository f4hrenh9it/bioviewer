import React from 'react';
import {Glyphicon, Jumbotron} from 'react-bootstrap';

export const ProfileLoading = (props) => (
    <div>
        {props.loading == null ? null :
            <Jumbotron>
                <p className="text-center">
                    <Glyphicon glyph="search" className="blink"/>&nbsp;Идет Поиск...
                </p>
            </Jumbotron>
        }
    </div>
);