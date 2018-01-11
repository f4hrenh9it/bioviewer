import {RECEIVE_ORIGINAL} from '../constants/ActionTypes'

export const original_reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_ORIGINAL:
            return {
                ...state,
                original: action.original
            };
        default:
            return state
    }
};

