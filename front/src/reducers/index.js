import {combineReducers} from 'redux'
import {userid_reducer} from "./userid_reducer";
import {profile_reducer} from "./profile_reducer";
import {useridp_reducer} from "./useridp_reducer";
import {regProfile_reducer} from "./regProfile_reducer";
import {verProfile_reducer} from "./verProfile_reducer";

const reducers = combineReducers({
    userid_reducer,
    useridp_reducer,
    profile_reducer,

    // New api
    regProfile_reducer,
    verProfile_reducer,
});

export default reducers

