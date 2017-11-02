/**
 * Created by a1 on 11.08.17.
 */
/**
 *
 * Created by a1 on 11.08.17.
 */
import React from 'react';
import Collections from './Collection';
import CollectionError from './CollectionError';

import './CardBoard.css';

import {FormControl, Button, Navbar} from 'react-bootstrap';

import * as log from 'loglevel';

import {connect} from 'react-redux'
import {
    addLastAppendCollection,
    addLastRangeMultiple,
    fetchSingleCollection,
    refreshNReceiveMultipleCollections
} from '../actions/index'


function CardBoard({deck_multiple, last_range_multiple, last_append_collection,
                       addLastRangeMultiple, addLastAppendCollection,
                       fetchSingleCollection, refreshNReceiveMultipleCollections}) {

    function handleChangeLastRange(event) {
        event.preventDefault();
        addLastRangeMultiple(event.target.value);
    }

    function handleChangeAppendCollection(event) {
        event.preventDefault();
        addLastAppendCollection(event.target.value);
    }

    log.info('Cardboard deck_multiple -->> ' + JSON.stringify(deck_multiple));
    log.info('Cardboard last_range_multiple -->> ' + last_range_multiple);

    return (
        <div id="wrap">
            <Navbar className="navbar-fixed-top">
                <a className="navbar-brand brand-marg" href="#">Cards</a>
                <div className="col-xs-2">
                    <FormControl className="btn-block" placeholder="Num of elements"
                                 onChange={(e) => handleChangeAppendCollection(e)}/>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-primary btn-block"
                            onClick={() => fetchSingleCollection(last_append_collection)}>
                        Add collections
                    </Button>
                </div>
                <div className="col-xs-2">
                    <FormControl className="btn-block" placeholder="min_col - max_col" onChange={(e) => handleChangeLastRange(e)}/>
                </div>
                <div className="col-xs-2">
                    <Button className="btn btn-danger btn-block" onClick={() => refreshNReceiveMultipleCollections(last_range_multiple)}>
                        Fetch multiple
                    </Button>
                </div>
            </Navbar>
            {/*Masonry imitation using bootstrap styles for .row .item .well*/}
            <div className="container">
                {deck_multiple.error ? <CollectionError/> : <Collections collections={deck_multiple}/>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    deck_multiple: state.cards_multiple_reducer,
    last_range_multiple: state.last_range_multiple_reducer,
    last_append_collection: state.last_collection_reducer
});

const mapDispatchToProps = dispatch => ({
    addLastRangeMultiple: (last_range_multiple) => dispatch(addLastRangeMultiple(last_range_multiple)),
    addLastAppendCollection: (last_append_collection) => dispatch(addLastAppendCollection(last_append_collection)),
    fetchSingleCollection: (amount) => dispatch(fetchSingleCollection(amount)),
    refreshNReceiveMultipleCollections: (colRange) => dispatch(refreshNReceiveMultipleCollections(colRange))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardBoard);