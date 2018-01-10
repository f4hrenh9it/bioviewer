import {BAD_USER_ID_ERR, APPEND_USERID
    , APPEND_USERIDP, RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR, RECEIVE_VER_INFO, RECEIVE_VER_INFO_ERR, APP_LOADING} from '../constants/ActionTypes'

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

// New async fetch api

export const fetchUpdateProfile = (userid, useridp) => async (dispatch, getState) => {
    if (!/(\d+)/.test(userid)) {
        return dispatch(badUserIdErr("id пользователя должен содержать цифры"));
    }

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
                console.log("error " + err);
                dispatch(receiveRegisterInfoError(profile))
            }),
        // fetch('http://localhost:8080/profile/' + useridp + "/" + userid)
        //     .then((resp) => resp.json())
        //     .then((resp) => {
        //         dispatch(receiveVerifyInfo(resp))
        //     })
        //     .catch((err) => dispatch(receiveProfileErr(err)))
    ]);
    dispatch(appLoading(0));
};

export const appLoading = (loading) => ({
    type: APP_LOADING,
    loading: loading
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