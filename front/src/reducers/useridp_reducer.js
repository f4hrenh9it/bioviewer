/**
 * Created by a1 on 13.08.17.
 */
import {APPEND_USERIDP} from '../constants/ActionTypes'

export const useridp_reducer = (state = "esia", action) => {
    switch (action.type) {
        case APPEND_USERIDP:
            return action.useridp;
        default:
            return state
    }
};

