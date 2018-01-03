/**
 * Created by a1 on 13.08.17.
 */
/**
 * Created by a1 on 13.08.17.
 */
import * as log from 'loglevel';
import {APPEND_COLLECTION} from '../constants/ActionTypes'

export const last_collection_reducer = (state = "", action) => {
    switch (action.type) {
        case APPEND_COLLECTION:
            return action.last_collection;
        default:
            return state
    }
};

