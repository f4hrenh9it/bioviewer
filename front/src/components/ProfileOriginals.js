/**
 * Created by a1 on 15.08.17.
 */
import React from 'react';

const ProfileOriginals = (props) => (
    <div className="item">
        <h2>Оригиналы</h2>
        <img src={"data:image/jpeg;base64," + props.profile.photos[0]}/>
    </div>
);

export default ProfileOriginals;