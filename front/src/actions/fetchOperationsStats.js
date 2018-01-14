import {RECEIVE_OPERATIONS_USER} from "../constants/ActionTypes";
import {appLoading} from "./index";

export const receiveOperationsStats = (operations) => ({
    type: RECEIVE_OPERATIONS_USER,
    operations: operations
});

export const fetchOperationsStats = (userid, useridp, pageSize) => async (dispatch, getState) => {
    dispatch(appLoading(1));
    if (userid === "" && useridp === "") {
        await Promise.all([
            fetch('http://localhost:8080/stats/operations/')
                .then((resp) => resp.json())
                .then((resp) => {
                    dispatch(receiveOperationsStats(resp))
                })
                .catch((err) => {

                })
        ]);
    } else {
        // если usedid + useridp, то бэк получает intKey и добавляет фильтр для сканера
        await Promise.all([
            fetch('http://localhost:8080/stats/operations/' + useridp + '/' + userid + '/')
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