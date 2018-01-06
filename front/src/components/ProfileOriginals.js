import React from 'react';
import {Carousel, Jumbotron} from 'react-bootstrap';

export function ProfileOriginals(props) {

    let sounds = [];
    for (let i = 0; i < props.profile.sounds.length; i++) {
        sounds.push(
            <audio className="text-center" controls src={"data:audio/wav;base64," + props.profile.sounds[i].data}>
                Запись №{i}
            </audio>
        )
    }

    let photos = [];
    for (let i = 0; i < props.profile.photos.length; i++) {
        photos.push(
            <Carousel.Item>
                <img src={'data:image/jpg;base64,' + props.profile.photos[i].data}/>
                <Carousel.Caption>
                    <h3>Дата регистрации</h3>
                    <p>{props.profile.photos[i].date}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <Jumbotron>
            <Carousel>
                {photos}
            </Carousel>
            {sounds}
        </Jumbotron>
    );
}