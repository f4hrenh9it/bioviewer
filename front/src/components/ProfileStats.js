import React from 'react';
import './ProfileStats.css';
import {Panel, Jumbotron, Badge} from 'react-bootstrap';

export const ProfileStats = props => (
    <div>
        <Jumbotron>
            <p className="text-center">
                фотографии <Badge>{props.profile.photos_amount}</Badge>&nbsp;
                звукозаписи <Badge>{props.profile.sounds_amount}</Badge>&nbsp;
                адаптации <Badge>{props.profile.adaptations}</Badge>&nbsp;
                попытки верификаций <Badge>{props.profile.verifies_amount}</Badge>&nbsp;
                верификации <Badge>{props.profile.verifies_confirmed}</Badge>&nbsp;
            </p>
        </Jumbotron>
    </div>
);