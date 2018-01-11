import {RECEIVE_ORIGINALS_ROWS} from '../constants/ActionTypes'

export const originalsRows_reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_ORIGINALS_ROWS:
            return action.rows;
        default:
            return state
    }
};

