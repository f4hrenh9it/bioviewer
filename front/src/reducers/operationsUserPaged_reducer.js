import {RECEIVE_OPERATIONS_USER, RECEIVE_OPERATIONS_USER_ERROR} from '../constants/ActionTypes'

export const operationsUserPaged_reducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_OPERATIONS_USER:
            return action.operations;
        case RECEIVE_OPERATIONS_USER_ERROR:
            return action.operations;
        default:
            return state
    }
};