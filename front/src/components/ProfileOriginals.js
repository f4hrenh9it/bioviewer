import React from 'react';
import {Carousel, Glyphicon, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

const SoundItem = (props) => (
    <ListGroupItem bsStyle={props.value.valid ? 'success' : 'danger'}>
        <audio controls src={"data:audio/wav;base64," + props.value.data}>
            Запись №{props.index + 1}
        </audio>
    </ListGroupItem>
);

const PhotoItem = (props) => (
    <Carousel.Item {...props}>
        <img src={'data:image/jpg;base64,' + props.value.data}/>
        <Carousel.Caption>
            <span>{new Date(props.value.date).toDateString()}</span>
            <span> {props.value.valid ? '(валидный)' : '(не валидный)'}</span>
        </Carousel.Caption>
    </Carousel.Item>
);

export const ProfileOriginals = props => (
    <Panel header={<h4 className="text-center"><Glyphicon glyph={"user"}/></h4>} bsStyle={"primary"}>
        <Carousel>
            {props.regProfile.photoOriginals.originals.map((val, idx) => (
                <PhotoItem key={idx} index={idx} value={val}/>
            ))}
        </Carousel>
        <hr/>
        <ListGroup>
            {props.regProfile.soundOriginals.originals.map((val, idx) => (
                <SoundItem key={idx} index={idx} value={val}/>
            ))}
        </ListGroup>
    </Panel>
);