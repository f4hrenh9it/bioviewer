/**
 * Created by a1 on 13.08.17.
 */
/**
 * Created by a1 on 13.08.17.
 */
import * as log from 'loglevel';
import {ADD_AMOUNT} from '../constants/ActionTypes'

export const last_range_multiple_reducer = (state = 0, action) => {
    switch (action.type) {
        case ADD_AMOUNT:
            return action.last_range_multiple;
        default:
            return state
    }
};

