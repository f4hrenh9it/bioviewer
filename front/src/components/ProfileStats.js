import React from 'react';
import './ProfileStats.css';
import {Panel, Jumbotron, Badge} from 'react-bootstrap';

export const ProfileStats = props => (
    <div>
        <Jumbotron>
            <p className="text-center">
                фотографии <Badge>{props.regProfile.photos_amount}</Badge>&nbsp;
                звукозаписи <Badge>{props.regProfile.sounds_amount}</Badge>&nbsp;
                адаптации <Badge>{props.regProfile.adaptations}</Badge>&nbsp;
                попытки верификаций <Badge>{props.regProfile.verifies_amount}</Badge>&nbsp;
                верификации <Badge>{props.regProfile.verifies_confirmed}</Badge>&nbsp;
            </p>
        </Jumbotron>
    </div>
);