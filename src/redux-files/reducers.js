import {
    USER_DATA_PENDING,
    USER_DATA_SUCCESS,
    USER_DATA_FAIL,
    LOG_OUT_USER
} from './constants';

const initialUserState = {
    token: null,
    userId: null,
    isAuth: false,
    name: null,
    expiryDate: null,
    error: null
}

export const logoutReducer = (state=initialUserState, action={}) => {
    switch (action.type) {
        case LOG_OUT_USER:
            return {
                token: null,
                userId: null,
                isAuth: false,
                name: null,
                expiryDate: null,
                error: null
            }
        default: 
            return state
    }
} 

export const userStateReducer = (state=initialUserState, action={}) => {
    switch (action.type) {
        case USER_DATA_PENDING:
            return {...state, isPending: true}
        case USER_DATA_FAIL:
            return {...state, isPending: false, isAuth: false, error: action.payload}
        case USER_DATA_SUCCESS:
            return {
                ...state, 
                token: action.payload.token,
                expiryDate: action.payload.expiryDate,
                name: action.payload.name,
                userId: action.payload.userId,
                isAuth: true
            }
        default:
            return state
    }
}