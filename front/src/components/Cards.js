/**
 * Created by a1 on 11.08.17.
 */
import React from 'react';
import Card from './Card'
import {Well} from 'react-bootstrap';

const Cards = (props) => (
    <div>
        <div className="item">
            <Well className="clearfix">
                {props.cards.map((card, idx) => (
                        <Card color={card[2]} key={idx} value={card[0] + ' - ' + card[1]}/>
                    )
                )}
            </Well>
        </div>
    </div>
);

export default Cards;