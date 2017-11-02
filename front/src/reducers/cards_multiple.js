/**
 * Created by a1 on 13.08.17.
 */
import {RECEIVE_CARDS, RECEIVE_CARDS_MULTIPLE} from '../constants/ActionTypes'

export const cards_multiple_reducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CARDS:
            return {
                ...state,
                ...action.data
            };
        case RECEIVE_CARDS_MULTIPLE:
            return {
                ...state,
                ...action.multiple
            };
        default:
            return state
    }
};

