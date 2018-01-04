/**
 * Created by a1 on 13.08.17.
 */
import * as log from 'loglevel';
import {RECEIVE_CARDS_MULTIPLE, ADD_AMOUNT, RECEIVE_CARDS,
    APPEND_COLLECTION, RECEIVE_CARDS_ERR, BAD_USER_ID_ERR, APPEND_USERID, RECEIVE_PROFILE, RECEIVE_PROFILE_ERR} from '../constants/ActionTypes'

export const addLastRangeMultiple = last_range_multiple => ({
    type: ADD_AMOUNT,
    last_range_multiple
});

export const addLastAppendCollection = last_collection => ({
    type: APPEND_COLLECTION,
    last_collection
});

export const addUserId = userid => ({
    type: APPEND_USERID,
    userid
});

export const fetchSingleProfile = (userid) => (dispatch, getState) => {
    if (!/(\d+)/.test(userid)) {
        return dispatch(badUserIdErr("id пользователя должен содержать цифры"));
    }
    return fetch('http://localhost:8080/profile/' + "esia" + "/" + userid)
        .then((resp) => resp.json())
        .then((resp) => {
            dispatch(receiveProfile(resp))
        })
        .catch((err) => dispatch(receiveProfileErr(err)))
};

export const fetchSingleCollection = amount => (dispatch, getState) => {
    if (!/(\d+)/.test(amount)) {
        return dispatch(receiveCardsErr("Bad amount!"));
    }
    return fetch('http://localhost:3000/generate/' + amount)
        .then((resp) => resp.json())
        .then((jsonProfile) => {
            log.info('data from /generate -->> ' + JSON.stringify(jsonProfile));
            dispatch(receiveCards(jsonProfile))
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

export const receiveProfile = (jsonProfile) => ({
    type: RECEIVE_PROFILE,
    singleProfile: jsonProfile
});

export const receiveProfileErr = (err) => ({
    type: RECEIVE_PROFILE_ERR,
    err: err
});

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

export const badUserIdErr = (err) => ({
    type: BAD_USER_ID_ERR,
    err: err
});