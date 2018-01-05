import {combineReducers} from 'redux'
import {last_range_multiple_reducer} from './lastRangeMultipleReducer'
import {last_collection_reducer} from './lastCollectionReducer'
import {cards_multiple_reducer} from './cards_multiple'
import {errors_reducer} from './errors'
import {userid_reducer} from "./userid_reducer";
import {profile_reducer} from "./profile_reducer";
import {useridp_reducer} from "./useridp_reducer";

const reducers = combineReducers({
    cards_multiple_reducer,
    last_range_multiple_reducer,
    last_collection_reducer,
    errors_reducer,
    userid_reducer,
    useridp_reducer,
    profile_reducer,
});

export default reducers

