import {RECEIVE_OPERATIONS_USER} from '../constants/ActionTypes'

export const operationsUserPaged_reducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_OPERATIONS_USER:
            return action.operations;
        default:
            return state
    }
};