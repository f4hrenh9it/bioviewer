import {RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR} from "../constants/ActionTypes";
import {appLoading} from "./index";

const checkIdIdpPair = (userid, useridp, dispatch) => {
    if (!/(\d+)/.test(userid)) {
        let profile = {};
        profile.error = "id пользователя должен содержать цифры";
        dispatch(receiveRegisterInfoError(profile));
        return 1
    }
    if (!/(\w+)/.test(useridp)) {
        let profile = {};
        profile.error = "idp пользователя должен содержать только латинские буквы";
        dispatch(receiveRegisterInfoError(profile));
        return 1
    }
};

export const receiveRegisterInfo = (profile) => ({
    type: RECEIVE_REG_INFO,
    regProfile: profile
});

export const receiveRegisterInfoError = (profile) => ({
    type: RECEIVE_REG_INFO_ERR,
    regProfile: profile
});

export const fetchUpdateProfile = (userid, useridp) => async (dispatch, getState) => {
    if (checkIdIdpPair(userid, useridp, dispatch) === 1) {
        return
    }
    dispatch(appLoading(1));
    await Promise.all([
        fetch('http://localhost:8080/profile/' + useridp + "/" + userid + "/")
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