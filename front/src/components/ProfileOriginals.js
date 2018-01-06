/**
 * Created by a1 on 15.08.17.
 */
import React from 'react';
import {Carousel, Jumbotron} from 'react-bootstrap';

export const ProfileOriginals = (props) => (
    <Jumbotron>
        <Carousel>
            <Carousel.Item>
                <p>{console.log(props.profile.photos[0])}</p>
                <img src={'data:image/jpg;base64,' + props.profile.photos[0]}/>
                <Carousel.Caption>
                    <h3>Дата регистрации</h3>
                    <p>{props.profile.photos_amount}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </Jumbotron>
);