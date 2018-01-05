/**
 * Created by a1 on 13.08.17.
 */
import {APPEND_USERID} from '../constants/ActionTypes'

export const userid_reducer = (state = 0, action) => {
    switch (action.type) {
        case APPEND_USERID:
            return action.userid;
        default:
            return state
    }
};

