import {combineReducers} from 'redux'
import {userid_reducer} from "./userid_reducer";
import {useridp_reducer} from "./useridp_reducer";
import {regProfile_reducer} from "./regProfile_reducer";
import {verProfile_reducer} from "./verProfile_reducer";
import {original_reducer} from "./original_reducer";
import {originalsRows_reducer} from "./originalsRows_reducer";
import {operationsUser_reducer} from "./operationsUser_reducer";
import {loading_reducer} from "./loading_reducer";

const reducers = combineReducers({
    userid_reducer,
    useridp_reducer,

    regProfile_reducer,
    verProfile_reducer,
    original_reducer,
    originalsRows_reducer,

    loading_reducer,

    operationsUser_reducer,
});

export default reducers

