import {RECEIVE_REG_INFO, RECEIVE_REG_INFO_ERR} from '../constants/ActionTypes'

export const regProfile_reducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_REG_INFO:
            return action.regProfile;
        case RECEIVE_REG_INFO_ERR:
            return action.regProfile;
        default:
            return state
    }
};

