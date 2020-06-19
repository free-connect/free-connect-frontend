import {
    USER_DATA_PENDING,
    USER_DATA_SUCCESS,
    USER_DATA_FAIL
} from './constants';

const initialUserState = {
    token: null,
    userId: null,
    isAuth: false,
    affiliation: null,
    name: null,
    likes: null,
    isPending: false,
    error: null
}

export const userStateReducer = (state=initialUserState, action={}) => {
    switch (action.type) {
        case USER_DATA_PENDING:
            return {...state, isPending: true}
        case USER_DATA_FAIL:
            return {...state, isPending: false, error: action.payload}
        case USER_DATA_SUCCESS:
            return {
                ...state, 
                isPending: false, 
                likes: action.payload.likes,
                name: action.payload.name,
                token: action.payload.token,
                affiliation: action.payload.affiliation,
                userId: action.payload.userId,
                isAuth: true
            }
        default:
            return state
    }
} 