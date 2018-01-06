import {combineReducers} from 'redux'
import {userid_reducer} from "./userid_reducer";
import {profile_reducer} from "./profile_reducer";
import {useridp_reducer} from "./useridp_reducer";

const reducers = combineReducers({
    userid_reducer,
    useridp_reducer,
    profile_reducer,
});

export default reducers

