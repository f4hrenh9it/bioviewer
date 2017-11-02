/**
 * Created by a1 on 13.08.17.
 */
import {RECEIVE_CARDS_ERR} from '../constants/ActionTypes'

export const errors_reducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CARDS_ERR:
            return [
                ...state,
                ...action.err
            ];
        default:
            return state
    }
};

