/**
 * Created by a1 on 13.08.17.
 */
import * as log from 'loglevel';

import { combineReducers } from 'redux'
import {last_range_multiple_reducer} from './lastRangeMultipleReducer'
import {last_collection_reducer} from './lastCollectionReducer'
import {cards_multiple_reducer} from './cards_multiple'
import {errors_reducer} from './errors'

const reducers = combineReducers({
    cards_multiple_reducer,
    last_range_multiple_reducer,
    last_collection_reducer,
    errors_reducer
});

export default reducers

