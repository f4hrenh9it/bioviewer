import React from 'react';
import {Carousel, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

export function ProfileOriginals(props) {

    let sounds = [];
    for (let i = 0; i < props.profile.sounds.length; i++) {
        sounds.push(
            <ListGroupItem bsStyle={props.profile.sounds[i].valid ? 'success' : 'danger'}>
                <audio controls src={"data:audio/wav;base64," + props.profile.sounds[i].data}>
                    Запись №{i+1}
                </audio>
            </ListGroupItem>
        )
    }

    let photos = [];
    for (let i = 0; i < props.profile.photos.length; i++) {
        photos.push(
            <Carousel.Item>
                <img src={'data:image/jpg;base64,' + props.profile.photos[i].data}/>
                <Carousel.Caption>
                    <span>{new Date(props.profile.photos[i].date).toDateString()}</span>
                    <span> {props.profile.photos[i].valid ? '(валидный)' : '(не валидный)'}</span>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    return (
        <Panel header={<h4>Фото / аудио оригиналы</h4>} bsStyle={"primary"}>
            <Carousel>
                {photos}
            </Carousel>
            <hr/>
            <ListGroup>
                {sounds}
            </ListGroup>
        </Panel>
    );
}