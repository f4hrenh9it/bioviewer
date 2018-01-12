import {BAD_USER_ID_ERR, APPEND_USERID, APPEND_USERIDP, RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR, RECEIVE_VER_INFO,
    RECEIVE_VER_INFO_ERR, RECEIVE_ORIGINAL, RECEIVE_ORIGINAL_ERROR, RECEIVE_ORIGINALS_ROWS, RECEIVE_OPERATIONS_USER, APP_LOADING} from '../constants/ActionTypes'

export const loadOriginal = intKey => (dispatch, getState) => (
    fetch('http://localhost:8080/originals/' + intKey)
        .then((resp) => resp.json())
        .then((resp) => {
            dispatch(receiveOriginal(resp))
        })
        .catch((err) => {
            // как правильно обработать ошибку, на что смотреть в редьюсере? сделать оповещение или алерт в морде?
            dispatch(receiveOriginalError(err))
        })
);

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

export const badUserIdpErr = useridp => ({
    type: APPEND_USERIDP,
    useridp
});

const checkIdIdpPair = (userid, useridp, dispatch) => {
    if (!/(\d+)/.test(userid)) {
        return dispatch(badUserIdErr("id пользователя должен содержать цифры"));
    }
    if (!/(\w+)/.test(userid)) {
        return dispatch(badUserIdpErr("idp пользователя должен содержать только латинские буквы"));
    }
};

export const fetchUpdateProfile = (userid, useridp) => async (dispatch, getState) => {
    checkIdIdpPair(userid, useridp);
    dispatch(appLoading(1));
    await Promise.all([
        fetch('http://localhost:8080/profile/' + useridp + "/" + userid)
            .then((resp) => resp.json())
            .then((resp) => {
                dispatch(receiveRegisterInfo(resp))
            })
            .catch((err) => {
                let profile = {};
                profile.error = err.message;
                dispatch(receiveRegisterInfoError(profile))
            })
    ]);
    dispatch(appLoading(0));
};

export const fetchOriginalsRows = (userid, useridp) => async (dispatch, getState) => {
    checkIdIdpPair(userid, useridp);
    dispatch(appLoading(1));
    await Promise.all([
        fetch('http://localhost:8080/originals/rows/photo/' + useridp + '/' + userid)
            .then((resp) => resp.json())
            .then((resp) => {
                dispatch(receiveOriginalsRows(resp))
            })
            .catch((err) => {

            }),
        fetch('http://localhost:8080/originals/rows/sound/' + useridp + '/' + userid)
            .then((resp) => resp.json())
            .then((resp) => {
                dispatch(receiveOriginalsRows(resp))
            })
            .catch((err) => {

            }),
    ]);
    dispatch(appLoading(0));
};

export const fetchOperationsStatsForUser = (userid, useridp) => async (dispatch, getState) => {
    checkIdIdpPair(userid, useridp);
    dispatch(appLoading(1));
    await Promise.all([
        fetch('http://localhost:8080/stats/operations/' + useridp + '/' + userid)
            .then((resp) => resp.json())
            .then((resp) => {
                dispatch(receiveOperationsForUser(resp))
            })
            .catch((err) => {

            })
    ]);
    dispatch(appLoading(0));
};

export const appLoading = (loading) => ({
    type: APP_LOADING,
    loading: loading
});

export const receiveOperationsForUser = (operations) => ({
    type: RECEIVE_OPERATIONS_USER,
    operations: operations
});

export const receiveOriginalsRows = (rows) => ({
    type: RECEIVE_ORIGINALS_ROWS,
    rows: rows
});

export const receiveOriginal = (original) => ({
    type: RECEIVE_ORIGINAL,
    original: original
});

export const receiveOriginalError = (original) => ({
    type: RECEIVE_ORIGINAL_ERROR,
    original: original
});

export const receiveRegisterInfo = (profile) => ({
    type: RECEIVE_REG_INFO,
    regProfile: profile
});

export const receiveRegisterInfoError = (profile) => ({
    type: RECEIVE_REG_INFO_ERR,
    regProfile: profile
});

export const receiveVerifyInfo = (profile) => ({
    type: RECEIVE_VER_INFO,
    verProfile: profile
});

export const receiveVerifyInfoError = (profile) => ({
    type: RECEIVE_VER_INFO_ERR,
    verProfile: profile
});