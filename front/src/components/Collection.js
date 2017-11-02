/**
 * Created by a1 on 15.08.17.
 */
import React from 'react';
import {Well} from 'react-bootstrap';
import Cards from './Cards'

const Collections = (props) => (
    <div className="row">
        {Object.keys(props.collections).map((key, idx) => (
                <Cards key={idx} cards={props.collections[key]}/>
            )
        )}
    </div>
);

export default Collections;