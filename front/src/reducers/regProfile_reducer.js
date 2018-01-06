import {RECEIVE_REG_INFO} from '../constants/ActionTypes'

export const regProfile_reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_REG_INFO:
            return action.regProfile;
        default:
            return state
    }
};

