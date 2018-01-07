import {APP_LOADING} from '../constants/ActionTypes'

export const loading_reducer = (state = null, action) => {
    switch (action.type) {
        case APP_LOADING:
            return action.loading;
        default:
            return state
    }
};