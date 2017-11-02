/**
 * Created by a1 on 11.08.17.
 */
import React from 'react';

const Card = (props) => (
            <div className={'card ' + props.color}>
                {props.value}
            </div>
        );

export default Card;