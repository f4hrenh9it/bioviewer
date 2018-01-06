import {RECEIVE_VER_INFO} from '../constants/ActionTypes'

export const verProfile_reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_VER_INFO:
            return action.verProfile;
        default:
            return state
    }
};

