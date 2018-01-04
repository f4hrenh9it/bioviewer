/**
 * Created by a1 on 15.08.17.
 */
import React from 'react';
import './Profile.css';
import {Well} from 'react-bootstrap';

const Profile = (props) => (
    <div className="row">
        {(props.profile.idpid && <RenderProfile profile={props.profile}/>) || <RenderNoData/>}
    </div>
);

const RenderProfile = (props) => (
    <div className="item">
        <Well bsSize="small">
            Idp идентификатор: {props.profile.idpid}
        </Well>
        <Well>
            <img src={"data:image/jpeg;base64," + props.profile.photos[0]}/>
        </Well>
    </div>
);

const RenderNoData = () => {
    return <p>Нет данных!</p>
};

export default Profile;