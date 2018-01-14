import {BAD_USER_ID_ERR, APPEND_USERID, APPEND_USERIDP, RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR, RECEIVE_VER_INFO,
    RECEIVE_VER_INFO_ERR, RECEIVE_ORIGINAL, RECEIVE_ORIGINAL_ERROR, RECEIVE_OPERATIONS_USER, SET_CUR_OPERATIONS_PAGE,
    APP_LOADING} from '../constants/ActionTypes'

export const addUserId = userid => ({
    type: APPEND_USERID,
    userid: userid
});

export const addUserIdp = useridp => ({
    type: APPEND_USERIDP,
    useridp: useridp
});

// export const fetchOriginalsRows = (userid, useridp) => async (dispatch, getState) => {
//     checkIdIdpPair(userid, useridp);
//     dispatch(appLoading(1));
//     await Promise.all([
//         fetch('http://localhost:8080/originals/rows/photo/' + useridp + '/' + userid + "/")
//             .then((resp) => resp.json())
//             .then((resp) => {
//                 dispatch(receiveOriginalsRows(resp))
//             })
//             .catch((err) => {
//
//             }),
//         fetch('http://localhost:8080/originals/rows/sound/' + useridp + '/' + userid + "/")
//             .then((resp) => resp.json())
//             .then((resp) => {
//                 dispatch(receiveOriginalsRows(resp))
//             })
//             .catch((err) => {
//
//             }),
//     ]);
//     dispatch(appLoading(0));
// };

export const appLoading = (loading) => ({
    type: APP_LOADING,
    loading: loading
});

export const receiveOriginal = (original) => ({
    type: RECEIVE_ORIGINAL,
    original: original
});

export const receiveOriginalError = (original) => ({
    type: RECEIVE_ORIGINAL_ERROR,
    original: original
});

export const loadOriginal = intKey => (dispatch, getState) => (
    fetch('http://localhost:8080/originals/' + intKey + "/")
        .then((resp) => resp.json())
        .then((resp) => {
            dispatch(receiveOriginal(resp))
        })
        .catch((err) => {
            // как правильно обработать ошибку, на что смотреть в редьюсере? сделать оповещение или алерт в морде?
            dispatch(receiveOriginalError(err))
        })
);

export const receiveVerifyInfo = (profile) => ({
    type: RECEIVE_VER_INFO,
    verProfile: profile
});

export const receiveVerifyInfoError = (profile) => ({
    type: RECEIVE_VER_INFO_ERR,
    verProfile: profile
});