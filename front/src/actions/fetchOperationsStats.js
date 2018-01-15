import {RECEIVE_OPERATIONS_USER, RECEIVE_OPERATIONS_USER_ERROR} from "../constants/ActionTypes";
import {appLoading} from "./index";

const checkIdIdpPair = (userid, useridp, dispatch) => {
    if (userid === "" ^ useridp === "") {
        let obj = {};
        obj.error = "Введите IDP ID и IDP Мнемонику, либо оставьте оба поля пустыми";
        dispatch(receiveOperationsStatsSearchError(obj));
        return true
    }
};

export const receiveOperationsStats = (operations) => ({
    type: RECEIVE_OPERATIONS_USER,
    operations: operations
});

export const receiveOperationsStatsSearchError = (operations) => ({
    type: RECEIVE_OPERATIONS_USER_ERROR,
    operations: operations
});

export const fetchOperationsStats = (userid, useridp, pageSize) => async (dispatch, getState) => {
    if (checkIdIdpPair(userid, useridp, dispatch)) {
        return
    }
    dispatch(appLoading(1));
    if (userid === "" && useridp === "") {
        await Promise.all([
            fetch('/stats/operations/')
                .then((resp) => resp.json())
                .then((resp) => {
                    dispatch(receiveOperationsStats(resp))
                })
                .catch((err) => {

                })
        ]);
    } else {
        await Promise.all([
            fetch('/stats/operations/' + useridp + '/' + userid + '/')
                .then((resp) => resp.json())
                .then((resp) => {
                    dispatch(receiveOperationsStats(resp))
                })
                .catch((err) => {

                })
        ]);
    }
    dispatch(appLoading(0));
};