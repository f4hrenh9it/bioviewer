import {RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR} from "../constants/ActionTypes";
import {appLoading} from "./index";

const checkIdIdpPair = (userid, useridp, dispatch) => {
    if (userid === "" ^ useridp === "") {
        let obj = {};
        obj.error = "Введите IDP ID и IDP Мнемонику, либо оставьте оба поля пустыми";
        dispatch(receiveRegisterInfoError(obj));
        return true
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
    if (checkIdIdpPair(userid, useridp, dispatch)) {
        return
    }
    dispatch(appLoading(1));
    await Promise.all([
        fetch('/profile/' + useridp + "/" + userid + "/")
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