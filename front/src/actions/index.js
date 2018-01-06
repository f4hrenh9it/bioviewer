import {BAD_USER_ID_ERR, APPEND_USERID, APPEND_USERIDP, RECEIVE_PROFILE, RECEIVE_PROFILE_ERR} from '../constants/ActionTypes'

export const addUserId = userid => ({
    type: APPEND_USERID,
    userid
});

export const badUserIdErr = err => ({
    type: BAD_USER_ID_ERR,
    err: err
});

export const addUserIdp = useridp => ({
    type: APPEND_USERIDP,
    useridp
});

export const badUserIdp = useridp => ({
    type: APPEND_USERIDP,
    useridp
});

export const fetchSingleProfile = (userid, useridp) => (dispatch, getState) => {
    if (!/(\d+)/.test(userid)) {
        return dispatch(badUserIdErr("id пользователя должен содержать цифры"));
    }
    return fetch('http://localhost:8080/profile/' + useridp + "/" + userid)
        .then((resp) => resp.json())
        .then((resp) => {
            dispatch(receiveProfile(resp))
        })
        .catch((err) => dispatch(receiveProfileErr(err)))
};

export const receiveProfile = (jsonProfile) => ({
    type: RECEIVE_PROFILE,
    singleProfile: jsonProfile
});

export const receiveProfileErr = (err) => ({
    type: RECEIVE_PROFILE_ERR,
    err: err
});