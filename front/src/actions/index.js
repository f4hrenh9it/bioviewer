/**
 * Created by a1 on 13.08.17.
 */
import * as log from 'loglevel';
import {RECEIVE_CARDS_MULTIPLE, ADD_AMOUNT, RECEIVE_CARDS, APPEND_COLLECTION, RECEIVE_CARDS_ERR} from '../constants/ActionTypes'

export const addLastRangeMultiple = last_range_multiple => ({
    type: ADD_AMOUNT,
    last_range_multiple
});

export const addLastAppendCollection = last_collection => ({
    type: APPEND_COLLECTION,
    last_collection
});

export const fetchSingleCollection = amount => (dispatch, getState) => {
    if (!/(\d+)/.test(amount)) {
        return dispatch(receiveCardsErr("Bad amount!"));
    }
    return fetch('http://localhost:3000/generate/' + amount)
        .then((resp) => resp.json())
        .then((json) => {
            log.info('data from /generate -->> ' + JSON.stringify(json));
            dispatch(receiveCards(json))
        })
        .catch((err) => dispatch(receiveCardsErr(err)))
};

export const refreshNReceiveMultipleCollections = colRange => (dispatch, getState) => {
    if (!/(\d+)\s?\-\s?(\d+)/.test(colRange)) {
        return dispatch(receiveCardsErr("Bad rule!"));
    }
    return fetch('http://localhost:3000/generate_multiple/' + colRange)
        .then((resp) => resp.json())
        .then((json) => {
            log.info('data from /generate_multiple/range -->> ' + JSON.stringify(json));
            dispatch(receiveMultipleCollections(json))
        })
        .catch((err) => dispatch(receiveCardsErr(err)))
};

export const receiveMultipleCollections = (json) => ({
    type: RECEIVE_CARDS_MULTIPLE,
    multiple: json
});

export const receiveCards = (json) => ({
    type: RECEIVE_CARDS,
    data: json
});

export const receiveCardsErr = (err) => ({
    type: RECEIVE_CARDS_ERR,
    err: err
});