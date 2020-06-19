import { 
    USER_DATA_PENDING,
    USER_DATA_SUCCESS,
    USER_DATA_FAIL
 } from './constants';

export const gatherUserData = ({ data }) => {
    return dispatch => {
        dispatch(userDataPending());
        fetch('/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(response => dispatch(userDataSuccess(response.data)))
            .catch(err => dispatch(userDataFail()))
    }
}

const userDataPending = () => {
    return {
        type: USER_DATA_PENDING
    }
}

const userDataSuccess= (info) => {
    return {
        type: USER_DATA_SUCCESS,
        payload: { ...info }
    }
}

const userDataFail = error => {
    return{
        type: USER_DATA_FAIL,
        payload: { error }
    }
}