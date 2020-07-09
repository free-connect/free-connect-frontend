import {
    USER_DATA_PENDING,
    USER_DATA_SUCCESS,
    USER_DATA_FAIL, 
    LOG_OUT_USER
} from './constants';

export const handleLogOut = () => {
    return {
        type: LOG_OUT_USER
    }
}

export const gatherUserData = (data) => {
    return dispatch => {
        dispatch(userDataPending());
        console.log('here')
        return fetch('/login', {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .then(response => {
                if (response.message) {
                    dispatch(userDataFail(response.message));
                    return
                } else if (response.success) {
                    const remainingMilliseconds = 60 * 60 * 1000;
                    const expiryDate = new Date(
                        new Date().getTime() + remainingMilliseconds
                    );
                    dispatch(userDataSuccess({
                        ...response,
                        expiryDate: expiryDate.toISOString()
                    }))
                }
            })
            .catch(err => dispatch(userDataFail(err)))
    }
}

const userDataPending = () => {
    return {
        type: USER_DATA_PENDING
    }
}

const userDataSuccess = (info) => {
    console.log('info', info)
    return {
        type: USER_DATA_SUCCESS,
        payload: info
    }
}

const userDataFail = error => {
    return {
        type: USER_DATA_FAIL,
        payload: error
    }
}